import { Domain } from "../zeidon"

// Should some day be generated from the zeidon.xdm.

export const UTC_DomainList = {
    "Boolean": {
        name: "Boolean",
        class: "com.quinsoft.zeidon.domains.BooleanDomain"
    } as Domain,
    "Date": {
        name: "Date",
        class: "com.quinsoft.zeidon.domains.DateDomain"
    } as Domain,
    "DateTime": {
        name: "DateTime",
        class: "com.quinsoft.zeidon.domains.DateTimeDomain"
    } as Domain,
    "GeneratedKey": {
        name: "GeneratedKey",
        class: "com.quinsoft.zeidon.domains.GeneratedKeyDomain",
        maxLength: 64
    } as Domain,
    "Integer": {
        name: "Integer",
        class: "com.quinsoft.zeidon.domains.IntegerDomain",
    } as Domain,
    "Double": {
        name: "Integer",
        class: "com.quinsoft.zeidon.domains.DoubleDomain",
    } as Domain,
    "Temperature": {
        name: "Temperature",
        class: "com.quinsoft.zeidon.domains.DoubleDomain",
    } as Domain,
    "TemperatureUnit": {
        name: "TemperatureUnit",
        class: "com.quinsoft.zeidon.domains.StaticTableDomain",
        domainType: "T",
        defaultContext: "Unit",
        contexts: {
            "Unit": {
                name: "Unit",
                entries: {
                    "F": "Fahrenheit",
                    "C": "Celsius",
                    "K": "Kelvin",
                }
            }
        }
    } as Domain,
    "ProbeAlgorithm": {
        name: "ProbeAlgorithm",
        class: "com.quinsoft.zeidon.domains.StaticTableDomain",
        domainType: "T",
        defaultContext: "ProbeAlgorithm",
        contexts: {
            "ProbeAlgorithm": {
                name: "ProbeAlgorithm",
                entries: {
                    "SteinhartHart": "SteinhartHart",
                }
            }
        }
    } as Domain,
    "Text": {
        name: "Text",
        class: "com.quinsoft.zeidon.domains.StringDomain",
        maxLength: 10000,
    } as Domain,
}
