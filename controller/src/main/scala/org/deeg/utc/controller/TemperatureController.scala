package org.deeg.utc.controller

import com.quinsoft.zeidon.ObjectEngine
import com.quinsoft.zeidon.Task
import com.quinsoft.zeidon.scala.Implicits._
import com.quinsoft.zeidon.scala.View
import com.quinsoft.zeidon.scala.basedOn

class TemperatureController( private val currentSession: View @basedOn( "Session" ) ) extends Runnable {
    @volatile 
    private var running = false;
    private val logger = currentSession.log()
    private val task = currentSession.task

    private val hardware = HardwareInterface.getHardwareInterface( task )
    
    def run() {
        logger.info( "Starting up controller for config %s", currentSession.Configuration.Description )
        
        // Wait until someone calls stop(), which will call notify().
        running = true;
        logger.info( "Waiting..." )
        this.synchronized{  wait() }
        logger.info( "Controller done." )
    }
    
    def isRunning = running
    
    def stop() {
        if ( running ) {
            logger.info( "Received notification to stop controller" )
            notify()
            running = false
        }
    }
    
    /**
     * 
     */
    def currentState : View @basedOn( "Instant" ) = {
        val instant = task.newView( "Instant" ).activateEmpty()
        currentSession.synchronized {
            if ( currentSession.Instant setLast() )
                instant.Instant include( currentSession.Instant )
            else
                instant.Instant create()
        }
        
        return instant
    }
    
    def serializeSession() : String = {
        currentSession.synchronized {
            val serialized = currentSession.serializeOi.asJson.withIncremental().toString()
            logger.debug(serialized)
            return serialized
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