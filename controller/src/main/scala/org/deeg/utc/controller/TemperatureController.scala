package org.deeg.utc.controller

import com.quinsoft.zeidon.ObjectEngine
import com.quinsoft.zeidon.Task
import com.quinsoft.zeidon.scala.Implicits._
import com.quinsoft.zeidon.scala.View
import com.quinsoft.zeidon.scala.basedOn
import edu.wpi.first.wpilibj.PIDController
import edu.wpi.first.wpilibj.PIDOutput
import edu.wpi.first.wpilibj.PIDSource

class TemperatureController( private val currentSession: View @basedOn( "Session" ),
                             private val hardware: HardwareInterface ) extends Runnable with PIDSource with PIDOutput {
    @volatile 
    private var running = false
    private var pid : PIDController = null
    private val logger = currentSession.log()
    private val task = currentSession.task
    private var greenLedFlasher = false

    /**
     * The amount of time (in millis) that the main Looper thread waits
     * between reads.
     */
    private val mainLoopDelay = 1000
    
    /**
     * This is the next time (in epoch millis) that the current state should be saved to the DB.
     */
    private var nextSaveTime: Long = 0
    
    /**
     * This is the time in millis between saves of the Instant to the DB.
     */
    private val savePeriod: Long = 60 * 1000  // 1 minutes.
    
    /**
     * Main method for processing a single tick of the controller.
     */
    private def tick() {
        logger.debug( "Main controller tick..." )
        hardware.setGreenLed( greenLedFlasher )
        greenLedFlasher = !greenLedFlasher
        
        if ( System.currentTimeMillis() > nextSaveTime ) {
            nextSaveTime = System.currentTimeMillis() + 60 * 1000 // Save again in a minute.
            val instant = hardware.readSensors( currentSession )
            currentSession.synchronized {
                currentSession.Instant include instant.Instant
                currentSession.Instant.TargetTemperature = currentSession.Configuration.TargetTemperature
                currentSession.commit()
            }
        }
    }
    
    /**
     * Get the result to use in PIDController
     * @return the result to use in PIDController
     * 
     * TODO: Therm0 is an integer and pidGet expects a double, thus there is a loss of precision.
     *       Should we track temperatures as doubles?
     */
    def pidGet(): Double = {
        val instant = hardware.readSensors( currentSession )
        return instant.Instant.Therm0
    }
    
    /**
     * Set the output to the value calculated by PIDController
     * @param output the value calculated by PIDController
     */
    def pidWrite(output: Double) {
        logger.debug( "pidWrite %s", output )
        hardware.setPwm( output.toInt, currentSession.Configuration.PwmFrequency )
    }
    
    def run() {
        logger.info( "Starting up controller for config %s", currentSession.Configuration.Description )

        hardware.setGreenLed( false )
        hardware.setRedLed( false )
        hardware.setYellowLed( false )
        
        pid = new PIDController( currentSession.Configuration.PidP,
                                 currentSession.Configuration.PidI,
                                 currentSession.Configuration.PidD,
                                 this, this, 5 );

        pid.setOutputRange( 0, 100 );
        pid.setSetpoint( 250 );
        pid.enable()
        
        // Run until someone calls stop()
        running = true;
        while ( running ) {
            tick();
            Thread.sleep( mainLoopDelay )
        }
        
        pid.disable()
        
        hardware.setGreenLed( false )
        hardware.setRedLed( false )
        hardware.setYellowLed( false )
        
        logger.info( "Controller done." )
    }
    
    def isRunning = running
    
    def stop() {
        if ( running ) {
            logger.info( "Received notification to stop controller" )
            running = false
        }
    }
    
    /**
     * 
     */
    def currentState : View @basedOn( "Instant" ) = {
        val instant = hardware.readSensors( currentSession )
        instant.Instant.TargetTemperature = currentSession.Configuration.TargetTemperature
        return instant
        
    }
    
    def serializeSession() : String = {
        currentSession.synchronized {
            val serialized = currentSession.serializeOi.asJson.withIncremental.toString()
            logger.debug( serialized )
            return serialized
        }
    }
}

object TemperatureController {
    
    /**
     * Start a new controller with a configuration based on configId.
     */
    def startController( oe: ObjectEngine, 
                         configId : Int,
                         hardwareInterface: HardwareInterface ) : TemperatureController = {
        val task = oe.createTask( "UTC" )
        val configOi = task.newView( "Configuration" )
                           .activateWhere( _.Configuration.Id = configId )
        val currentSession = task.newView( "Session" ).activateEmpty()
        currentSession.Session.create()
        currentSession.Session.Date = "NOW"
        currentSession.Configuration.include( configOi.Configuration )

        val controller = new TemperatureController( currentSession, hardwareInterface )
        val thread = new Thread( controller )
        thread.start()
        return controller
    }
}