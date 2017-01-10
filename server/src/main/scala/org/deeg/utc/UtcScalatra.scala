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

    @volatile var controller : TemperatureController = null
    
    def getObjectEngine(): ObjectEngine = {
        return oe
    }
    
    options("/*") {
        //response.setHeader("Access-Control-Allow-Methods", "GET,POST");
        response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"));
    }

    get("/utc/getSession") {
        if ( controller == null ) {
            logger.debug( "No current session" )
            "{}"
        }
        else {
            controller.serializeSession()
        }
    }
    
    get("/utc/getState") {
        if ( controller == null ) {
            logger.debug( "No current session" )
            "{}"
        }
        else {
            val view = controller.currentState()
            val serialized = view.serializeOi.asJson.toString()
            logger.debug(serialized)
            serialized
        }
    }
    
    post("/utc/startSession/:id") {
        if ( controller == null ) {
            controller = TemperatureController.startController(oe, params( "id" ).toInt )
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
    
    private def startUdpServer() = {
    }
}
