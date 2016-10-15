import { ZeidonEntityInstance }   from './zeidon.entity.instance';

export class Configuration extends ZeidonEntityInstance {
    attributes = {
        Id: true,
        Description: true,
        TargetTemperature: true,
        ThermometerCount: true
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
