package org.deeg.utc.controller

import scala.sys.process._

import com.quinsoft.zeidon.Task
import com.quinsoft.zeidon.scala.Implicits._
import com.quinsoft.zeidon.scala.View
import com.quinsoft.zeidon.scala.basedOn
import com.quinsoft.zeidon.ZeidonException
import com.quinsoft.zeidon.utils.JoeUtils

trait HardwareInterface {
    val task : Task
    private var configOi : View = null

    private var currentPwm: Int = 0
    private var currentFreq: Int = 0

    protected val utcConfig = task.activate( "UtcConfig" ).all()
    if ( utcConfig.UtcConfig.count != 1 ) {
        utcConfig.logOi
        throw new ZeidonException( "Unexpected number of UtcConfig entities" )
    }

    protected val temperatureUnit = utcConfig.UtcConfig.TemperatureUnit.getString()

    protected var probeConverter : ProbeConverter = null

    def setConfigOi( configOi : View @basedOn( "Configuration" ) ) = {
        this.configOi = configOi
        probeConverter = ProbeConverter.getConfiguredConverter( configOi )
    }

    /**
     * Read the value of different sensors and create a new Instant entity.
     */
    def readSensors( session: View @basedOn( "Session") ) : View @basedOn("Instant") = {
        val instant = task.newView("Instant").activateEmpty()
        instant.Instant create ()
        instant.Instant.Timestamp = "NOW"
        instant.Instant.CpuTemperature = readCpuTemperature
        instant.Instant.Therm0 = convertTemperature( session, readTemperature(0) )
        instant.Instant.Therm1 = convertTemperature( session, readTemperature(1) )
        instant.Instant.Therm2 = convertTemperature( session, readTemperature(2) )
        instant.Instant.Therm3 = convertTemperature( session, readTemperature(3) )
        instant.Instant.Therm4 = convertTemperature( session, readTemperature(4) )
        instant.Instant.Therm5 = convertTemperature( session, readTemperature(5) )
        instant.Instant.Therm6 = convertTemperature( session, readTemperature(6) )
        instant.Instant.Therm7 = convertTemperature( session, readTemperature(7) )
        instant.Instant.PWM0 = readPwm()
        return instant
    }

    def convertTemperature( session: View @basedOn( "Session" ),
                            tempKelvin : Double ) : Double = {
        if ( tempKelvin.isNaN() )
            return Double.NaN

        if ( session == null )
            tempKelvin

        return temperatureUnit match {
            case "K" => tempKelvin
            case "C" => tempKelvin - 273.15
            case "F" => tempKelvin * 9.0 / 5.0 - 459.67
        }
    }

    def readCpuTemperature: Int
    def readTemperature(probe: Int): Double
    def setPwm(pwm: Int, freq: Int) = {
        task.log().debug("Setting test pwm to %s, freq=%s", pwm, freq )
        currentPwm = pwm
        currentFreq = freq
    }
    def readPwm() = currentPwm

    def setRedLed( on: Boolean )
    def setGreenLed( on: Boolean )
    def setYellowLed( on: Boolean )
    def setGenericSwitch( number: Int, on: Boolean )
    def shutdown()
}

object HardwareInterface {

    /**
     * Attempt to figure out which HardwareInterface to use depending on the
     * local hardware.
     */
    def getHardwareInterface(task: Task): HardwareInterface = {

        val arch = JoeUtils.getEnvProperty("HARDWARE")

        arch match {
            case "chip" => new ChipHardwareInterface(task)
            case "rpi"  => new RpiHardwareInterface(task)
            case "test" => new TestHardwareInterface(task)
            case _      => throw new ZeidonException(s"Unknown/unspecified hardware: ${arch}")
        }
    }
}
