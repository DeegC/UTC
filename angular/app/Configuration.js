/*
  Generated from LOD Configuration on 2017-03-08T14:11:57.044

*/
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var zeidon = require("./zeidon");
var UTC_DomainList_1 = require("./UTC-DomainList");
var UTC_DomainFunctions_1 = require("./UTC-DomainFunctions");
// Configuration LOD.
var Configuration = (function (_super) {
    __extends(Configuration, _super);
    function Configuration() {
        return _super.apply(this, arguments) || this;
    }
    Configuration.prototype.rootEntityName = function () { return "Configuration"; };
    ;
    Configuration.prototype.getApplicationName = function () { return "UTC"; };
    ;
    Configuration.prototype.getPrototype = function (entityName) {
        return ConfigurationEntityPrototypes[entityName];
    };
    Configuration.prototype.getLodDef = function () {
        return exports.Configuration_LodDef;
    };
    ;
    Configuration.prototype.getDomain = function (name) {
        return UTC_DomainList_1.UTC_DomainList[name];
    };
    ;
    Configuration.prototype.getDomainFunctions = function (name) {
        return UTC_DomainFunctions_1.UTC_DomainFunctions[name];
    };
    Object.defineProperty(Configuration.prototype, "Configuration", {
        get: function () {
            return this.roots;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration.prototype, "Configuration$", {
        get: function () {
            return this.roots.selected();
        },
        enumerable: true,
        configurable: true
    });
    Configuration.activate = function (qual) {
        return zeidon.ObjectInstance.activateOi(new Configuration(), qual);
    };
    return Configuration;
}(zeidon.ObjectInstance));
exports.Configuration = Configuration;
var Configuration_Configuration = (function (_super) {
    __extends(Configuration_Configuration, _super);
    function Configuration_Configuration() {
        return _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Configuration_Configuration.prototype, "entityName", {
        get: function () { return "Configuration"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Configuration_Configuration.prototype, "Id", {
        get: function () { return this.getAttribute("Id"); },
        set: function (value) { this.setAttribute("Id", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_Configuration.prototype, "Description", {
        get: function () { return this.getAttribute("Description"); },
        set: function (value) { this.setAttribute("Description", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_Configuration.prototype, "Notes", {
        get: function () { return this.getAttribute("Notes"); },
        set: function (value) { this.setAttribute("Notes", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_Configuration.prototype, "TargetTemperature", {
        get: function () { return this.getAttribute("TargetTemperature"); },
        set: function (value) { this.setAttribute("TargetTemperature", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_Configuration.prototype, "TemperatureUnit", {
        get: function () { return this.getAttribute("TemperatureUnit"); },
        set: function (value) { this.setAttribute("TemperatureUnit", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_Configuration.prototype, "RecordTemperatures", {
        get: function () { return this.getAttribute("RecordTemperatures"); },
        set: function (value) { this.setAttribute("RecordTemperatures", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_Configuration.prototype, "PidP", {
        get: function () { return this.getAttribute("PidP"); },
        set: function (value) { this.setAttribute("PidP", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_Configuration.prototype, "PidI", {
        get: function () { return this.getAttribute("PidI"); },
        set: function (value) { this.setAttribute("PidI", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_Configuration.prototype, "PidD", {
        get: function () { return this.getAttribute("PidD"); },
        set: function (value) { this.setAttribute("PidD", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_Configuration.prototype, "MaxPWM", {
        get: function () { return this.getAttribute("MaxPWM"); },
        set: function (value) { this.setAttribute("MaxPWM", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_Configuration.prototype, "TweetOn", {
        get: function () { return this.getAttribute("TweetOn"); },
        set: function (value) { this.setAttribute("TweetOn", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_Configuration.prototype, "TweetPeriodInMinutes", {
        get: function () { return this.getAttribute("TweetPeriodInMinutes"); },
        set: function (value) { this.setAttribute("TweetPeriodInMinutes", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_Configuration.prototype, "PwmFrequency", {
        get: function () { return this.getAttribute("PwmFrequency"); },
        set: function (value) { this.setAttribute("PwmFrequency", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_Configuration.prototype, "ThermometerConfig", {
        get: function () {
            return this.getChildEntityArray("ThermometerConfig");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration_Configuration.prototype, "ThermometerConfig$", {
        get: function () {
            return this.getChildEntityArray("ThermometerConfig").selected();
        },
        enumerable: true,
        configurable: true
    });
    return Configuration_Configuration;
}(zeidon.EntityInstance));
exports.Configuration_Configuration = Configuration_Configuration;
var Configuration_ThermometerConfig = (function (_super) {
    __extends(Configuration_ThermometerConfig, _super);
    function Configuration_ThermometerConfig() {
        return _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Configuration_ThermometerConfig.prototype, "entityName", {
        get: function () { return "ThermometerConfig"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Configuration_ThermometerConfig.prototype, "Id", {
        get: function () { return this.getAttribute("Id"); },
        set: function (value) { this.setAttribute("Id", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_ThermometerConfig.prototype, "Name", {
        get: function () { return this.getAttribute("Name"); },
        set: function (value) { this.setAttribute("Name", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_ThermometerConfig.prototype, "AlarmLow", {
        get: function () { return this.getAttribute("AlarmLow"); },
        set: function (value) { this.setAttribute("AlarmLow", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_ThermometerConfig.prototype, "AlarmHigh", {
        get: function () { return this.getAttribute("AlarmHigh"); },
        set: function (value) { this.setAttribute("AlarmHigh", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_ThermometerConfig.prototype, "AlarmOn", {
        get: function () { return this.getAttribute("AlarmOn"); },
        set: function (value) { this.setAttribute("AlarmOn", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Configuration_ThermometerConfig.prototype, "wTemperatureWithinAlarmThreshold", {
        get: function () { return this.getAttribute("wTemperatureWithinAlarmThreshold"); },
        set: function (value) { this.setAttribute("wTemperatureWithinAlarmThreshold", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Configuration_ThermometerConfig;
}(zeidon.EntityInstance));
exports.Configuration_ThermometerConfig = Configuration_ThermometerConfig;
var ConfigurationEntityPrototypes = {
    Configuration: Configuration_Configuration.prototype,
    ThermometerConfig: Configuration_ThermometerConfig.prototype,
};
exports.Configuration_LodDef = {
    name: "Configuration",
    entities: {
        Configuration: {
            name: "Configuration",
            erToken: "905181331",
            create: true,
            cardMax: 0,
            hasInit: true,
            creatable: true,
            includable: false,
            deletable: true,
            excludable: false,
            updatable: true,
            parentDelete: true,
            childEntities: {
                ThermometerConfig: {},
            },
            attributes: {
                Id: {
                    name: "Id",
                    hidden: false,
                    required: true,
                    domainName: "GeneratedKey",
                    persistent: true,
                    key: true,
                    update: true,
                    foreignKey: false,
                },
                Description: {
                    name: "Description",
                    hidden: false,
                    required: true,
                    domainName: "Text",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Notes: {
                    name: "Notes",
                    hidden: false,
                    required: false,
                    domainName: "Text",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                TargetTemperature: {
                    name: "TargetTemperature",
                    hidden: false,
                    required: true,
                    domainName: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                TemperatureUnit: {
                    name: "TemperatureUnit",
                    hidden: false,
                    required: true,
                    domainName: "TemperatureUnit",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "F",
                },
                RecordTemperatures: {
                    name: "RecordTemperatures",
                    hidden: false,
                    required: false,
                    domainName: "Boolean",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                PidP: {
                    name: "PidP",
                    hidden: false,
                    required: true,
                    domainName: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "3",
                },
                PidI: {
                    name: "PidI",
                    hidden: false,
                    required: true,
                    domainName: "Double",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "0.005",
                },
                PidD: {
                    name: "PidD",
                    hidden: false,
                    required: true,
                    domainName: "Double",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "5.0",
                },
                MaxPWM: {
                    name: "MaxPWM",
                    hidden: false,
                    required: false,
                    domainName: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                TweetOn: {
                    name: "TweetOn",
                    hidden: false,
                    required: false,
                    domainName: "Boolean",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                TweetPeriodInMinutes: {
                    name: "TweetPeriodInMinutes",
                    hidden: false,
                    required: false,
                    domainName: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                PwmFrequency: {
                    name: "PwmFrequency",
                    hidden: false,
                    required: false,
                    domainName: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                autoseq: {
                    name: "autoseq",
                    hidden: true,
                    required: false,
                    domainName: "Integer",
                    persistent: true,
                    key: false,
                    update: false,
                    foreignKey: false,
                },
            }
        },
        ThermometerConfig: {
            name: "ThermometerConfig",
            erToken: "905181361",
            create: true,
            cardMax: 10,
            hasInit: false,
            creatable: true,
            includable: false,
            deletable: true,
            excludable: false,
            updatable: true,
            parentDelete: true,
            childEntities: {},
            attributes: {
                Id: {
                    name: "Id",
                    hidden: false,
                    required: true,
                    domainName: "GeneratedKey",
                    persistent: true,
                    key: true,
                    update: true,
                    foreignKey: false,
                },
                Name: {
                    name: "Name",
                    hidden: false,
                    required: true,
                    domainName: "Text",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                AlarmLow: {
                    name: "AlarmLow",
                    hidden: false,
                    required: false,
                    domainName: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                AlarmHigh: {
                    name: "AlarmHigh",
                    hidden: false,
                    required: false,
                    domainName: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                AlarmOn: {
                    name: "AlarmOn",
                    hidden: false,
                    required: false,
                    domainName: "Boolean",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                wTemperatureWithinAlarmThreshold: {
                    name: "wTemperatureWithinAlarmThreshold",
                    hidden: false,
                    required: false,
                    domainName: "Boolean",
                    persistent: false,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                autoseq: {
                    name: "autoseq",
                    hidden: true,
                    required: false,
                    domainName: "Integer",
                    persistent: true,
                    key: false,
                    update: false,
                    foreignKey: false,
                },
                fk_id_configuration: {
                    name: "fk_id_configuration",
                    hidden: true,
                    required: true,
                    domainName: "GeneratedKey",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: true,
                },
            }
        },
    }
};
//# sourceMappingURL=Configuration.js.map