
/*
  Generated from LOD Instant on 2016-12-18T01:33:59.130

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

    get Session(): zeidon.EntityArray<Instant_Session> {
        return this.getChildEntityArray("Session") as zeidon.EntityArray<Instant_Session>;
    }

    get Session$(): Instant_Session {
        return this.getChildEntityArray("Session").selected() as Instant_Session;
    }
}

export class Instant_Session extends zeidon.EntityInstance {
    public get entityName(): string { return "Session" };

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get Date(): string { return this.getAttribute("Date") };
    set Date(value: string) { this.setAttribute("Date", value) };

    get EndDate(): string { return this.getAttribute("EndDate") };
    set EndDate(value: string) { this.setAttribute("EndDate", value) };

    get Notes(): string { return this.getAttribute("Notes") };
    set Notes(value: string) { this.setAttribute("Notes", value) };
}

const InstantEntityPrototypes = {
    Instant: Instant_Instant.prototype, 
    Session: Instant_Session.prototype, 
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
                Session: {},
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
                    hidden:       true,
                    required:     false,
                    domainName:   "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       false,
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

        Session: {
            name:       "Session",
            erToken:    "905181347",
            create:     false,
            cardMax:    1,
            hasInit:    false,
            creatable:  false,
            includable: true,
            deletable:  false,
            excludable: true,
            updatable:  false,
            parentDelete: false,
            childEntities: {
            },
            attributes: {
                Id: {
                    name:         "Id",
                    hidden:       false,
                    required:     true,
                    domainName:   "GeneratedKey",
                    persistent:   true,
                    key:          true,
                    update:       true,
                    foreignKey:   false,
                },
                Date: {
                    name:         "Date",
                    hidden:       false,
                    required:     true,
                    domainName:   "DateTime",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                EndDate: {
                    name:         "EndDate",
                    hidden:       false,
                    required:     false,
                    domainName:   "DateTime",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Notes: {
                    name:         "Notes",
                    hidden:       false,
                    required:     false,
                    domainName:   "Text",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                fk_id_configuration: {
                    name:         "fk_id_configuration",
                    hidden:       true,
                    required:     true,
                    domainName:   "GeneratedKey",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   true,
                },
            }
        },

    }
}
