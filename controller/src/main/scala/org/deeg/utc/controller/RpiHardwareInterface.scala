package org.deeg.utc.controller

import com.quinsoft.zeidon.scala.Implicits._
import com.quinsoft.zeidon.Task
import sys.process._
import com.quinsoft.zeidon.scala.basedOn
import com.quinsoft.zeidon.scala.View

class RpiHardwareInterface( task : Task ) extends ChipHardwareInterface( task ) {

    /**
     * Read the value of different sensors and create a new Instant entity.
     */
    override def readSensors( session: View @basedOn( "Session") ) : View @basedOn("Instant") = synchronized {
        val instant = task.newView("Instant").activateEmpty()
        instant.Instant create ()
        instant.Instant.Timestamp = "NOW"
        instant.Instant.CpuTemperature = readCpuTemperature
        val temps = readProbes()
        instant.Instant.Therm0 = temps(0)
        instant.Instant.Therm1 = temps(1)
        instant.Instant.Therm2 = temps(2)
        instant.Instant.Therm3 = temps(3)
        instant.Instant.Therm4 = temps(4)
        instant.Instant.Therm5 = temps(5)
        instant.Instant.Therm6 = temps(6)
        instant.Instant.Therm7 = temps(7)
        instant.Instant.PWM0 = readPwm()
        return instant
    }

    override def readTemperature(probe: Int): Double = synchronized {
        val temps = readProbes()
        return temps( probe )
    }

    override def readCpuTemperature: Int = synchronized {
        val tempstr = "cat /sys/class/thermal/thermal_zone0/temp".!!.dropRight(1)
        task.slog.debug(s"tempstr = ${tempstr}")
        val tempc = Integer.parseInt( tempstr ) / 1000.0
        val tempf = tempc * 1.8 + 32
        tempf.round.toInt
    }

    private def readProbes(): Array[Double] = {
        val tempstr = "read-temps.py".!!
        task.log().debug("Retrieved temps =\n%s", tempstr )
        val temps = tempstr.split("\n").map( _.toDouble )
        return temps
    }
}
