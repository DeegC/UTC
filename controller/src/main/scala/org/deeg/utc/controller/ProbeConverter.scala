package org.deeg.utc.controller

import com.quinsoft.zeidon.Task
import com.quinsoft.zeidon.scala.View
import com.quinsoft.zeidon.scala.basedOn
import com.quinsoft.zeidon.scala.Implicits._
import com.quinsoft.zeidon.ZeidonException

trait ProbeConverter {
    val thermometerType : View

    def computeTemperatureKelvin( voltageReading : Double ) : Double
}

object ProbeConverter {

    def getConfiguredConverter( configOi : View @basedOn( "Configuration" ) ): ProbeConverter = {
        val task = configOi.task
        val thermometerType = task.activate( "ThermometerType" ) {
            _.ThermometerType = configOi.ThermometerType
        }

        // Right now we only support Steinhart.
        if ( ! thermometerType.SteinhartHartConfig.exists )
            throw new ZeidonException( "Steinhart config not specified" )

        return new SteinhartHart( thermometerType )
    }
}
