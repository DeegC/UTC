
// Generated from utc/bin/zeidon.xdm
import { Domain } from '../zeidon';

export const UTC_DomainList = {


    "Blob" : {
        name:  "Blob",
        class: "com.quinsoft.zeidon.domains.Base64BlobDomain", 
    } as Domain,


    "Boolean" : {
        name:  "Boolean",
        class: "com.quinsoft.zeidon.domains.BooleanDomain", 
    } as Domain,


    "Date" : {
        name:  "Date",
        class: "com.quinsoft.zeidon.domains.DateDomain", 
    } as Domain,


    "DateTime" : {
        name:  "DateTime",
        class: "com.quinsoft.zeidon.domains.DateTimeDomain", 
    } as Domain,


    "Double" : {
        name:  "Double",
        class: "com.quinsoft.zeidon.domains.DoubleDomain", 
    } as Domain,


    "GeneratedKey" : {
        name:  "GeneratedKey",
        class: "com.quinsoft.zeidon.domains.GeneratedKeyDomain", 
    } as Domain,


    "Integer" : {
        name:  "Integer",
        class: "com.quinsoft.zeidon.domains.IntegerDomain", 
    } as Domain,


    "ProbeAlgorithm" : {
        name:  "ProbeAlgorithm",
        class: "com.quinsoft.zeidon.domains.StaticTableDomain", 
        domainType:  "T",
        contexts: {
            "ProbeAlgorithm": {
                name: "ProbeAlgorithm",
                entries: {
                    "SteinhartHart": "SteinhartHart",
                }
            },
        },
        defaultContext: "ProbeAlgorithm" 
    } as Domain,


    "Temperature" : {
        name:  "Temperature",
        class: "com.quinsoft.zeidon.domains.DoubleDomain", 
    } as Domain,


    "TemperatureUnit" : {
        name:  "TemperatureUnit",
        class: "com.quinsoft.zeidon.domains.StaticTableDomain", 
        domainType:  "T",
        contexts: {
            "Abbrev": {
                name: "Abbrev",
                entries: {
                    "F": "F",
                    "C": "C",
                    "K": "K",
                }
            },
            "Unit": {
                name: "Unit",
                entries: {
                    "F": "Fahrenheit",
                    "C": "Celsius",
                    "K": "Kelvin",
                }
            },
        },
        defaultContext: "Unit" 
    } as Domain,


    "Text" : {
        name:  "Text",
        class: "com.quinsoft.zeidon.domains.StringDomain", 
    } as Domain,


    "ThermometerCount" : {
        name:  "ThermometerCount",
        class: "com.quinsoft.zeidon.domains.IntegerDomain", 
    } as Domain,


    "Y/N" : {
        name:  "Y/N",
        class: "com.quinsoft.zeidon.domains.StaticTableDomain", 
        domainType:  "T",
        contexts: {
            "Default": {
                name: "Default",
                entries: {
                    "": "",
                    "Y": "Default",
                    "N": "",
                }
            },
            "Y/N": {
                name: "Y/N",
                entries: {
                    "": "",
                    "Y": "Y",
                    "N": "N",
                }
            },
        },
        defaultContext: "Y/N" 
    } as Domain,

}
