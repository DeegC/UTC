package org.deeg.utc.controller

import com.quinsoft.zeidon.scala.Implicits._
import com.quinsoft.zeidon.Task
import sys.process._

class RpiHardwareInterface( task : Task ) extends ChipHardwareInterface( task ) {

    override def readCpuTemperature: Int = {
        val tempstr = "cat /sys/class/thermal/thermal_zone0/temp".!!.dropRight(1)
        task.slog.debug(s"tempstr = ${tempstr}")
        val tempc = Integer.parseInt( tempstr ) / 1000.0
        val tempf = tempc * 1.8 + 32
        tempf.round.toInt
    }

}
