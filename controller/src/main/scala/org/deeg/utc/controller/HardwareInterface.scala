package org.deeg.utc.controller

import com.quinsoft.zeidon.scala.basedOn
import com.quinsoft.zeidon.scala.View
import com.quinsoft.zeidon.scala.Implicits._
import com.quinsoft.zeidon.Task
import sys.process._

trait HardwareInterface {
  /**
   * Read the value of different sensors and create a new Instant entity.
   */
  def readSensors( session: View @basedOn( "Session" ) ) = {
    session.Instant create()
    session.Instant.CpuTemperature = readCpuTemperature
    task.log.debug( "CpuTemperature=%s", session.Instant.CpuTemperature )
  }

  def task: Task
  def readCpuTemperature: Int
}

object HardwareInterface {
  
  /**
   * Attempt to figure out which HardwareInterface to use depending on the
   * local hardware.
   */
  def getHardwareInterface( task: Task ): HardwareInterface = {
    
    val arch = 
      try {  
        val lscpu = "lscpu".!!
        "Architecture:\\s*([^\\n]*)".r.findFirstMatchIn(lscpu).map(_ group 1).get
      }
      catch {
        case e: Exception => e.getMessage
      }
    
    task.slog.info( s"CPU architecture = '$arch'" )
    
    arch match {
      case "armv7l" => new ChipHardwareInterface( task )
      case _ => {
        task.slog.warn( s"Using TestHardwareInterface for architecture = '$arch'" )
        new TestHardwareInterface( task )
      }
    }
    
  }
}