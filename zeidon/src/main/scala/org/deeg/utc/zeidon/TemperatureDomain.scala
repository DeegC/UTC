package org.deeg.utc.zeidon

import com.quinsoft.zeidon.domains.DoubleDomain
import com.quinsoft.zeidon.Task
import com.quinsoft.zeidon.Application
import com.quinsoft.zeidon.objectdefinition.AttributeDef
import com.quinsoft.zeidon.AttributeInstance
import org.apache.commons.lang3.StringUtils

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


        convertValueToCelsius( d, contextName ).asInstanceOf[AnyRef]
    }

    override def convertToString( task: Task,
                                  attributeDef: AttributeDef,
                                  internalValue: AnyRef,
                                  contextName: String ): String = {
        val t = convertCelsiusToValue( internalValue.asInstanceOf[Double], contextName )
        super.convertToString( task, attributeDef, t, contextName )
    }

    private def convertValueToCelsius( t: Double, contextName: String ) : Double = {
        val c = contextName match {
            case "K" => t - 273.15
            case "C" => t
            case "F" => ( t - 32.0 ) * TemperatureDomain.F_to_C_ratio
            case _ => return t  // If no context just return the value.
        }

        // Round to the nearest .tenth.
        return Math.round( c * 10.0 ) / 10.0
    }

    private def convertCelsiusToValue( c: Double, contextName: String ) : Double = {
        val t = contextName match {
            case "K" => c + 273.15
            case "C" => c
            case "F" => ( c * TemperatureDomain.C_to_F_ratio ) + 32.0
            case _ => return c // If no context return the value.
        }

        // Round to the nearest .tenth.
        return Math.round( t * 10.0 ) / 10.0
    }
}

object TemperatureDomain {
    val F_to_C_ratio = 5.0 / 9.0
    val C_to_F_ratio = 9.0 / 5.0
}
