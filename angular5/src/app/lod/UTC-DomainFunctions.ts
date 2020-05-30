import * as domains from "../zeidon-domains"
import { DomainFunctions } from "../zeidon"

export class TemperatureDomainFunctions extends domains.DoubleDomainFunctions {
    convertExternalValue( value: any, attributeDef: any, context?: any ): any {
        // Use super to get the value as a double.
        let c = super.convertExternalValue( value, attributeDef, context );

        // Now convert to C if context indicates value is F or K.
        switch( context ) {
            case 'Fahrenheit':
            case 'F':
                c = ( c - 32.0 ) * 5.0 / 9.0;
                break;

            case 'Kelvin':
            case 'K':
                c = c - 273.15;
                break;

            case undefined:
            case '':
            case 'C':
            case 'Celsius':
                return c;  // Just return.  This skips the rounding.

            default:
                throw `Unknown TemperatureDomain context ${context}`
        }

        // Round to nearest tenth.
        return Math.round( c * 10.0 ) / 10.0;
    }

    convertToJsType( c: any, attributeDef: any, context = undefined ): any {
        // Convert from C to value specified by context.
        switch ( context ) {
            case 'Fahrenheit':
            case 'F':
                c = ( c * 9.0 / 5.0 ) + 32.0;
                break;

            case 'Kelvin':
            case 'K':
                c = c + 273.15;
                break;

            case undefined:
            case '':
            case 'C':
            case 'Celsius':
                return c;  // Just return.  This skips the rounding.

            default:
                throw `Unknown TemperatureDomain context ${context}`
        }

        // Round to nearest tenth.
        return Math.round( c * 10.0 ) / 10.0;
    }

}

export const UTC_DomainFunctions = {
    "com.quinsoft.zeidon.domains.BooleanDomain":
            function( domain ): DomainFunctions { return new domains.BooleanDomainFunctions( domain ) },
    "com.quinsoft.zeidon.domains.IntegerDomain":
            function( domain ): DomainFunctions { return new domains.IntegerDomainFunctions( domain ) },
    "com.quinsoft.zeidon.domains.StringDomain":
            function ( domain ): DomainFunctions { return new domains.StringDomainFunctions( domain ) },
    "com.quinsoft.zeidon.domains.DoubleDomain":
            function ( domain ): DomainFunctions { return new domains.DoubleDomainFunctions( domain ) },
    "org.deeg.utc.zeidon.TemperatureDomain":
            function ( domain ): DomainFunctions { return new TemperatureDomainFunctions( domain ) },
    "com.quinsoft.zeidon.domains.StaticTableDomain":
            function ( domain ): DomainFunctions { return new domains.StaticTableDomainFunctions( domain ) },
}
