
/*
  Generated from LOD Session on 2016-11-16T18:40:08.154

*/
import * as zeidon from './zeidon';
import { Observable } from 'rxjs';


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

    get Session(): zeidon.EntityArray<Session_Session> {
        return this.roots as zeidon.EntityArray<Session_Session>;
    }

    get Session$(): Session_Session {
        return this.roots.selected() as Session_Session;
    }

    public static activate( options?: zeidon.ActivateOptions ): Observable<Session> {
        return zeidon.ObjectInstance.activateOi( new Session(), options );
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

    get Configuration(): zeidon.EntityArray<this> {
        return this.getChildEntityArray("Configuration");
    }

    get Instant(): zeidon.EntityArray<this> {
        return this.getChildEntityArray("Instant");
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
                    hidden:       false,
                    required:     true,
                    domain:       "GeneratedKey",
                    persistent:   true,
                    key:          true,
                    update:       true,
                    foreignKey:   false,
                },
                Date: {
                    hidden:       false,
                    required:     true,
                    domain:       "DateTime",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                EndDate: {
                    hidden:       false,
                    required:     false,
                    domain:       "DateTime",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Notes: {
                    hidden:       false,
                    required:     false,
                    domain:       "Text",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                fk_id_configuration: {
                    hidden:       true,
                    required:     true,
                    domain:       "GeneratedKey",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   true,
                },
            }
        },

        Configuration: {
            name:       "Configuration",
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
                    hidden:       false,
                    required:     true,
                    domain:       "GeneratedKey",
                    persistent:   true,
                    key:          true,
                    update:       true,
                    foreignKey:   false,
                },
                Description: {
                    hidden:       false,
                    required:     true,
                    domain:       "Text",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Notes: {
                    hidden:       false,
                    required:     false,
                    domain:       "Text",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                TargetTemperature: {
                    hidden:       false,
                    required:     true,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                TemperatureUnit: {
                    hidden:       false,
                    required:     true,
                    domain:       "TemperatureUnit",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                RecordTemperatures: {
                    hidden:       false,
                    required:     false,
                    domain:       "Boolean",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                PidP: {
                    hidden:       false,
                    required:     true,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                PidI: {
                    hidden:       false,
                    required:     true,
                    domain:       "Double",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                PidD: {
                    hidden:       false,
                    required:     true,
                    domain:       "Double",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                MaxPWM: {
                    hidden:       false,
                    required:     false,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                TweetOn: {
                    hidden:       false,
                    required:     false,
                    domain:       "Boolean",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                TweetPeriodInMinutes: {
                    hidden:       false,
                    required:     false,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                PwmFrequency: {
                    hidden:       false,
                    required:     false,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                autoseq: {
                    hidden:       true,
                    required:     false,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       false,
                    foreignKey:   false,
                },
            }
        },

        Instant: {
            name:       "Instant",
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
                    hidden:       false,
                    required:     true,
                    domain:       "DateTime",
                    persistent:   true,
                    key:          true,
                    update:       true,
                    foreignKey:   false,
                },
                TargetTemperature: {
                    hidden:       false,
                    required:     true,
                    domain:       "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm0: {
                    hidden:       false,
                    required:     false,
                    domain:       "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm1: {
                    hidden:       false,
                    required:     false,
                    domain:       "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm2: {
                    hidden:       false,
                    required:     false,
                    domain:       "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm3: {
                    hidden:       false,
                    required:     false,
                    domain:       "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm4: {
                    hidden:       false,
                    required:     false,
                    domain:       "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm5: {
                    hidden:       false,
                    required:     false,
                    domain:       "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm6: {
                    hidden:       false,
                    required:     false,
                    domain:       "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Therm7: {
                    hidden:       false,
                    required:     false,
                    domain:       "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                PWM0: {
                    hidden:       false,
                    required:     false,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                CpuTemperature: {
                    hidden:       false,
                    required:     false,
                    domain:       "Temperature",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                fk_id_session: {
                    hidden:       true,
                    required:     true,
                    domain:       "GeneratedKey",
                    persistent:   true,
                    key:          true,
                    update:       true,
                    foreignKey:   true,
                },
            }
        },

    }
}
