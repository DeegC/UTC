package com.deeg.utc.zeidon

import com.quinsoft.zeidon.Task
import com.quinsoft.zeidon.scala.ZeidonOperations
import com.quinsoft.zeidon.scala.Implicits._

class Configuration( var task: Task ) extends ZeidonOperations {
    
    def createDefaultConfiguration() {
        val config = task.activate( "Configuration", qual => {
            qual.rootOnlyMultiple()
            qual.limit( 1 )
        } )
        
        if ( config.isEmpty ) {
            config.Configuration create()
            config.Configuration.Description = "Basic configuration"
            config.Configuration.TargetTemperature = 250
            config.Configuration.TemperatureUnit = "F"
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
            
            config commit()
        }
        
    }
}
