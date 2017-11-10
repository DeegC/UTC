
/*
  Generated from LOD Session

*/

import * as zeidon from '../zeidon';
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

    public getDomainFunctions( domain: zeidon.Domain ): zeidon.DomainFunctions {
        let f = UTC_DomainFunctions[ domain.class ];
        if ( f )
            return new f( domain );

        return undefined;
    }

    get Session(): zeidon.EntityArray<Session_Session> {
        return this.roots as zeidon.EntityArray<Session_Session>;
    }

    get Session$(): Session_Session {
        return this.roots.selected() as Session_Session;
    }

    // Returns the current entity instance if it exists, otherwise returns an instance
    // that will returned 'undefined' for any property values.  This is the 
    // equivalent to the "elvis operator"
    get Session$$(): Session_Session {
        return (this.roots.selected() as Session_Session) || zeidon.SAFE_INSTANCE;
    }

    public static activate( qual?: any ): Observable<Session> {
        return zeidon.ObjectInstance.activateOi( new Session(), qual );
    }
}


export class Session_Session extends zeidon.EntityInstance {
    public get entityName(): string { return "Session" };

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get Date(): Date { return this.getAttribute("Date") };
    set Date(value: Date) { this.setAttribute("Date", value) };

    get EndDate(): Date { return this.getAttribute("EndDate") };
    set EndDate(value: Date) { this.setAttribute("EndDate", value) };

    get Notes(): string { return this.getAttribute("Notes") };
    set Notes(value: string) { this.setAttribute("Notes", value) };

    get Configuration(): zeidon.EntityArray<Session_Configuration> {
        return this.getChildEntityArray("Configuration") as zeidon.EntityArray<Session_Configuration>;
    }


    get Configuration$(): Session_Configuration {
        return this.getChildEntityArray("Configuration").selected() as Session_Configuration;
    }

    get Configuration$$(): Session_Configuration {
        return (this.getChildEntityArray("Configuration").selected() as Session_Configuration) || zeidon.SAFE_INSTANCE;
    }

    get Instant(): zeidon.EntityArray<Session_Instant> {
        return this.getChildEntityArray("Instant") as zeidon.EntityArray<Session_Instant>;
    }


    get Instant$(): Session_Instant {
        return this.getChildEntityArray("Instant").selected() as Session_Instant;
    }

    get Instant$$(): Session_Instant {
        return (this.getChildEntityArray("Instant").selected() as Session_Instant) || zeidon.SAFE_INSTANCE;
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

    get TargetTemperature(): number { return this.getAttribute("TargetTemperature") };
    set TargetTemperature(value: number) { this.setAttribute("TargetTemperature", value) };

    get TemperatureUnit(): string { return this.getAttribute("TemperatureUnit") };
    set TemperatureUnit(value: string) { this.setAttribute("TemperatureUnit", value) };

    get RecordTemperatures(): boolean { return this.getAttribute("RecordTemperatures") };
    set RecordTemperatures(value: boolean) { this.setAttribute("RecordTemperatures", value) };

    get PidP(): number { return this.getAttribute("PidP") };
    set PidP(value: number) { this.setAttribute("PidP", value) };

    get PidI(): number { return this.getAttribute("PidI") };
    set PidI(value: number) { this.setAttribute("PidI", value) };

    get PidD(): number { return this.getAttribute("PidD") };
    set PidD(value: number) { this.setAttribute("PidD", value) };

    get MaxPWM(): number { return this.getAttribute("MaxPWM") };
    set MaxPWM(value: number) { this.setAttribute("MaxPWM", value) };

    get TweetOn(): boolean { return this.getAttribute("TweetOn") };
    set TweetOn(value: boolean) { this.setAttribute("TweetOn", value) };

    get PwmFrequency(): number { return this.getAttribute("PwmFrequency") };
    set PwmFrequency(value: number) { this.setAttribute("PwmFrequency", value) };

    get ThermometerConfig(): zeidon.EntityArray<Session_ThermometerConfig> {
        return this.getChildEntityArray("ThermometerConfig") as zeidon.EntityArray<Session_ThermometerConfig>;
    }


    get ThermometerConfig$(): Session_ThermometerConfig {
        return this.getChildEntityArray("ThermometerConfig").selected() as Session_ThermometerConfig;
    }

    get ThermometerConfig$$(): Session_ThermometerConfig {
        return (this.getChildEntityArray("ThermometerConfig").selected() as Session_ThermometerConfig) || zeidon.SAFE_INSTANCE;
    }
}

export class Session_ThermometerConfig extends zeidon.EntityInstance {
    public get entityName(): string { return "ThermometerConfig" };

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get Name(): string { return this.getAttribute("Name") };
    set Name(value: string) { this.setAttribute("Name", value) };

    get AlarmLow(): number { return this.getAttribute("AlarmLow") };
    set AlarmLow(value: number) { this.setAttribute("AlarmLow", value) };

    get AlarmHigh(): number { return this.getAttribute("AlarmHigh") };
    set AlarmHigh(value: number) { this.setAttribute("AlarmHigh", value) };

    get AlarmOn(): boolean { return this.getAttribute("AlarmOn") };
    set AlarmOn(value: boolean) { this.setAttribute("AlarmOn", value) };

    get wTemperatureWithinAlarmThreshold(): boolean { return this.getAttribute("wTemperatureWithinAlarmThreshold") };
    set wTemperatureWithinAlarmThreshold(value: boolean) { this.setAttribute("wTemperatureWithinAlarmThreshold", value) };

    get wTemperatureError(): boolean { return this.getAttribute("wTemperatureError") };
    set wTemperatureError(value: boolean) { this.setAttribute("wTemperatureError", value) };
}

export class Session_Instant extends zeidon.EntityInstance {
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

const SessionEntityPrototypes = {
    Session: Session_Session.prototype, 
    Configuration: Session_Configuration.prototype, 
    ThermometerConfig: Session_ThermometerConfig.prototype, 
    Instant: Session_Instant.prototype, 
}

export const Session_LodDef = {
    name: "Session",
    entities: {
        Session: {
            name:        "Session",
            erToken:     "905181347",
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
            name:        "Configuration",
            erToken:     "905181331",
            isErRelLink: false,
            relToken:    "905181391",
            create:      false,
            cardMax:     1,
            hasInit:     true,
            creatable:   false,
            includable:  true,
            deletable:   false,
            excludable:  true,
            updatable:   false,
            parentDelete: false,
            childEntities: {
                ThermometerConfig: {},
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
                    initialValue: "false",
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

        ThermometerConfig: {
            name:        "ThermometerConfig",
            erToken:     "905181361",
            isErRelLink: true,
            relToken:    "905181388",
            create:      false,
            cardMax:     10,
            hasInit:     true,
            creatable:   false,
            includable:  false,
            deletable:   false,
            excludable:  false,
            updatable:   false,
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
                Name: {
                    name:         "Name",
                    hidden:       false,
                    required:     true,
                    domainName:   "Text",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                AlarmLow: {
                    name:         "AlarmLow",
                    hidden:       false,
                    required:     false,
                    domainName:   "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                AlarmHigh: {
                    name:         "AlarmHigh",
                    hidden:       false,
                    required:     false,
                    domainName:   "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                AlarmOn: {
                    name:         "AlarmOn",
                    hidden:       false,
                    required:     false,
                    domainName:   "Boolean",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                wTemperatureWithinAlarmThreshold: {
                    name:         "wTemperatureWithinAlarmThreshold",
                    hidden:       false,
                    required:     false,
                    domainName:   "Boolean",
                    persistent:   false,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "FALSE",
                },
                wTemperatureError: {
                    name:         "wTemperatureError",
                    hidden:       false,
                    required:     false,
                    domainName:   "Boolean",
                    persistent:   false,
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
                fk_id_thermometer_type: {
                    name:         "fk_id_thermometer_type",
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

        Instant: {
            name:        "Instant",
            erToken:     "905181315",
            isErRelLink: true,
            relToken:    "905181385",
            create:      true,
            cardMax:     999999,
            hasInit:     false,
            creatable:   true,
            includable:  true,
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
