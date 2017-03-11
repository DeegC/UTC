
/*
  Generated from LOD Instant on 2017-03-11T17:30:38.371

*/

import * as zeidon from './zeidon';
import { Observable } from 'rxjs';
import { UTC_DomainList } from './UTC-DomainList';
import { UTC_DomainFunctions } from './UTC-DomainFunctions';



// Instant LOD.
export class Instant extends zeidon.ObjectInstance {
    protected rootEntityName(): string { return "Instant" };

    public getApplicationName(): String { return "UTC" };

    getPrototype(entityName: string): any {
        return InstantEntityPrototypes[entityName];
    }

    public getLodDef() {
        return Instant_LodDef;
    };

    public getDomain( name: string ): zeidon.Domain { 
        return UTC_DomainList[name];
    };

    public getDomainFunctions( name: string ): any { 
        return UTC_DomainFunctions[name];
    }


    get Instant(): zeidon.EntityArray<Instant_Instant> {
        return this.roots as zeidon.EntityArray<Instant_Instant>;
    }

    get Instant$(): Instant_Instant {
        return this.roots.selected() as Instant_Instant;
    }

    public static activate( qual?: any ): Observable<Instant> {
        return zeidon.ObjectInstance.activateOi( new Instant(), qual );
    }
}


export class Instant_Instant extends zeidon.EntityInstance {
    public get entityName(): string { return "Instant" };

    get Timestamp(): string { return this.getAttribute("Timestamp") };
    set Timestamp(value: string) { this.setAttribute("Timestamp", value) };

    get TargetTemperature(): string { return this.getAttribute("TargetTemperature") };
    set TargetTemperature(value: string) { this.setAttribute("TargetTemperature", value) };

    get Therm0(): string { return this.getAttribute("Therm0") };
    set Therm0(value: string) { this.setAttribute("Therm0", value) };

    get Therm1(): string { return this.getAttribute("Therm1") };
    set Therm1(value: string) { this.setAttribute("Therm1", value) };

    get Therm2(): string { return this.getAttribute("Therm2") };
    set Therm2(value: string) { this.setAttribute("Therm2", value) };

    get Therm3(): string { return this.getAttribute("Therm3") };
    set Therm3(value: string) { this.setAttribute("Therm3", value) };

    get Therm4(): string { return this.getAttribute("Therm4") };
    set Therm4(value: string) { this.setAttribute("Therm4", value) };

    get Therm5(): string { return this.getAttribute("Therm5") };
    set Therm5(value: string) { this.setAttribute("Therm5", value) };

    get Therm6(): string { return this.getAttribute("Therm6") };
    set Therm6(value: string) { this.setAttribute("Therm6", value) };

    get Therm7(): string { return this.getAttribute("Therm7") };
    set Therm7(value: string) { this.setAttribute("Therm7", value) };

    get PWM0(): string { return this.getAttribute("PWM0") };
    set PWM0(value: string) { this.setAttribute("PWM0", value) };

    get CpuTemperature(): string { return this.getAttribute("CpuTemperature") };
    set CpuTemperature(value: string) { this.setAttribute("CpuTemperature", value) };
}

const InstantEntityPrototypes = {
    Instant: Instant_Instant.prototype, 
}

export const Instant_LodDef = {
    name: "Instant",
    entities: {
        Instant: {
            name:       "Instant",
            erToken:    "905181315",
            create:     true,
            cardMax:    0,
            hasInit:    false,
            creatable:  true,
            includable: false,
            deletable:  true,
            excludable: false,
            updatable:  true,
            parentDelete: true,
            childEntities: {
            },
            attributes: {
                Timestamp: {
                    name:         "Timestamp",
                    hidden:       false,
                    required:     true,
                    domainName:   "DateTime",
                    persistent:   true,
                    key:          true,
                    update:       true,
                    foreignKey:   false,
                },
                TargetTemperature: {
                    name:         "TargetTemperature",
                    hidden:       false,
                    required:     true,
                    domainName:   "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm0: {
                    name:         "Therm0",
                    hidden:       false,
                    required:     false,
                    domainName:   "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm1: {
                    name:         "Therm1",
                    hidden:       false,
                    required:     false,
                    domainName:   "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm2: {
                    name:         "Therm2",
                    hidden:       false,
                    required:     false,
                    domainName:   "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm3: {
                    name:         "Therm3",
                    hidden:       false,
                    required:     false,
                    domainName:   "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm4: {
                    name:         "Therm4",
                    hidden:       false,
                    required:     false,
                    domainName:   "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm5: {
                    name:         "Therm5",
                    hidden:       false,
                    required:     false,
                    domainName:   "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm6: {
                    name:         "Therm6",
                    hidden:       false,
                    required:     false,
                    domainName:   "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm7: {
                    name:         "Therm7",
                    hidden:       false,
                    required:     false,
                    domainName:   "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                PWM0: {
                    name:         "PWM0",
                    hidden:       false,
                    required:     false,
                    domainName:   "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                CpuTemperature: {
                    name:         "CpuTemperature",
                    hidden:       false,
                    required:     false,
                    domainName:   "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                fk_id_session: {
                    name:         "fk_id_session",
                    hidden:       true,
                    required:     true,
                    domainName:   "GeneratedKey",
                    persistent:   true,
                    key:          true,
                    update:       true,
                    foreignKey:   true,
                },
            }
        },

    }
}
