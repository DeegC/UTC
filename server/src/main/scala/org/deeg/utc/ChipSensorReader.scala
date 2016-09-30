package org.deeg.utc

import com.quinsoft.zeidon.scala.basedOn
import com.quinsoft.zeidon.scala.View

/**
 * Reads sensor data from a C.H.I.P.
 */
class ChipSensorReader extends SensorReader {
    
  def readSensors( session: View @basedOn( "Session" ) ) = {
    
  }

}