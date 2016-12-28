package org.deeg.utc.controller

import com.quinsoft.zeidon.ObjectEngine
import com.quinsoft.zeidon.Task
import com.quinsoft.zeidon.scala.Implicits._
import com.quinsoft.zeidon.scala.View
import com.quinsoft.zeidon.scala.basedOn

class TemperatureController( val currentSession: View @basedOn( "Session" ) ) extends Runnable {
    @volatile var running = false;
    val logger = currentSession.log()
    
    def run() {
        logger.info( "Starting up controller for config %s", currentSession.Configuration.Description )
        
        // Wait until someone calls stop(), which will call notify().
        running = true;
        logger.info( "Waiting..." )
        wait()
        logger.info( "Controller done." )
    }
    
    def stop() {
        if ( running ) {
            logger.info( "Received notification to stop controller" )
            notify()
            running = false
        }
    }
}

object TemperatureController {
    
    /**
     * Start a new controller with a configuration based on configId.
     */
    def startController( oe: ObjectEngine, configId : Int ) : TemperatureController = {
        val task = oe.createTask( "UTC" )
        val configOi = task.newView( "Configuration" )
                           .activateWhere( _.Configuration.Id = configId )
        val currentSession = task.newView( "Session" ).activateEmpty()
        currentSession.Session.create()
        currentSession.Session.Date = "NOW"
        currentSession.Configuration.include( configOi.Configuration )

        val controller = new TemperatureController( currentSession )
        val thread = new Thread( controller )
        thread.start()
        return controller
    }
}