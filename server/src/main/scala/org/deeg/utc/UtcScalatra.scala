package org.deeg.utc

import org.scalatra._
import java.net.URL
import com.quinsoft.zeidon.standardoe.JavaObjectEngine
import com.quinsoft.zeidon.scala.View
import com.quinsoft.zeidon.scala.Implicits._
import com.quinsoft.zeidon.Task
import com.quinsoft.zeidon.standardoe.IncrementalEntityFlags
import com.quinsoft.zeidon.scala.QualBuilder
import com.deeg.utc.zeidon._
import com.quinsoft.zeidon.ObjectEngine
import com.quinsoft.zeidon.scalatra.ZeidonRestScalatra
import org.deeg.utc.controller.TemperatureController
import org.deeg.utc.controller.HardwareInterface
import java.io.File
import org.apache.commons.io.FileUtils
import com.quinsoft.zeidon.ZeidonException

class UtcScalatra extends ZeidonRestScalatra with CorsSupport {

    val oe = JavaObjectEngine.getInstance()
    if ( oe.getSystemTask.readZeidonConfig("UTC", "StartUdpServer", "N" ) == "Y" ) {
      new UdpServerThread( oe ).start();
    }

    // --
    // Initialize OE and Configuration
    // --
    
    val task = oe.createTask("UTC")
    val configuration = new Configuration( task )
    configuration.createDefaultConfiguration()
    
    val logger = task.log()
    
    private val hardware = HardwareInterface.getHardwareInterface( task )
    
    // Indicate via LEDs that we're up and ready to go.
    hardware.setGreenLed( true )
    hardware.setRedLed( false )
    hardware.setYellowLed( false )

    @volatile var controller : TemperatureController = null
    
    def getObjectEngine(): ObjectEngine = {
        return oe
    }
    
    options("/*") {
        //response.setHeader("Access-Control-Allow-Methods", "GET,POST");
        response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"));
    }

    get("/utc/getCurrentSession") {
        if ( controller == null ) {
            logger.debug( "No current session" )
            "{}"
        }
        else {
            controller.serializeSession()
        }
    }
    
    get("/utc/getCurrentState") {
        if ( controller == null ) {
            logger.debug( "No current session" )
            "{}"
        }
        else {
            val view = controller.currentState
            serializeResponse( view )
        }
    }
    
    get("/utc/getChart/:id") {
        contentType = "image/png"
        oe.forTask( "UTC" ) { task =>
            val session = new View( task ) basedOn "Session"
            session.activateWhere( _.Session.Id = params( "id" ) )
            session.logOi
            
            val generator = new ChartGenerator( session )
            val filename = generator.generate()
            val file = new java.io.File( filename )
            response.setHeader("Content-Disposition", "attachment; filename=" + file.getName)
            file
        }
    }
    
    get("/utc/getLogFile/:name") {
        contentType = "text/plain"
        val filename = params( "name" )
        
        // Try to prevent someone from getting a file outside of logs.
        if ( filename.contains(".." ) || filename.contains( "/" ) )
            throw new ZeidonException( "Invalid filename" );
                
        val file = new java.io.File( "./logs/" + filename )
        response.setHeader("Content-Disposition", "attachment; filename=" + file.getName)
        file
    }
    
    /**
     * Return values retrieved from the hardware without a session.  Mostly used as
     * a way to test the hardware.
     */
    get("/utc/getHardware") {
        val instant = hardware.readSensors( null )
        serializeResponse( instant )
    }
    
    post("/utc/startSession/:id") {
        if ( controller == null ) {
            controller = TemperatureController.startController(oe, params( "id" ).toInt, hardware )
        }
        
        controller.serializeSession()
    }
    
    post("/utc/stopSession") {
        if ( controller == null ) {
            """{ "message": "No session running" }"""
        }
        else {
            controller.stop()
            controller = null
            """{ "message": "Session stopped." }"""
        }
    }
    
    get("/utc/getDebugInfo") {
        oe.forTask( "UTC" ) { task =>
            val info = task.newView("DebugInfo") activateEmpty()
            info.DebugInfo create()
            val f = new File( "./logs" ).getAbsolutePath
            task.log().info( f )
            new File( "./logs" ).listFiles().foreach{ file =>
                if ( file.isFile() ) {
                    info.File create()
                    info.File.Name = file.getName
                    info.File.Size = FileUtils.byteCountToDisplaySize( file.length() )
                }
            }
            serializeResponse( info )
        }            
    }
    
    private def startUdpServer() = {
    }
}
