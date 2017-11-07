
/*
  Generated from LOD Instant

*/

import * as zeidon from '../zeidon';
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

    public getDomainFunctions( domain: zeidon.Domain ): zeidon.DomainFunctions {
        return new ( UTC_DomainFunctions[ domain.class ] )( domain );
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

    get Timestamp(): Date { return this.getAttribute("Timestamp") };
    set Timestamp(value: Date) { this.setAttribute("Timestamp", value) };

    get TargetTemperature(): number { return this.getAttribute("TargetTemperature") };
    set TargetTemperature(value: number) { this.setAttribute("TargetTemperature", value) };

    get Therm0(): number { return this.getAttribute("Therm0") };
    set Therm0(value: number) { this.setAttribute("Therm0", value) };

    get Therm1(): number { return this.getAttribute("Therm1") };
    set Therm1(value: number) { this.setAttribute("Therm1", value) };

    get Therm2(): number { return this.getAttribute("Therm2") };
    set Therm2(value: number) { this.setAttribute("Therm2", value) };

    get Therm3(): number { return this.getAttribute("Therm3") };
    set Therm3(value: number) { this.setAttribute("Therm3", value) };

    get Therm4(): number { return this.getAttribute("Therm4") };
    set Therm4(value: number) { this.setAttribute("Therm4", value) };

    get Therm5(): number { return this.getAttribute("Therm5") };
    set Therm5(value: number) { this.setAttribute("Therm5", value) };

    get Therm6(): number { return this.getAttribute("Therm6") };
    set Therm6(value: number) { this.setAttribute("Therm6", value) };

    get Therm7(): number { return this.getAttribute("Therm7") };
    set Therm7(value: number) { this.setAttribute("Therm7", value) };

    get PWM0(): number { return this.getAttribute("PWM0") };
    set PWM0(value: number) { this.setAttribute("PWM0", value) };

    get CpuTemperature(): number { return this.getAttribute("CpuTemperature") };
    set CpuTemperature(value: number) { this.setAttribute("CpuTemperature", value) };

    get Error(): boolean { return this.getAttribute("Error") };
    set Error(value: boolean) { this.setAttribute("Error", value) };

    get ErrorMessage(): string { return this.getAttribute("ErrorMessage") };
    set ErrorMessage(value: string) { this.setAttribute("ErrorMessage", value) };
}

const InstantEntityPrototypes = {
    Instant: Instant_Instant.prototype,
}

export const Instant_LodDef = {
    name: "Instant",
    entities: {
        Instant: {
            name:        "Instant",
            erToken:     "905181315",
            create:      true,
            cardMax:     0,
            hasInit:     false,
            creatable:   true,
            includable:  false,
            deletable:   true,
            excludable:  false,
            updatable:   true,
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
                Error: {
                    name:         "Error",
                    hidden:       false,
                    required:     false,
                    domainName:   "Boolean",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                ErrorMessage: {
                    name:         "ErrorMessage",
                    hidden:       false,
                    required:     false,
                    domainName:   "Text",
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
