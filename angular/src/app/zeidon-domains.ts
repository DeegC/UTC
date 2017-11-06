import { Domain, BaseDomainFunctions } from "./zeidon"
import { ZeidonError, AttributeValueError } from "./zeidon"

/**
 * User-written code to process domains.
 */
export class StringDomainFunctions extends BaseDomainFunctions {
    convertExternalValue( value: any, attributeDef: any, context? : any ): any {
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
    convertExternalValue( value: any, attributeDef: any, context? : any ): any {
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
    convertExternalValue( value: any, attributeDef: any, context? : any ): any {
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
    convertExternalValue( value: any, attributeDef: any, context? : any ): any {
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

export class StaticTableDomainFunctions extends BaseDomainFunctions {
    private getImplicitContext( attributeDef: any, context: string ): string {
        let domain = attributeDef.domain as Domain;
        if ( !domain.contexts )
            throw new ZeidonError( "Table domain has no contexts" );

        if ( !context )
            context = domain.defaultContext;

        if ( !context )
            throw new ZeidonError( `Invalid context ${context}` );

        let entries = domain.contexts[ context ];
        if ( !entries )
            throw new ZeidonError( `Context ${context} not found in domain ${domain.name}` );

        return context;
    }

    private getEntries( attributeDef: any, context: string ): any {
        context = this.getImplicitContext( attributeDef, context );
        let domain = attributeDef.domain as Domain;
        return domain.contexts[ context ].entries;
    }

    convertExternalValue( externalValue: any, attributeDef: any, context? : string ): any {
        this.checkForRequiredValue( externalValue, attributeDef );
        let entries = this.getEntries( attributeDef, context );

        // If externalValue maps to key in entries then externalValue is actually
        // an internal value.  Just return it.
        if ( entries[ externalValue ] )
            return  externalValue;

        for ( let internalValue in entries ) {
            if ( entries[ internalValue ] === externalValue )
                return internalValue;
        }

        throw new AttributeValueError( `Unknown table value for ${externalValue}`, attributeDef );
    }

    convertToJsType( internalValue: any, attributeDef: any, context? : string ): any {
        let entries = this.getEntries( attributeDef, context );

        // If there is a mapping of internalValue to external value, then return the
        // external value.
        if ( entries[ internalValue ] )
            return entries[ internalValue ];

        // No mapping.  This means that the internalValue is actually an external
        // value, so return that.
        return internalValue;
    }

    getTableEntries?( attributeDef: any, context?: string ): any {
        return this.getEntries( attributeDef, context );
    }

}

// Dummy class for copying.
export class xxxDomainFunctions extends BaseDomainFunctions {
    convertExternalValue( value: any, attributeDef: any, context?: any ): any {
        this.checkForRequiredValue( value, attributeDef );
        return value;
    }
}
