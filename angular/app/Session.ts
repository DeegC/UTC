
/*
  Generated from LOD Session on 2017-01-01T21:56:36.671

*/

import * as zeidon from './zeidon';
import { Observable } from 'rxjs';
import { UTC_DomainList } from './UTC-DomainList';
import { UTC_DomainFunctions } from './UTC-DomainFunctions';



// Session LOD.
export class Session extends zeidon.ObjectInstance {
    protected rootEntityName(): string { return "Session" };

    public getApplicationName(): String { return "UTC" };

    getPrototype(entityName: string): any {
        return SessionEntityPrototypes[entityName];
    }

    public getLodDef() {
        return Session_LodDef;
    };

    public getDomain( name: string ): zeidon.Domain { 
        return UTC_DomainList[name];
    };

    public getDomainFunctions( name: string ): any { 
        return UTC_DomainFunctions[name];
    }


    get Session(): zeidon.EntityArray<Session_Session> {
        return this.roots as zeidon.EntityArray<Session_Session>;
    }

    get Session$(): Session_Session {
        return this.roots.selected() as Session_Session;
    }

    public static activate( qual?: any ): Observable<Session> {
        return zeidon.ObjectInstance.activateOi( new Session(), qual );
    }
}


export class Session_Session extends zeidon.EntityInstance {
    public get entityName(): string { return "Session" };

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get Date(): string { return this.getAttribute("Date") };
    set Date(value: string) { this.setAttribute("Date", value) };

    get EndDate(): string { return this.getAttribute("EndDate") };
    set EndDate(value: string) { this.setAttribute("EndDate", value) };

    get Notes(): string { return this.getAttribute("Notes") };
    set Notes(value: string) { this.setAttribute("Notes", value) };

    get Configuration(): zeidon.EntityArray<Session_Configuration> {
        return this.getChildEntityArray("Configuration") as zeidon.EntityArray<Session_Configuration>;
    }

    get Configuration$(): Session_Configuration {
        return this.getChildEntityArray("Configuration").selected() as Session_Configuration;
    }

    get Instant(): zeidon.EntityArray<Session_Instant> {
        return this.getChildEntityArray("Instant") as zeidon.EntityArray<Session_Instant>;
    }

    get Instant$(): Session_Instant {
        return this.getChildEntityArray("Instant").selected() as Session_Instant;
    }
}

export class Session_Configuration extends zeidon.EntityInstance {
    public get entityName(): string { return "Configuration" };

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get Description(): string { return this.getAttribute("Description") };
    set Description(value: string) { this.setAttribute("Description", value) };

    get Notes(): string { return this.getAttribute("Notes") };
    set Notes(value: string) { this.setAttribute("Notes", value) };

    get TargetTemperature(): string { return this.getAttribute("TargetTemperature") };
    set TargetTemperature(value: string) { this.setAttribute("TargetTemperature", value) };

    get TemperatureUnit(): string { return this.getAttribute("TemperatureUnit") };
    set TemperatureUnit(value: string) { this.setAttribute("TemperatureUnit", value) };

    get RecordTemperatures(): string { return this.getAttribute("RecordTemperatures") };
    set RecordTemperatures(value: string) { this.setAttribute("RecordTemperatures", value) };

    get PidP(): string { return this.getAttribute("PidP") };
    set PidP(value: string) { this.setAttribute("PidP", value) };

    get PidI(): string { return this.getAttribute("PidI") };
    set PidI(value: string) { this.setAttribute("PidI", value) };

    get PidD(): string { return this.getAttribute("PidD") };
    set PidD(value: string) { this.setAttribute("PidD", value) };

    get MaxPWM(): string { return this.getAttribute("MaxPWM") };
    set MaxPWM(value: string) { this.setAttribute("MaxPWM", value) };

    get TweetOn(): string { return this.getAttribute("TweetOn") };
    set TweetOn(value: string) { this.setAttribute("TweetOn", value) };

    get TweetPeriodInMinutes(): string { return this.getAttribute("TweetPeriodInMinutes") };
    set TweetPeriodInMinutes(value: string) { this.setAttribute("TweetPeriodInMinutes", value) };

    get PwmFrequency(): string { return this.getAttribute("PwmFrequency") };
    set PwmFrequency(value: string) { this.setAttribute("PwmFrequency", value) };
}

export class Session_Instant extends zeidon.EntityInstance {
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

const SessionEntityPrototypes = {
    Session: Session_Session.prototype, 
    Configuration: Session_Configuration.prototype, 
    Instant: Session_Instant.prototype, 
}

export const Session_LodDef = {
    name: "Session",
    entities: {
        Session: {
            name:       "Session",
            erToken:    "905181347",
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
                Configuration: {},
                Instant: {},
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

        Configuration: {
            name:       "Configuration",
            erToken:    "905181331",
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
                Description: {
                    name:         "Description",
                    hidden:       false,
                    required:     true,
                    domainName:   "Text",
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
                TargetTemperature: {
                    name:         "TargetTemperature",
                    hidden:       false,
                    required:     true,
                    domainName:   "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                TemperatureUnit: {
                    name:         "TemperatureUnit",
                    hidden:       false,
                    required:     true,
                    domainName:   "TemperatureUnit",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                RecordTemperatures: {
                    name:         "RecordTemperatures",
                    hidden:       false,
                    required:     false,
                    domainName:   "Boolean",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                PidP: {
                    name:         "PidP",
                    hidden:       false,
                    required:     true,
                    domainName:   "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                PidI: {
                    name:         "PidI",
                    hidden:       false,
                    required:     true,
                    domainName:   "Double",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                PidD: {
                    name:         "PidD",
                    hidden:       false,
                    required:     true,
                    domainName:   "Double",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                MaxPWM: {
                    name:         "MaxPWM",
                    hidden:       false,
                    required:     false,
                    domainName:   "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                TweetOn: {
                    name:         "TweetOn",
                    hidden:       false,
                    required:     false,
                    domainName:   "Boolean",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                TweetPeriodInMinutes: {
                    name:         "TweetPeriodInMinutes",
                    hidden:       false,
                    required:     false,
                    domainName:   "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                PwmFrequency: {
                    name:         "PwmFrequency",
                    hidden:       false,
                    required:     false,
                    domainName:   "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                autoseq: {
                    name:         "autoseq",
                    hidden:       true,
                    required:     false,
                    domainName:   "Integer",
                    persistent:   true,
                    key:          false,
                    update:       false,
                    foreignKey:   false,
                },
            }
        },

        Instant: {
            name:       "Instant",
            erToken:    "905181315",
            create:     true,
            cardMax:    999999,
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
