
/*
  Generated from LOD Configuration

*/

import * as zeidon from '../zeidon';
import { UTC_DomainList } from './UTC-DomainList';
import { UTC_DomainFunctions } from './UTC-DomainFunctions';



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

    public getDomain( name: string ): zeidon.Domain {
        return UTC_DomainList[name];
    };

    public getDomainFunctions( domain: zeidon.Domain ): zeidon.DomainFunctions {
        let f = UTC_DomainFunctions[ domain.class ];
        if ( f )
            return new f( domain );

        return undefined;
    }

    get Configuration(): zeidon.EntityArray<Configuration_Configuration> {
        return this.roots as zeidon.EntityArray<Configuration_Configuration>;
    }

    get Configuration$(): Configuration_Configuration {
        return this.roots.selected() as Configuration_Configuration;
    }

    // Returns the current entity instance if it exists, otherwise returns an instance
    // that will returned 'undefined' for any property values.  This is the
    // equivalent to the "elvis operator"
    get Configuration$$(): Configuration_Configuration {
        return (this.roots.selected() as Configuration_Configuration) || zeidon.SAFE_INSTANCE;
    }

    public static activate( qual?: any ): Promise<Configuration> {
        return zeidon.ObjectInstance.activateOi( new Configuration(), qual );
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

    get TargetTemperature(): number { return this.getAttribute("TargetTemperature") };
    set TargetTemperature(value: number) { this.setAttribute("TargetTemperature", value) };

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

    get GenericSwitchName1(): string { return this.getAttribute("GenericSwitchName1") };
    set GenericSwitchName1(value: string) { this.setAttribute("GenericSwitchName1", value) };

    get GenericSwitch1(): boolean { return this.getAttribute("GenericSwitch1") };
    set GenericSwitch1(value: boolean) { this.setAttribute("GenericSwitch1", value) };

    get ThermometerConfig(): zeidon.EntityArray<Configuration_ThermometerConfig> {
        return this.getChildEntityArray("ThermometerConfig") as zeidon.EntityArray<Configuration_ThermometerConfig>;
    }


    get ThermometerConfig$(): Configuration_ThermometerConfig {
        return this.getChildEntityArray("ThermometerConfig").selected() as Configuration_ThermometerConfig;
    }

    get ThermometerConfig$$(): Configuration_ThermometerConfig {
        return (this.getChildEntityArray("ThermometerConfig").selected() as Configuration_ThermometerConfig) || zeidon.SAFE_INSTANCE;
    }

    get ThermometerType(): zeidon.EntityArray<Configuration_ThermometerType> {
        return this.getChildEntityArray("ThermometerType") as zeidon.EntityArray<Configuration_ThermometerType>;
    }


    get ThermometerType$(): Configuration_ThermometerType {
        return this.getChildEntityArray("ThermometerType").selected() as Configuration_ThermometerType;
    }

    get ThermometerType$$(): Configuration_ThermometerType {
        return (this.getChildEntityArray("ThermometerType").selected() as Configuration_ThermometerType) || zeidon.SAFE_INSTANCE;
    }
}

export class Configuration_ThermometerConfig extends zeidon.EntityInstance {
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
}

export class Configuration_ThermometerType extends zeidon.EntityInstance {
    public get entityName(): string { return "ThermometerType" };

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get Name(): string { return this.getAttribute("Name") };
    set Name(value: string) { this.setAttribute("Name", value) };

    get Description(): string { return this.getAttribute("Description") };
    set Description(value: string) { this.setAttribute("Description", value) };

    get ProbeAlgorithm(): string { return this.getAttribute("ProbeAlgorithm") };
    set ProbeAlgorithm(value: string) { this.setAttribute("ProbeAlgorithm", value) };
}

const ConfigurationEntityPrototypes = {
    Configuration: Configuration_Configuration.prototype, 
    ThermometerConfig: Configuration_ThermometerConfig.prototype, 
    ThermometerType: Configuration_ThermometerType.prototype, 
}

export const Configuration_LodDef = {
    name: "Configuration",
    entities: {
        Configuration: {
            name:        "Configuration",
            erToken:     "905181331",
            create:      true,
            cardMax:     0,
            hasInit:     true,
            creatable:   true,
            includable:  false,
            deletable:   true,
            excludable:  false,
            updatable:   true,
            parentDelete: true,
            childEntities: {
                ThermometerConfig: {},
                ThermometerType: {},
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
                    initialValue: "250",
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
                    initialValue: "false",
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
                    initialValue: "3",
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
                    initialValue: "0.005",
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
                    initialValue: "5.0",
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
                    initialValue: "100",
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
                    initialValue: "10000",
                },
                GenericSwitchName1: {
                    name:         "GenericSwitchName1",
                    hidden:       false,
                    required:     false,
                    domainName:   "Text",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "Generic switch",
                },
                GenericSwitch1: {
                    name:         "GenericSwitch1",
                    hidden:       false,
                    required:     false,
                    domainName:   "Boolean",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                    initialValue: "false",
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

        ThermometerConfig: {
            name:        "ThermometerConfig",
            erToken:     "905181361",
            isErRelLink: true,
            relToken:    "905181388",
            create:      true,
            cardMax:     10,
            hasInit:     true,
            creatable:   true,
            includable:  false,
            deletable:   true,
            excludable:  false,
            updatable:   true,
            parentDelete: true,
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
                    initialValue: "false",
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
            }
        },

        ThermometerType: {
            name:        "ThermometerType",
            erToken:     "905181408",
            isErRelLink: false,
            relToken:    "905181437",
            create:      false,
            cardMax:     1,
            hasInit:     false,
            creatable:   false,
            includable:  true,
            deletable:   false,
            excludable:  true,
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
                Description: {
                    name:         "Description",
                    hidden:       false,
                    required:     false,
                    domainName:   "Text",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                ProbeAlgorithm: {
                    name:         "ProbeAlgorithm",
                    hidden:       false,
                    required:     false,
                    domainName:   "ProbeAlgorithm",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
            }
        },

    }
}
