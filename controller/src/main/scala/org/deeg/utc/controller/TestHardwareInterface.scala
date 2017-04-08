package org.deeg.utc.controller

import com.quinsoft.zeidon.Task

/**
 * A dummy implementation of HardwareInterface used for tests.
 */
class TestHardwareInterface(val task: Task) extends HardwareInterface {

    override def readTemperature(probe: Int): Double = {
        return 100.0 + probe
    }

    def readCpuTemperature: Int = 99

    override def setRedLed(on: Boolean) {
        task.log().info("Turning Red LED: ${on}")
    }

    override def setGreenLed(on: Boolean) {
        task.log().info("Turning Green LED: ${on}")
    }

    override def setYellowLed(on: Boolean) {
        task.log().info("Turning Yellow LED: ${on}")
    }
}