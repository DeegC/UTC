package org.deeg.utc

import com.quinsoft.zeidon.scala.basedOn
import com.quinsoft.zeidon.scala.View
import com.quinsoft.zeidon.scala.Implicits._
import sys.process._

/**
 * Reads sensor data from a C.H.I.P.
 */
class ChipSensorReader extends SensorReader {
    
  def readSensors( session: View @basedOn( "Session" ) ) = {
    session.Instant create()
    session.Instant.CpuTemperature = readCpuTemperature
  }

  private def readCpuTemperature: Int = {
    val lsb = "i2cget -y -f 0 0x34 0x5f".!!
    val msb = "i2cget -y -f 0 0x34 0x5e".!!
    val ilsb = Integer.parseInt(lsb.substring(2,4), 16)
    val imsb = Integer.parseInt(msb.substring(2,4), 16)
    val temp = (imsb << 4) | (ilsb & 0x0f)
    val tempc = temp / 10.0 - 144.7
    val tempf = tempc * 1.8 + 32
    tempf.round.toInt
  }
}
