package org.deeg.utc.controller

import com.quinsoft.zeidon.scala.basedOn
import com.quinsoft.zeidon.scala.View

/**
 * Implementation of the Steinhart-Hart equation:
 *
 * http://en.wikipedia.org/wiki/Steinhart%E2%80%93Hart_equation
 *
 */

class SteinhartHart( val thermometerType : View @basedOn( "ThermometerType" ) )
                    extends ProbeConverter {

    val A : Double = thermometerType.SteinhartHartConfig.A
    val B : Double = thermometerType.SteinhartHartConfig.B
    val C : Double = thermometerType.SteinhartHartConfig.C
    val R : Double = thermometerType.SteinhartHartConfig.R
    val voltageReference: Double = thermometerType.SteinhartHartConfig.VoltageReference

    thermometerType.log.info( "############################## " )
    thermometerType.log.info( "Using following for Steinhart: " )
    thermometerType.SteinhartHartConfig.logEntity()

    def computeTemperatureKelvin( voltageReading : Double ): Double = {
        if ( voltageReading > 3.22 )
            return Double.NaN

        val diff = voltageReference - voltageReading
        val measuredR = voltageReading * R
        val resistence = measuredR / diff

        val logResistence = Math.log( resistence )
        val t = A +
                B * logResistence +
                C * Math.pow( logResistence, 3.0 )

        val T = 1.0 / t
        return T
    }
}

object SteinhartHart {
    def main(args: Array[String]) {
//        val measuredVoltage = 3.038964844
//        val alg = new SteinhartHart( 2.3067434E-4, 2.3696596E-4, 1.2636414E-7, 22200, 3.22 )
////        val alg = new SteinhartHart( 2.4723753e-04,2.3402251e-04,1.3879768e-07, 22200, 3.22 )
//        val k = alg.computeTemperature( measuredVoltage )
//        System.out.println( "Kelvin = " + k )
    }
}
