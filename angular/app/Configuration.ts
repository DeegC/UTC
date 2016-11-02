
/*
  Generated from LOD Configuration on 2016-11-02T18:21:46.922

*/
import * as zeidon from './zeidon';


// Configuration LOD.
export class Configuration extends zeidon.ObjectInstance {
    protected rootEntityName(): string { return "Configuration" };

    public getApplicationName(): String { return "UTC" };

    getPrototype(entityName: string): any {
        return ConfigurationEntityPrototypes[entityName];
    }

    public getLodDef() {
        return Configuration_LodDef;
    };

    get Configuration(): zeidon.EntityArray<Configuration_Configuration> {
        return this.roots as zeidon.EntityArray<Configuration_Configuration>;
    }

    get Configuration$(): Configuration_Configuration {
        return this.roots.selected() as Configuration_Configuration;
    }

    public static activate( options?: zeidon.ActivateOptions ): Promise<Configuration> {
        return zeidon.ObjectInstance.activateOi( new Configuration(), options );
    }
}


export class Configuration_Configuration extends zeidon.EntityInstance {
    public get entityName(): string { return "Configuration" };

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get Description(): string { return this.getAttribute("Description") };
    set Description(value: string) { this.setAttribute("Description", value) };

    get Notes(): string { return this.getAttribute("Notes") };
    set Notes(value: string) { this.setAttribute("Notes", value) };

    get TargetTemperature(): string { return this.getAttribute("TargetTemperature") };
    set TargetTemperature(value: string) { this.setAttribute("TargetTemperature", value) };

    get ThermometerCount(): string { return this.getAttribute("ThermometerCount") };
    set ThermometerCount(value: string) { this.setAttribute("ThermometerCount", value) };

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

    get ThermometerConfig(): zeidon.EntityArray<this> {
        return this.getChildEntityArray("ThermometerConfig");
    }
}

export class Configuration_ThermometerConfig extends zeidon.EntityInstance {
    public get entityName(): string { return "ThermometerConfig" };

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get Name(): string { return this.getAttribute("Name") };
    set Name(value: string) { this.setAttribute("Name", value) };

    get AlarmLow(): string { return this.getAttribute("AlarmLow") };
    set AlarmLow(value: string) { this.setAttribute("AlarmLow", value) };

    get AlarmHigh(): string { return this.getAttribute("AlarmHigh") };
    set AlarmHigh(value: string) { this.setAttribute("AlarmHigh", value) };

    get AlarmOn(): string { return this.getAttribute("AlarmOn") };
    set AlarmOn(value: string) { this.setAttribute("AlarmOn", value) };

    get wTemperatureWithinAlarmThreshold(): string { return this.getAttribute("wTemperatureWithinAlarmThreshold") };
    set wTemperatureWithinAlarmThreshold(value: string) { this.setAttribute("wTemperatureWithinAlarmThreshold", value) };
}

const ConfigurationEntityPrototypes = {
    Configuration: Configuration_Configuration.prototype, 
    ThermometerConfig: Configuration_ThermometerConfig.prototype, 
}

export const Configuration_LodDef = {
    name: "Configuration",
    entities: {
        Configuration: {
            name:       "Configuration",
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
                ThermometerConfig: {},
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
                    initialValue: "null",
                },
                Description: {
                    hidden:       false,
                    required:     true,
                    domain:       "Text",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                Notes: {
                    hidden:       false,
                    required:     false,
                    domain:       "Text",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                TargetTemperature: {
                    hidden:       false,
                    required:     true,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                ThermometerCount: {
                    hidden:       false,
                    required:     true,
                    domain:       "ThermometerCount",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                TemperatureUnit: {
                    hidden:       false,
                    required:     true,
                    domain:       "TemperatureUnit",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                RecordTemperatures: {
                    hidden:       false,
                    required:     false,
                    domain:       "Boolean",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                PidP: {
                    hidden:       false,
                    required:     true,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                PidI: {
                    hidden:       false,
                    required:     true,
                    domain:       "Double",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                PidD: {
                    hidden:       false,
                    required:     true,
                    domain:       "Double",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                MaxPWM: {
                    hidden:       false,
                    required:     false,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                TweetOn: {
                    hidden:       false,
                    required:     false,
                    domain:       "Boolean",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                TweetPeriodInMinutes: {
                    hidden:       false,
                    required:     false,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                PwmFrequency: {
                    hidden:       false,
                    required:     false,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                autoseq: {
                    hidden:       true,
                    required:     false,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       false,
                    foreignKey:   false,
                    initialValue: "null",
                },
            }
        },

        ThermometerConfig: {
            name:       "ThermometerConfig",
            create:     true,
            cardMax:    10,
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
                Id: {
                    hidden:       false,
                    required:     true,
                    domain:       "GeneratedKey",
                    persistent:   true,
                    key:          true,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                Name: {
                    hidden:       false,
                    required:     true,
                    domain:       "Text",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                AlarmLow: {
                    hidden:       false,
                    required:     false,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                AlarmHigh: {
                    hidden:       false,
                    required:     false,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                AlarmOn: {
                    hidden:       false,
                    required:     false,
                    domain:       "Boolean",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                wTemperatureWithinAlarmThreshold: {
                    hidden:       false,
                    required:     false,
                    domain:       "Boolean",
                    persistent:   false,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "null",
                },
                autoseq: {
                    hidden:       true,
                    required:     false,
                    domain:       "Integer",
                    persistent:   true,
                    key:          false,
                    update:       false,
                    foreignKey:   false,
                    initialValue: "null",
                },
                fk_id_configuration: {
                    hidden:       true,
                    required:     true,
                    domain:       "GeneratedKey",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   true,
                    initialValue: "null",
                },
            }
        },

    }
}
