package org.deeg.utc.controller

import com.quinsoft.zeidon.ObjectEngine
import com.quinsoft.zeidon.Task
import com.quinsoft.zeidon.scala.Implicits._
import com.quinsoft.zeidon.scala.View
import com.quinsoft.zeidon.scala.basedOn
import edu.wpi.first.wpilibj.PIDController
import edu.wpi.first.wpilibj.PIDOutput
import edu.wpi.first.wpilibj.PIDSource
import com.quinsoft.zeidon.scala.CursorHelpers

class TemperatureController( private val currentSession: View @basedOn( "Session" ),
                             private val hardware: HardwareInterface )
              extends Runnable with PIDSource with PIDOutput with CursorHelpers {
    @volatile
    private var running = false
    private var pid : PIDController = null
    private val logger = currentSession.log()
    private val task = currentSession.task
    private var greenLedFlasherOn = false

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

    private var currentInstant: View = null

    private val twitter = new TwitterFeed( currentSession )

    /**
     * Main method for processing a single tick of the controller.
     */
    private def tick() {
        logger.debug( "Main controller tick..." )
        currentInstant = hardware.readSensors( currentSession )
        currentInstant.Instant.TargetTemperature = currentSession.Configuration.TargetTemperature

        blinkGreenLed
        saveInstantToDb
        checkForTemperatureErrors
        twitter.tweetSmokerStatus( currentInstant )
    }

    private def blinkGreenLed {
        hardware.setGreenLed( greenLedFlasherOn )
        greenLedFlasherOn = !greenLedFlasherOn
    }

    /*
     * Periodically save the instant to the DB so we can chart it later.
     */
    private def saveInstantToDb() {
        if ( System.currentTimeMillis() < nextSaveTime )
            return

        nextSaveTime = System.currentTimeMillis() + 60 * 1000 // Save again in a minute.
        currentSession.synchronized {
            currentSession.Instant include currentInstant.Instant
            currentSession.Instant.TargetTemperature = currentSession.Configuration.TargetTemperature
            currentSession.commit()
        }
    }

    private def checkForTemperatureErrors = {
        var thermCount = -1
        var error = false
        currentSession.ThermometerConfig.foreach { tc =>

            thermCount += 1

            if ( ! tc.AlarmOn.isTruthy )
                next()

            val temperature = currentInstant.Instant.getAttribute( s"Therm${thermCount}" )

            // Start by assuming the measured temperature is within the alarm values.
            var inThreshold = true

            if ( tc.AlarmLow.isPresent ) {
                if ( temperature < tc.AlarmLow )
                    inThreshold = false
            }

            if ( tc.AlarmHigh.isPresent ) {
                if ( temperature > tc.AlarmHigh )
                    inThreshold = false
            }

            // if wTemperatureWithinAlarmThreshold is false then we're still warming up and
            // haven't gotten into the threshold yet.
            if ( tc.wTemperatureWithinAlarmThreshold ) {
                // If we get here then we have been within the threshold.  If we're no longer
                // in the threshold then set an error.
                if ( ! inThreshold ) {
                    error = true
                }
            }
            else
            {
                // If we get here then we haven't previously been in the threshold.
                if ( inThreshold )
                    tc.wTemperatureWithinAlarmThreshold = true // Now we are.
            }
        }

        hardware.setRedLed( error )
        if ( error ) {
            currentInstant.Instant.Error = true
            currentInstant.Instant.ErrorMessage = "Thermometer is outside its threshold"
        }
        else {
            currentInstant.Instant.Error = false
            currentInstant.Instant.ErrorMessage = ""
        }
    }

    /**
     * Get the result to use in PIDController
     * @return the result to use in PIDController
     */
    override def pidGet(): Double = {
        val instant = hardware.readSensors( currentSession )
        logger.debug( s"PID value = ${instant.Instant.Therm0}" )

        return instant.Instant.Therm0
    }

    /**
     * Set the output to the value calculated by PIDController
     * @param output the value calculated by PIDController
     */
    override def pidWrite(output: Double) {
        logger.debug( "pidWrite %s", output )
        hardware.setPwm( output.toInt, currentSession.Configuration.PwmFrequency )
    }

    def run() {
        logger.info( "Starting up controller for config %s", currentSession.Configuration.Description )
        currentSession.Configuration.logEntity()

        hardware.setGreenLed( false )
        hardware.setRedLed( false )
        hardware.setYellowLed( false )

        pid = new PIDController( currentSession.Configuration.PidP,
                                 currentSession.Configuration.PidI,
                                 currentSession.Configuration.PidD,
                                 0.0, this, this, 5.0, logger );

        pid.setOutputRange( 0, 100 );
        pid.setSetpoint( currentSession.Configuration.TargetTemperature );
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
        if ( currentInstant != null )
            return currentInstant
        else {
            val instant = hardware.readSensors( currentSession )
            instant.Instant.TargetTemperature = currentSession.Configuration.TargetTemperature
            return instant
        }
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
        val configOi = task.activate( "Configuration" ){ _.Configuration.Id = configId  }
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
