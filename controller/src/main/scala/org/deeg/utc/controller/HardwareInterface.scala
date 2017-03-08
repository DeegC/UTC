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
  def readSensors(): View @basedOn( "Instant" ) = {
    val instant = task.newView( "Instant" ).activateEmpty()
    instant.Instant create()
    instant.Instant.Timestamp = "NOW"
    instant.Instant.CpuTemperature = readCpuTemperature
    instant.Instant.Therm0 = readTemperature( 0 )
    instant.Instant.Therm1 = readTemperature( 1 )
    instant.Instant.Therm2 = readTemperature( 2 )
    instant.Instant.Therm3 = readTemperature( 3 )
    instant.Instant.Therm4 = readTemperature( 4 )
    instant.Instant.Therm5 = readTemperature( 5 )
    instant.Instant.Therm6 = readTemperature( 6 )
    instant.Instant.Therm7 = readTemperature( 7 )
    instant.logOi
    return instant
  }

  def task: Task
  def readCpuTemperature: Int
  def readTemperature( probe: Int ) : Double
  def setPwm( pwm: Int )
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