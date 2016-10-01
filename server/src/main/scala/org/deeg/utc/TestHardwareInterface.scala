package org.deeg.utc

import com.quinsoft.zeidon.Task

/**
 * A dummy implementation of HardwareInterface used for tests.
 */
class TestHardwareInterface(val task: Task) extends HardwareInterface {
  
  def readCpuTemperature: Int = 99
  
}