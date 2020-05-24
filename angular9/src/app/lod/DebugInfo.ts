
/*
  Generated from LOD DebugInfo

*/

import * as zeidon from '../zeidon';
import { UTC_DomainList } from './UTC-DomainList';
import { UTC_DomainFunctions } from './UTC-DomainFunctions';



// DebugInfo LOD.
export class DebugInfo extends zeidon.ObjectInstance {

    constructor( initialize = undefined, options: zeidon.CreateOptions = undefined ) {
        super( DebugInfo_LodDef, initialize, options );
    }

    get DebugInfo(): zeidon.EntityArray<DebugInfo_DebugInfo> {
        return this.roots as zeidon.EntityArray<DebugInfo_DebugInfo>;
    }

    get DebugInfo$(): DebugInfo_DebugInfo {
        return this.roots.selected() as DebugInfo_DebugInfo;
    }

    // Following allow accessing of child entity instances directly from the OI,
    // similar to Zeidon Views.


    get File(): zeidon.EntityArray<DebugInfo_File> {
        return this.DebugInfo$?.File;
    }

    get File$(): DebugInfo_File {
        return this.DebugInfo$?.File$;
    }

    public static activate( qual?: any ): Promise<DebugInfo> {
        return zeidon.ObjectInstance.activateOi( new DebugInfo(), qual );
    }
}


export class DebugInfo_DebugInfo extends zeidon.EntityInstance {
    public get entityName(): string { return "DebugInfo" };

    get File(): zeidon.EntityArray<DebugInfo_File> {
        return this.getChildEntityArray("File") as zeidon.EntityArray<DebugInfo_File>;
    }


    get File$(): DebugInfo_File {
        return this.getChildEntityArray("File").selected() as DebugInfo_File;
    }
}

export class DebugInfo_File extends zeidon.EntityInstance {
    public get entityName(): string { return "File" };

    get Name(): string { return this.getAttribute("Name") };
    set Name(value: string) { this.setAttribute("Name", value) };

    get Size(): string { return this.getAttribute("Size") };
    set Size(value: string) { this.setAttribute("Size", value) };
}

const DebugInfoEntityPrototypes = {
    DebugInfo: DebugInfo_DebugInfo.prototype, 
    File: DebugInfo_File.prototype, 
}

export const DebugInfo_LodDefStructure = {
    name: "DebugInfo",
    root: "DebugInfo",
    applicationName: "UTC",
    entities: {
        DebugInfo: {
            name:        "DebugInfo",
            erToken:     "316000031",
            create:      true,
            cardMax:     0,
            hasInit:     false,
            creatable:   true,
            includable:  false,
            deletable:   true,
            excludable:  false,
            updatable:   true,
            derived:     true,
            parentDelete: true,
            childEntities: {
                File: {},
            },
            attributes: {
            }
        },

        File: {
            name:        "File",
            erToken:     "316000032",
            isErRelLink: false,
            relToken:    "316000032",
            create:      true,
            cardMax:     999999,
            hasInit:     false,
            creatable:   true,
            includable:  false,
            deletable:   true,
            excludable:  false,
            updatable:   true,
            derived:     true,
            parentDelete: true,
            childEntities: {
            },
            attributes: {
                Name: {
                    name:         "Name",
                    hidden:       false,
                    required:     false,
                    domainName:   "Text",
                    persistent:   false,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
                Size: {
                    name:         "Size",
                    hidden:       false,
                    required:     false,
                    domainName:   "Text",
                    persistent:   false,
                    key:          false,
                    update:       true,
                    foreignKey:   false,
                },
            }
        },

    }
}

export const DebugInfo_LodDef = new zeidon.LodDef( DebugInfo_LodDefStructure, DebugInfoEntityPrototypes, UTC_DomainList, UTC_DomainFunctions );
        
