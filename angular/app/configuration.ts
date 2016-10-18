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

    getPrototype(entityName: string): any {
        return entityPrototypes[entityName];
    }

    public getEntityAttributes(entityName: string): any {
        return entityAttributes[ entityName ];
    };
}

export class Configuration_Configuration extends zeidon.EntityInstance {
    protected get entityName(): string { return "Configuration" };
    protected get childEntities() {
        return {
            ThermometerConfig: { cardMax: undefined }
        };
    }

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get Description(): string { return this.getAttribute("Description") };
    set Description(value: string) { this.setAttribute("Description", value) };

    get TargetTemperature(): string { return this.getAttribute("TargetTemperature") };
    set TargetTemperature(value: string) { this.setAttribute("TargetTemperature", value) };

    get ThermometerCount(): string { return this.getAttribute("ThermometerCount") };
    set ThermometerCount(value: string) { this.setAttribute("ThermometerCount", value) };

    get ThermometerConfig(): zeidon.EntityArray<Configuration_ThermometerConfig> {
        let entities = this.getChildEntities("ThermometerConfig")
        return entities as zeidon.EntityArray<Configuration_ThermometerConfig>;
    }
}

export class Configuration_ThermometerConfig extends zeidon.EntityInstance {
    protected get entityName(): string { return "ThermometerConfig" };
    protected get childEntities() {
        return {};
    }

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get Name(): string { return this.getAttribute("Name") };
    set Name(value: string) { this.setAttribute("Name", value) };

    get AlarmOn(): boolean { return this.getAttribute("AlarmOn") };
    set AlarmOn(value: boolean) { this.setAttribute("AlarmOn", value) };

    get fk_id_configuration(): string { return this.getAttribute("fk_id_configuration") };
    set fk_id_configuration(value: string) { this.setAttribute("fk_id_configuration", value) };
}

const entityPrototypes = {
    "Configuration": Configuration_Configuration.prototype,
    "ThermometerConfig": Configuration_ThermometerConfig.prototype
}

const entityAttributes = {
    Configuration: {
        Id: {},
        Description: {},
        TargetTemperature: {},
        ThermometerCount: {}
    },
    ThermometerConfig: {
        Id: {},
        Name: {},
        AlarmOn: {},
        fk_id_configuration: {}
    }
}
