package org.deeg.utc.controller

import com.quinsoft.zeidon.Task

/**
 * A dummy implementation of HardwareInterface used for tests.
 */
class TestHardwareInterface(val task: Task) extends HardwareInterface {
  
  override def setPwm( pwm : Int ) {
      task.log().debug("Setting test pwm to %s", pwm )
  }
  
  override def readTemperature( probe : Int ) : Double = {
      return 100.0 + probe    
  }
  
  def readCpuTemperature: Int = 99
  
}