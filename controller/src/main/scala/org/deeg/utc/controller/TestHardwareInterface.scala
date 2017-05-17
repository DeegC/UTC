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
