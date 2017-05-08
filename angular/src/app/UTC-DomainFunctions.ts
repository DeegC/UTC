import { Domain } from "./zeidon"
import { AttributeValueError } from "./zeidon"

/**
 * User-written code to process domains.
 */
export interface DomainFunctions {
    convertExternalValue?( value: any, attributeDef: any, context? : any ): any;
}

export class BaseDomainFunctions implements DomainFunctions {
    checkForRequiredValue( value: any, attributeDef: any ) {
        if ( attributeDef.required && ( value == undefined || value === "" ) )
            throw new AttributeValueError(`Value is required.`, attributeDef );
    }

    convertExternalValue?( value: any, attributeDef: any, context? : any ): any {
        this.checkForRequiredValue( value, attributeDef );
        return value;
    }
}

export class StringDomainFunctions extends BaseDomainFunctions {
    convertExternalValue?( value: any, attributeDef: any, context? : any ): any {
        this.checkForRequiredValue( value, attributeDef );
        if ( value == undefined )
            return undefined;

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
}

export class IntegerDomainFunctions extends BaseDomainFunctions {
    convertExternalValue?( value: any, attributeDef: any, context? : any ): any {
        this.checkForRequiredValue( value, attributeDef );
        if ( value == undefined )
            return undefined;

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

        if ( ! Number.isInteger( value ) )
            throw new AttributeValueError(`Invalid integer value: ${value}`, attributeDef );

        return value;
    }
}

export class BooleanDomainFunctions extends BaseDomainFunctions {
    convertExternalValue?( value: any, attributeDef: any, context? : any ): any {
        this.checkForRequiredValue( value, attributeDef );

        switch ( value ) {
            case true:
            case false:
                return value
            case "true":
            case "TRUE":
                return true;
            case "false":
            case "FALSE":
                return false;
            case null:
            case "":
            case undefined:
                return undefined;
        }

        throw new AttributeValueError(`Invalid boolean value: ${value}`, attributeDef );
    }
}

export class DoubleDomainFunctions extends BaseDomainFunctions {
    convertExternalValue?( value: any, attributeDef: any, context? : any ): any {
        this.checkForRequiredValue( value, attributeDef );
        if ( value == undefined )
            return undefined;

        if ( typeof value === 'number' ) {
            // Do nothing atm.
        } else
        if ( typeof value === 'string' ) {
            let v = Number(value);
            if ( isNaN( v ) ) {
                throw new AttributeValueError(`Invalid double value: ${value}`, attributeDef );
            }

            value = v;
        } else {
            throw new AttributeValueError(`Invalid double value: ${value}`, attributeDef );
        }

        return value;
    }
}

export class xxxDomainFunctions extends BaseDomainFunctions {
    convertExternalValue?( value: any, attributeDef: any, context? : any ): any {
        this.checkForRequiredValue( value, attributeDef );
        return value;
    }
}

export const UTC_DomainFunctions = {
    "com.quinsoft.zeidon.domains.BooleanDomain": new BooleanDomainFunctions(),
    "com.quinsoft.zeidon.domains.IntegerDomain": new IntegerDomainFunctions(),
    "com.quinsoft.zeidon.domains.StringDomain": new StringDomainFunctions(),
    "com.quinsoft.zeidon.domains.DoubleDomain": new DoubleDomainFunctions(),
}
