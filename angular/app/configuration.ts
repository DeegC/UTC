import * as zeidon from './zeidon';

// Configuration LOD.
export class Configuration extends zeidon.ObjectInstance {
    protected rootEntityName(): string { return "Configuration" };

    get Configuration(): zeidon.EntityArray<Configuration_Configuration> {
        return this.roots as zeidon.EntityArray<Configuration_Configuration>;
    }

    get Configuration$(): Configuration_Configuration {
        return this.roots.selected() as Configuration_Configuration;
    }

    public getApplicationName(): String { return "UTC" };

    getPrototype(entityName: string): any {
        return ConfigurationEntityPrototypes[entityName];
    }

    public getLodDef() {
        return Configuration_LodDef;
    };
}

export class Configuration_Configuration extends zeidon.EntityInstance {
    public get entityName(): string { return "Configuration" };

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get Description(): string { return this.getAttribute("Description") };
    set Description(value: string) { this.setAttribute("Description", value) };

    get TargetTemperature(): string { return this.getAttribute("TargetTemperature") };
    set TargetTemperature(value: string) { this.setAttribute("TargetTemperature", value) };

    get ThermometerCount(): string { return this.getAttribute("ThermometerCount") };
    set ThermometerCount(value: string) { this.setAttribute("ThermometerCount", value) };

    get ThermometerConfig(): zeidon.EntityArray<Configuration_ThermometerConfig> {
        let entities = this.getChildEntityArray("ThermometerConfig")
        return entities as zeidon.EntityArray<Configuration_ThermometerConfig>;
    }
}

export class Configuration_ThermometerConfig extends zeidon.EntityInstance {
    public get entityName(): string { return "ThermometerConfig" };

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get Name(): string { return this.getAttribute("Name") };
    set Name(value: string) { this.setAttribute("Name", value) };

    get AlarmOn(): boolean { return this.getAttribute("AlarmOn") };
    set AlarmOn(value: boolean) { this.setAttribute("AlarmOn", value) };
}

const ConfigurationEntityPrototypes = {
    Configuration: Configuration_Configuration.prototype,
    ThermometerConfig: Configuration_ThermometerConfig.prototype
}

export const Configuration_LodDef = {
    name: "Configuration",
    entities: {
        Configuration: {
            name: "Configuration",
            create: true,
            cardMax: undefined,
            childEntities: { ThermometerConfig: {} },
            attributes: {
                Id: {},
                Description: {},
                TargetTemperature: {},
                TemperatureUnit: {},
                RecordTemperatures: {},
                PidP: {},
                PidI: {},
                PidD: {},
                MaxPWM: {},
                TweetOn: {},
                TweetPeriodInMinutes: {},
                PwmFrequency: {},
                ThermometerCount: {}
            }
        },
        ThermometerConfig: {
            name: "ThermometerConfig",
            create: true,
            cardMax: Number.MAX_SAFE_INTEGER,
            childEntities: {},
            attributes: {
                Id: {},
                Name: {},
                AlarmOn: {},
                fk_id_configuration: {}
            }
        }
    } // entities
}
