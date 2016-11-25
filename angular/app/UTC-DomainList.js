"use strict";
// Should some day be generated from the zeidon.xdm.
exports.UTC_DomainList = {
    "Boolean": {
        name: "Boolean",
        class: "com.quinsoft.zeidon.domains.BooleanDomain"
    },
    "Date": {
        name: "Date",
        class: "com.quinsoft.zeidon.domains.DateDomain"
    },
    "DateTime": {
        name: "DateTime",
        class: "com.quinsoft.zeidon.domains.DateTimeDomain"
    },
    "GeneratedKey": {
        name: "GeneratedKey",
        class: "com.quinsoft.zeidon.domains.GeneratedKeyDomain",
        maxLength: 64
    },
    "Integer": {
        name: "Integer",
        class: "com.quinsoft.zeidon.domains.IntegerDomain",
    },
    "Double": {
        name: "Integer",
        class: "com.quinsoft.zeidon.domains.DoubleDomain",
    },
    "Temperature": {
        name: "Temperature",
        class: "com.quinsoft.zeidon.domains.IntegerDomain",
    },
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
    },
    "Text": {
        name: "Text",
        class: "com.quinsoft.zeidon.domains.StringDomain",
        maxLength: 10000,
    },
};
//# sourceMappingURL=UTC-DomainList.js.map