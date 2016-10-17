import * as zeidon from './zeidon';

// Configuration LOD.
export class Configuration extends zeidon.ObjectInstance {
    protected rootEntityName(): string { return "Configuration" };

    get Configuration(): Configuration_Configuration {
        return this.roots[0];
    }

    getPrototype( entityName: string ): any {
        return prototypes[ entityName ];
    }
}

export class Configuration_Configuration extends zeidon.EntityInstance {
    get attributes() {
        return {
            Id: true,
            Description: true,
            TargetTemperature: true,
            ThermometerCount: true
        };
    }

    get childEntities() {
        return {
            ThermometerConfig: true
        };
    }

    get Id(): string { return this.getAttribute("Id") };
    set Id( value: string ) { this.setAttribute( "Id", value ) };

    get Description(): string { return this.getAttribute("Description") };
    set Description( value: string ) { this.setAttribute( "Description", value ) };
    
    get TargetTemperature(): string { return this.getAttribute("TargetTemperature") };
    set TargetTemperature( value: string ) { this.setAttribute( "TargetTemperature", value ) };
    
    get ThermometerCount(): string { return this.getAttribute("ThermometerCount") };
    set ThermometerCount( value: string ) { this.setAttribute( "ThermometerCount", value ) };

    get ThermometerConfig(): zeidon.EntityArray<Configuration_ThermometerConfig> {
        let entities =  this.getChildEntities( "ThermometerConfig" )
        return entities as zeidon.EntityArray<Configuration_ThermometerConfig>;
    }
}

export class Configuration_ThermometerConfig extends zeidon.EntityInstance {
    get attributes() {
        return {
            Id: true,
            Name: true,
            AlarmOn: true,
            fk_id_configuration: true
        };
    }

    get childEntities() {
        return {};
    }

    get Id(): string { return this.getAttribute("Id") };
    set Id( value: string ) { this.setAttribute( "Id", value ) };

    get Name(): string { return this.getAttribute("Name") };
    set Name( value: string ) { this.setAttribute( "Name", value ) };
    
    get AlarmOn(): string { return this.getAttribute("AlarmOn") };
    set AlarmOn( value: string ) { this.setAttribute( "AlarmOn", value ) };
    
    get fk_id_configuration(): string { return this.getAttribute("fk_id_configuration") };
    set fk_id_configuration( value: string ) { this.setAttribute( "fk_id_configuration", value ) };
}

const prototypes = {
    "Configuration": Configuration_Configuration.prototype,
    "ThermometerConfig": Configuration_ThermometerConfig.prototype
}
