package org.deeg.utc

import com.quinsoft.zeidon.scala.basedOn
import com.quinsoft.zeidon.scala.View

trait SensorReader {
  /**
   * Read the value of different sensors and create a new Instant entity.
   */
  def readSensors( session: View @basedOn( "Session" ) )
}