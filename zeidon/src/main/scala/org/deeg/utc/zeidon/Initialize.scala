package org.deeg.utc.zeidon

import com.quinsoft.zeidon.ObjectEngine
import com.quinsoft.zeidon.scala.Implicits._
import com.quinsoft.zeidon.scala.View
import com.quinsoft.zeidon.standardoe.JavaObjectEngine

object Initialize {
    def initialize( oe : ObjectEngine ) = {
        oe.forTask( "UTC" ) { task =>
            val thermType = task.activate( "ThermometerType", qual => {
                qual.rootOnlyMultiple()
                qual.limit( 1 )
            } )

            if ( thermType.isEmpty ) {
                thermType.activateEmpty()
                thermType.ThermometerType.create()
                thermType.ThermometerType.Name = "ET-72/73 22.1k"
                thermType.ThermometerType.Description = "Maverick ET-72/73 probes using 22.1k ohm resistors"
                thermType.ThermometerType.ProbeAlgorithm = "SteinhartHart"

                thermType.SteinhartHartConfig.create()
                thermType.SteinhartHartConfig.A = 2.3067434E-4
                thermType.SteinhartHartConfig.B = 2.3696596E-4
                thermType.SteinhartHartConfig.C = 1.2636414E-7
                thermType.SteinhartHartConfig.R = 22100
                thermType.SteinhartHartConfig.VoltageReference = 3.3

                thermType.ThermometerType.create()
                thermType.ThermometerType.Name = "ET-72/73 10000k"
                thermType.ThermometerType.Description = "Maverick ET-72/73 probes using 10000K ohm resistors"
                thermType.ThermometerType.ProbeAlgorithm = "SteinhartHart"

                thermType.SteinhartHartConfig.create()
                thermType.SteinhartHartConfig.A = 2.3067434E-4
                thermType.SteinhartHartConfig.B = 2.3696596E-4
                thermType.SteinhartHartConfig.C = 1.2636414E-7
                thermType.SteinhartHartConfig.R = 10000000
                thermType.SteinhartHartConfig.VoltageReference = 3.3

                thermType.commit()
            }

            val utcConfig = task.activate( "UtcConfig", qual => {
                qual.rootOnlyMultiple()
                qual.limit( 1 )
            } )

            if ( utcConfig.isEmpty ) {
                utcConfig.activateEmpty()
                utcConfig.UtcConfig.create()
                utcConfig.UtcConfig.TemperatureUnit = "F"
                thermType.ThermometerType.setFirst()
                utcConfig.DefaultThermometerType.include( thermType.ThermometerType )

                utcConfig.commit()
            }

            val config = task.activate( "Configuration", qual => {
                qual.rootOnlyMultiple()
                qual.limit( 1 )
            } )

            if ( config.isEmpty ) {
                config.Configuration create()
                config.Configuration.Description = "Basic configuration"
                config.Configuration.TargetTemperature = 250
                config.Configuration.RecordTemperatures = false
                config.Configuration.MaxPWM = 255
                config.Configuration.TweetOn = false
                config.Configuration.PwmFrequency = 100
                config.Configuration.PidP = 3
                config.Configuration.PidI = 0.005
                config.Configuration.PidD = 5

                config.ThermometerConfig.create()
                config.ThermometerConfig.Name = "Pit"
                config.ThermometerConfig.AlarmOn = false

                config.ThermometerType.include( utcConfig.DefaultThermometerType )

                config commit()
            }
        }
    }

    def main(args: Array[String]) {
        val oe = JavaObjectEngine.getInstance()
        Initialize.initialize(oe)
    }
}
