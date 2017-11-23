package org.deeg.utc.controller

import com.quinsoft.zeidon.Task
import com.quinsoft.zeidon.scala.basedOn
import com.quinsoft.zeidon.scala.View
import sys.process._

/**
 * A dummy implementation of HardwareInterface used for tests.
 */
class TestHardwareInterface(val task : Task) extends HardwareInterface {

    var voltageArray: Array[Double] = null

    override def readTemperature(probe: Int): Double = {
        read_mcp3008()
        return voltageArray(probe) // "+ 1" is a hack to get around short-term error in hardware.
    }

    private def read_mcp3008(): Unit = {
        val voltages = "read_therms".!! + "0.0\n"
        task.log().debug("Measured voltages =\n%s", voltages)
        voltageArray = voltages.split("\n").map { vstr => probeConverter.computeTemperatureKelvin( vstr.toDouble ) }
    }

    def readCpuTemperature: Int = 99

    override def setRedLed(on: Boolean) {
        task.log().info(s"Turning Red LED: ${on}")
    }

    override def setGreenLed(on: Boolean) {
        task.log().info(s"Turning Green LED: ${on}")
    }

    override def setYellowLed(on: Boolean) {
        task.log().info(s"Turning Yellow LED: ${on}")
    }

    override def shutdown() {
        task.log().info("Pretending to shut down.")
    }
}
