
/*
  Generated from LOD ThermometerType

*/

import * as zeidon from '../zeidon';
import { UTC_DomainList } from './UTC-DomainList';
import { UTC_DomainFunctions } from './UTC-DomainFunctions';



// ThermometerType LOD.
export class ThermometerType extends zeidon.ObjectInstance {

    constructor( initialize = undefined, options: zeidon.CreateOptions = undefined ) {
        super( ThermometerType_LodDef, initialize, options );
    }

    get ThermometerType(): zeidon.EntityArray<ThermometerType_ThermometerType> {
        return this.roots as zeidon.EntityArray<ThermometerType_ThermometerType>;
    }

    get ThermometerType$(): ThermometerType_ThermometerType {
        return this.roots.selected() as ThermometerType_ThermometerType;
    }

    // Following allow accessing of child entity instances directly from the OI,
    // similar to Zeidon Views.


    get SteinhartHartConfig(): zeidon.EntityArray<ThermometerType_SteinhartHartConfig> {
        return this.ThermometerType$?.SteinhartHartConfig;
    }

    get SteinhartHartConfig$(): ThermometerType_SteinhartHartConfig {
        return this.ThermometerType$?.SteinhartHartConfig$;
    }

    public static activate( qual?: any ): Promise<ThermometerType> {
        return zeidon.ObjectInstance.activateOi( new ThermometerType(), qual );
    }
}


export class ThermometerType_ThermometerType extends zeidon.EntityInstance {
    public get entityName(): string { return "ThermometerType" };

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get Name(): string { return this.getAttribute("Name") };
    set Name(value: string) { this.setAttribute("Name", value) };

    get Description(): string { return this.getAttribute("Description") };
    set Description(value: string) { this.setAttribute("Description", value) };

    get ProbeAlgorithm(): string { return this.getAttribute("ProbeAlgorithm") };
    set ProbeAlgorithm(value: string) { this.setAttribute("ProbeAlgorithm", value) };

    get SteinhartHartConfig(): zeidon.EntityArray<ThermometerType_SteinhartHartConfig> {
        return this.getChildEntityArray("SteinhartHartConfig") as zeidon.EntityArray<ThermometerType_SteinhartHartConfig>;
    }


    get SteinhartHartConfig$(): ThermometerType_SteinhartHartConfig {
        return this.getChildEntityArray("SteinhartHartConfig").selected() as ThermometerType_SteinhartHartConfig;
    }
}

export class ThermometerType_SteinhartHartConfig extends zeidon.EntityInstance {
    public get entityName(): string { return "SteinhartHartConfig" };

    get Id(): string { return this.getAttribute("Id") };
    set Id(value: string) { this.setAttribute("Id", value) };

    get A(): number { return this.getAttribute("A") };
    set A(value: number) { this.setAttribute("A", value) };

    get B(): number { return this.getAttribute("B") };
    set B(value: number) { this.setAttribute("B", value) };

    get C(): number { return this.getAttribute("C") };
    set C(value: number) { this.setAttribute("C", value) };

    get R(): number { return this.getAttribute("R") };
    set R(value: number) { this.setAttribute("R", value) };

    get VoltageReference(): number { return this.getAttribute("VoltageReference") };
    set VoltageReference(value: number) { this.setAttribute("VoltageReference", value) };
}

const ThermometerTypeEntityPrototypes = {
    ThermometerType: ThermometerType_ThermometerType.prototype, 
    SteinhartHartConfig: ThermometerType_SteinhartHartConfig.prototype, 
}

export const ThermometerType_LodDefStructure = {
    name: "ThermometerType",
    root: "ThermometerType",
    applicationName: "UTC",
    entities: {
        ThermometerType: {
            name:        "ThermometerType",
            erToken:     "905181408",
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
                SteinhartHartConfig: {},
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

        SteinhartHartConfig: {
            name:        "SteinhartHartConfig",
            erToken:     "905181414",
            isErRelLink: true,
            relToken:    "905181421",
            create:      true,
            cardMax:     1,
            hasInit:     false,
            creatable:   true,
            includable:  false,
            deletable:   true,
            excludable:  false,
            updatable:   true,
            derived:     false,
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
                A: {
                    name:         "A",
                    hidden:       false,
                    required:     true,
                    domainName:   "Double",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                B: {
                    name:         "B",
                    hidden:       false,
                    required:     true,
                    domainName:   "Double",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                C: {
                    name:         "C",
                    hidden:       false,
                    required:     true,
                    domainName:   "Double",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                R: {
                    name:         "R",
                    hidden:       false,
                    required:     true,
                    domainName:   "Double",
                    persistent:   true,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                VoltageReference: {
                    name:         "VoltageReference",
                    hidden:       false,
                    required:     true,
                    domainName:   "Double",
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

    }
}

export const ThermometerType_LodDef = new zeidon.LodDef( ThermometerType_LodDefStructure, ThermometerTypeEntityPrototypes, UTC_DomainList, UTC_DomainFunctions );
        
