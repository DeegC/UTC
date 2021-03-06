package org.deeg.utc

import org.scalatra._
import java.net.URL
import com.quinsoft.zeidon.standardoe.JavaObjectEngine
import com.quinsoft.zeidon.scala.View
import com.quinsoft.zeidon.scala.Implicits._
import com.quinsoft.zeidon.Task
import com.quinsoft.zeidon.standardoe.IncrementalEntityFlags
import com.quinsoft.zeidon.scala.QualBuilder
import org.deeg.utc.zeidon._
import com.quinsoft.zeidon.ObjectEngine
import com.quinsoft.zeidon.scalatra.ZeidonRestScalatra
import org.deeg.utc.controller.TemperatureController
import org.deeg.utc.controller.HardwareInterface
import java.io.File
import org.apache.commons.io.FileUtils
import com.quinsoft.zeidon.ZeidonException

class UtcScalatra extends ZeidonRestScalatra with CorsSupport {

    val oe = JavaObjectEngine.getInstance()
    Initialize.initialize(oe)

    if ( oe.getSystemTask.readZeidonConfig("UTC", "StartUdpServer", "N" ) == "Y" ) {
        new UdpServerThread( oe ).start();
    }

    // --
    // Initialize OE and Configuration
    // --

    val task = oe.createTask("UTC")

    private val hardware = HardwareInterface.getHardwareInterface( task )

    // Indicate via LEDs that we're up and ready to go.
    hardware.setGreenLed( true )
    hardware.setRedLed( false )
    hardware.setYellowLed( false )

    // Preload configurations.
    oe.forTask( "UTC" ) { task =>
        task.Configuration.all()
    }

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
            val session = task.Session.activate( _.Session.Id = params( "id" ) )
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

        val file = new File( s"${UtcScalatra.TEMP_DIR}/logs/${filename}" )
        response.setHeader("Content-Disposition", "attachment; filename=" + file.getName)
        file
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

    post("/utc/shutdown") {
        task.log().info( "Initiating shutdown" )
        hardware.shutdown()
        Ok
    }

    // Override the default Zeidon Scalatra server for activating DebugInfo
    get("/utc/DebugInfo") {
        oe.forTask( "UTC" ) { task =>
            val info = task.DebugInfo.empty()
            info.DebugInfo create()
            val f = new File( s"${UtcScalatra.TEMP_DIR}/logs" ).getAbsolutePath
            task.log().info( f )
            new File( f ).listFiles().foreach{ file =>
                if ( file.isFile() ) {
                    info.File create()
                    info.File.Name = file.getName
                    info.File.Size = FileUtils.byteCountToDisplaySize( file.length() )
                }
            }
            serializeResponse( info, withIncrementals = false )
        }
    }

    private def startUdpServer() = {
    }
}

object UtcScalatra {
    val TEMP_DIR = {
        // TODO: Check to see if an env var is set?
        "./tmp/"
    }
}
