package org.deeg.utc.controller

/**
 * Implementation of the Steinhart-Hart equation:
 *
 * http://en.wikipedia.org/wiki/Steinhart%E2%80%93Hart_equation
 *
 */

class SteinhartHart(val A : Double,
                    val B : Double,
                    val C : Double,
                    val R : Double,
                    val voltageReference: Double ) {

    def computeTemperature( measuredVoltage: Double ): Double = {
        if ( measuredVoltage > 3.22 )
            return Double.NaN

        val diff = voltageReference - measuredVoltage
        val measuredR = measuredVoltage * R
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
        val measuredVoltage = 2.810156
        val alg = new SteinhartHart( 2.3067434E-4, 2.3696596E-4, 1.2636414E-7, 22200, 3.22 )
//        val alg = new SteinhartHart( 2.4723753e-04,2.3402251e-04,1.3879768e-07, 22200, 3.22 )
        val k = alg.computeTemperature( measuredVoltage )
        System.out.println( "Kelvin = " + k )
    }
}
