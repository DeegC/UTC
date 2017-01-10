package org.deeg.utc.controller

import com.quinsoft.zeidon.scala.Implicits._
import sys.process._
import com.quinsoft.zeidon.Task

/**
 * Interface with a C.H.
import org.deeg.utc.controller.HardwareInterfaceI.P.
 */
class ChipHardwareInterface(val task: Task) extends HardwareInterface {
  
  override def setPwm( pwm : Int ) {
      task.log().debug("Setting pwm to %s", pwm )
  }
  
  override def readTemperature( probe : Int ) : Double = {
      return 100.0 + probe    
  }
  
  override def readCpuTemperature: Int = {
    val lsb = "i2cget -y -f 0 0x34 0x5f".!!
    val msb = "i2cget -y -f 0 0x34 0x5e".!!
    task.slog.debug( s"lsb = '$lsb', msb = '$msb'" )
    val ilsb = Integer.parseInt(lsb.substring(2,4), 16)
    val imsb = Integer.parseInt(msb.substring(2,4), 16)
    val temp = (imsb << 4) | (ilsb & 0x0f)
    val tempc = temp / 10.0 - 144.7
    val tempf = tempc * 1.8 + 32
    tempf.round.toInt
  }
}
