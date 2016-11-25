import { Domain } from "./zeidon"
import { AttributeValueError } from "./zeidon"

export const UTC_DomainFunctions = {
    "com.quinsoft.zeidon.domains.BooleanDomain": {
        convertExternalValue( value: any, attributeDef: any, domain: Domain ): any {
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
    }
}
