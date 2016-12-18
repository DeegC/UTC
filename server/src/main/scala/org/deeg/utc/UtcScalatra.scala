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


class UtcScalatra extends ZeidonRestScalatra with CorsSupport {

    val oe = JavaObjectEngine.getInstance()
    if ( oe.getSystemTask.readZeidonConfig("UTC", "StartUdpServer", "N" ) == "Y" ) {
      new UdpServerThread( oe ).start();
    }

    // --
    // Initialize OE and Configuration
    // --
    
    val sessionTask = oe.createTask("UTC")
    val hardware = HardwareInterface.getHardwareInterface( sessionTask )
    val configuration = new Configuration( sessionTask )
    configuration.createDefaultConfiguration()

    var currentSession: View = null
    
    def getObjectEngine(): ObjectEngine = {
        return oe
    }
    
    options("/*") {
        //response.setHeader("Access-Control-Allow-Methods", "GET,POST");
        response.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"));
    }

    get("/utc/echo/:string") {
        oe.forTask( "UTC" ) { task =>
            "This is test for echo"
        }
    }
    
    get("/utc/getSession") {
        oe.forTask( "UTC" ) { task =>
            if ( currentSession == null ) {
                task.log().debug( "No current session" )
                "{}"
            }
            else {
                serializeResponse( currentSession )
            }
        }
    }
    
    post("/utc/startSession/:id") {
        oe.forTask( "UTC" ) { task =>
            if ( currentSession == null ) {
                val configOi = task.newView( "Configuration" )
                               .activateWhere( _.root.key = params( "id" ) ) 
    
                currentSession = sessionTask.newView( "Session" ).activateEmpty()
                currentSession.Session.create()
                currentSession.Session.Date = "NOW"
                currentSession.Configuration.include( configOi.Configuration )
            }
            
            serializeResponse( currentSession )
        }
    }
    
    private def startUdpServer() = {
      
    }
}
