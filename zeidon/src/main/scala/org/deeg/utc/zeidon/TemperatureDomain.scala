package org.deeg.utc.zeidon

import com.quinsoft.zeidon.domains.DoubleDomain
import com.quinsoft.zeidon.Task
import com.quinsoft.zeidon.Application
import com.quinsoft.zeidon.objectdefinition.AttributeDef
import com.quinsoft.zeidon.AttributeInstance

class TemperatureDomain( val application: Application, 
                         val domainProperties: java.util.Map[String, Object], 
                         val task: Task ) extends DoubleDomain( application, domainProperties, task ) {

    override def convertExternalValue( task: Task, 
                                       attributeInstance: AttributeInstance, 
                                       attributeDef: AttributeDef,
                                       contextName: String,
                                       externalValue: AnyRef ): AnyRef = {
        // Use super to convert the value to a decimal:
        val d = super.convertExternalValue( task, 
                                            attributeInstance, 
                                            attributeDef, 
                                            contextName, 
                                            externalValue ).asInstanceOf[ Double ]
        
        // Now convert to the internal value of C.
        contextName match {
            case "K" => d
            case "C" => d
            case _ => ( d - 32.0 ) * TemperatureDomain.F_to_C_ratio
        }
    }
}

object TemperatureDomain {
    val F_to_C_ratio = 5.0 / 9.0
}