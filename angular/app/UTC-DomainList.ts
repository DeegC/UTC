import { Domain } from "./zeidon"

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
        class: "com.quinsoft.zeidon.domains.IntegerDomain",
    } as Domain,
    "TemperatureUnit": {
        name: "TemperatureUnit",
        class: "com.quinsoft.zeidon.domains.StaticTableDomain",
        contexts: {
            "Unit": {
                name: "Unit",
                entries: [
                    {
                        internalValue: "F",
                        externalValue: "Fahrenehit"
                    },
                    {
                        internalValue: "C",
                        externalValue: "Celsius"
                    },
                    {
                        internalValue: "K",
                        externalValue: "Kelvin"
                    },
                ]
            }
        }
    } as Domain,
    "Text": {
        name: "Text",
        class: "com.quinsoft.zeidon.domains.StringDomain",
        maxLength: 10000,
    } as Domain,
}
