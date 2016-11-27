import { Domain } from "./zeidon"
import { AttributeValueError } from "./zeidon"

/**
 * User-written code to process domains.
 */

export const UTC_DomainFunctions = {
    "com.quinsoft.zeidon.domains.BooleanDomain": {
        convertExternalValue( value: any, attributeDef: any ): any {
            if ( attributeDef.required && value == undefined )
                throw new AttributeValueError(`Value is required.`, attributeDef );
                
            switch ( value ) {
                case true:
                case false:
                    return value
                case "true": 
                    return true;
                case "false": 
                    return false;
            }

            throw new AttributeValueError(`Invalid boolean value: ${value}`, attributeDef );
        }
    },

    "com.quinsoft.zeidon.domains.IntegerDomain": {
        convertExternalValue( value: any, attributeDef: any ): any {
            if ( attributeDef.required && value == undefined )
                throw new AttributeValueError(`Value is required.`, attributeDef );
                
            if ( typeof value === 'number' ) {
                // Do nothing atm.
            } else
            if ( typeof value === 'string' ) {
                let v = Number(value);
                if ( isNaN( v ) ) {
                    throw new AttributeValueError(`Invalid integer value: ${value}`, attributeDef );
                }
                value = v;
            } else {
                throw new AttributeValueError(`Invalid integer value: ${value}`, attributeDef );
            }

            return value;
        }
    },

    "com.quinsoft.zeidon.domains.StringDomain": {
        convertExternalValue( value: any, attributeDef: any ): any {
            if ( attributeDef.required && value == undefined )
                throw new AttributeValueError(`Value is required.`, attributeDef );
                
            let str = value.toString();

            if ( attributeDef.maxLength ) {
                if ( str.length > attributeDef.maxLength )
                    throw new AttributeValueError(`Length is longer than max string length: ${value}`, attributeDef );
                else
                if ( str.length > attributeDef.domain.maxLength )
                    throw new AttributeValueError(`Length is longer than max string length: ${value}`, attributeDef );
            }

            return str;
        }
    },
}
