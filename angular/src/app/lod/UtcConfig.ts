
/*
  Generated from LOD UtcConfig

*/

import * as zeidon from '../zeidon';
import { UTC_DomainList } from './UTC-DomainList';
import { UTC_DomainFunctions } from './UTC-DomainFunctions';



// UtcConfig LOD.
export class UtcConfig extends zeidon.ObjectInstance {

    constructor( initialize = undefined, options: zeidon.CreateOptions = undefined ) {
        super( UtcConfig_LodDef, initialize, options );
    }

    get UtcConfig(): zeidon.EntityArray<UtcConfig_UtcConfig> {
        return this.roots as zeidon.EntityArray<UtcConfig_UtcConfig>;
    }

    get UtcConfig$(): UtcConfig_UtcConfig {
        return this.roots.selected() as UtcConfig_UtcConfig;
    }

    // Following allow accessing of child entity instances directly from the OI,
    // similar to Zeidon Views.


    get DefaultThermometerType(): zeidon.EntityArray<UtcConfig_DefaultThermometerType> {
        return this.UtcConfig$?.DefaultThermometerType;
    }

    get DefaultThermometerType$(): UtcConfig_DefaultThermometerType {
        return this.UtcConfig$?.DefaultThermometerType$;
    }

    public static activate( qual?: any ): Promise<UtcConfig> {
        return zeidon.ObjectInstance.activateOi( new UtcConfig(), qual );
    }
}


export class UtcConfig_UtcConfig extends zeidon.EntityInstance {
    public get entityName(): string { return "UtcConfig" };

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get TemperatureUnit(): string { return this.getAttribute("TemperatureUnit") };
    set TemperatureUnit(value: string) { this.setAttribute("TemperatureUnit", value) };

    get DefaultThermometerType(): zeidon.EntityArray<UtcConfig_DefaultThermometerType> {
        return this.getChildEntityArray("DefaultThermometerType") as zeidon.EntityArray<UtcConfig_DefaultThermometerType>;
    }


    get DefaultThermometerType$(): UtcConfig_DefaultThermometerType {
        return this.getChildEntityArray("DefaultThermometerType").selected() as UtcConfig_DefaultThermometerType;
    }
}

export class UtcConfig_DefaultThermometerType extends zeidon.EntityInstance {
    public get entityName(): string { return "DefaultThermometerType" };

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get Name(): string { return this.getAttribute("Name") };
    set Name(value: string) { this.setAttribute("Name", value) };

    get Description(): string { return this.getAttribute("Description") };
    set Description(value: string) { this.setAttribute("Description", value) };

    get ProbeAlgorithm(): string { return this.getAttribute("ProbeAlgorithm") };
    set ProbeAlgorithm(value: string) { this.setAttribute("ProbeAlgorithm", value) };
}

const UtcConfigEntityPrototypes = {
    UtcConfig: UtcConfig_UtcConfig.prototype, 
    DefaultThermometerType: UtcConfig_DefaultThermometerType.prototype, 
}

export const UtcConfig_LodDefStructure = {
    name: "UtcConfig",
    root: "UtcConfig",
    applicationName: "UTC",
    entities: {
        UtcConfig: {
            name:        "UtcConfig",
            erToken:     "905181404",
            create:      true,
            cardMax:     0,
            hasInit:     false,
            creatable:   true,
            includable:  false,
            deletable:   true,
            excludable:  false,
            updatable:   true,
            derived:     false,
            parentDelete: true,
            childEntities: {
                DefaultThermometerType: {},
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

        DefaultThermometerType: {
            name:        "DefaultThermometerType",
            erToken:     "905181408",
            isErRelLink: false,
            relToken:    "905181443",
            create:      false,
            cardMax:     1,
            hasInit:     false,
            creatable:   false,
            includable:  true,
            deletable:   false,
            excludable:  true,
            updatable:   false,
            derived:     false,
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

export const UtcConfig_LodDef = new zeidon.LodDef( UtcConfig_LodDefStructure, UtcConfigEntityPrototypes, UTC_DomainList, UTC_DomainFunctions );
        
