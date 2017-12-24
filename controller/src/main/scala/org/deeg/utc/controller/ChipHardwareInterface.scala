package org.deeg.utc.controller

import com.quinsoft.zeidon.scala.Implicits._
import sys.process._
import com.quinsoft.zeidon.Task
import org.joda.time.DateTime
import com.quinsoft.zeidon.scala.basedOn
import com.quinsoft.zeidon.scala.View

/**
 * Interface with a C.H.I.P.
 */
class ChipHardwareInterface(val task : Task ) extends HardwareInterface {

    task.log().info("Using ChipHardwareInterface");

    var lastRead: DateTime = null
    var voltageArray: Array[Double] = null

    // Set LEDs to indicate that the server is up.
    setRedLed( true )
    setGreenLed( true )
    setYellowLed( true )

    override def setPwm(pwm: Int, freq: Int) {
        super.setPwm(pwm, freq)
        task.log().info( s"set-pwm.sh ${freq} ${pwm}".!! )
    }

    override def readTemperature(probe: Int): Double = {
        read_mcp3008()
        return voltageArray(probe) // "+ 1" is a hack to get around short-term error in hardware.
    }

    private def read_mcp3008(): Unit = {
        // To keep from overworking the CHIP we'll read the temps no more
        // than once a second.
        val now = DateTime.now()
        if (lastRead != null) {
            val diff = now.getMillis - lastRead.getMillis
            if (diff < 1000)
                return
        }

        val voltages = "read_therms".!! + "0.0\n"
        task.log().debug("Measured voltages =\n%s", voltages)
        voltageArray = voltages.split("\n").map { vstr => probeConverter.computeTemperatureKelvin( vstr.toDouble ) }
        lastRead = now
    }

    override def readCpuTemperature: Int = {
        val lsb = "i2cget -y -f 0 0x34 0x5f".!!
        val msb = "i2cget -y -f 0 0x34 0x5e".!!
        task.slog.debug(s"lsb = '$lsb', msb = '$msb'")
        val ilsb = Integer.parseInt(lsb.substring(2, 4), 16)
        val imsb = Integer.parseInt(msb.substring(2, 4), 16)
        val temp = (imsb << 4) | (ilsb & 0x0f)
        val tempc = temp / 10.0 - 144.7
        val tempf = tempc * 1.8 + 32
        tempf.round.toInt
    }

    override def setRedLed(on: Boolean) {
        task.log().info( s"set-led.sh red ${on}".!! )
    }

    override def setGreenLed( on: Boolean ) {
        task.log().info( s"set-led.sh green ${on}".!! )
    }

    override def setYellowLed( on: Boolean ) {
        task.log().info( s"set-led.sh yellow ${on}".!! )
    }

    override def setGenericSwitch( number: Int, on: Boolean ) {
        task.log().warn(s"Generic switch ${number} not supported on CHIP.")
    }

    override def shutdown() {
        "shutdown now".!!
    }
}

object ChipHardwareInterface {
    def main(args: Array[String]) {
        System.out.println( "Kelvin = ${x}" )
    }
}
