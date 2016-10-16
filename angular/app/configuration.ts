import { ZeidonObjectInstance } from './zeidon.object.instance';
//import { ZeidonEntityInstance } from './zeidon.entity.instance';
import * as zeidon from './zeidon.entity.instance';

export class Configuration extends ZeidonObjectInstance {

    constructor( initialize: Object ) {
        super( initialize );
    }

    protected oiName(): string { return "Configuration" };
    protected rootEntityName(): string { return "Configuration" };

    get Configuration(): Configuration_Configuration {
        return this.roots[0];
    }

    getPrototype( entityName: string ): any {
        return prototypes[ entityName ];
    }
}

export class Configuration_Configuration extends zeidon.ZeidonEntityInstance {
    attributes = {
        Id: true,
        Description: true,
        TargetTemperature: true,
        ThermometerCount: true
    }

    constructor( initialize: Object ) {
        super( initialize );
    }

    get Id(): string { return this.getAttribute("Id") };
    set Id( value: string ) { this.setAttribute( "Id", value ) };

    get Description(): string { return this.getAttribute("Description") };
    set Description( value: string ) { this.setAttribute( "Description", value ) };
    
    get TargetTemperature(): string { return this.getAttribute("TargetTemperature") };
    set TargetTemperature( value: string ) { this.setAttribute( "TargetTemperature", value ) };
    
    get ThermometerCount(): string { return this.getAttribute("ThermometerCount") };
    set ThermometerCount( value: string ) { this.setAttribute( "ThermometerCount", value ) };
}

const prototypes = {
    "Configuration": Configuration_Configuration.prototype
}
