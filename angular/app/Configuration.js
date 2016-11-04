"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
  Generated from LOD Configuration on 2016-11-02T18:21:46.922

*/
var zeidon = require('./zeidon');
// Configuration LOD.
var Configuration = (function (_super) {
    __extends(Configuration, _super);
    function Configuration() {
        _super.apply(this, arguments);
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
    Configuration.activate = function (options) {
        return zeidon.ObjectInstance.activateOi(new Configuration(), options);
    };
    return Configuration;
}(zeidon.ObjectInstance));
exports.Configuration = Configuration;
var Configuration_Configuration = (function (_super) {
    __extends(Configuration_Configuration, _super);
    function Configuration_Configuration() {
        _super.apply(this, arguments);
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
    Object.defineProperty(Configuration_Configuration.prototype, "ThermometerCount", {
        get: function () { return this.getAttribute("ThermometerCount"); },
        set: function (value) { this.setAttribute("ThermometerCount", value); },
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
    return Configuration_Configuration;
}(zeidon.EntityInstance));
exports.Configuration_Configuration = Configuration_Configuration;
var Configuration_ThermometerConfig = (function (_super) {
    __extends(Configuration_ThermometerConfig, _super);
    function Configuration_ThermometerConfig() {
        _super.apply(this, arguments);
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
            create: true,
            cardMax: 0,
            hasInit: false,
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
                    hidden: false,
                    required: true,
                    domain: "GeneratedKey",
                    persistent: true,
                    key: true,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                Description: {
                    hidden: false,
                    required: true,
                    domain: "Text",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                Notes: {
                    hidden: false,
                    required: false,
                    domain: "Text",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                TargetTemperature: {
                    hidden: false,
                    required: true,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                ThermometerCount: {
                    hidden: false,
                    required: true,
                    domain: "ThermometerCount",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                TemperatureUnit: {
                    hidden: false,
                    required: true,
                    domain: "TemperatureUnit",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                RecordTemperatures: {
                    hidden: false,
                    required: false,
                    domain: "Boolean",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                PidP: {
                    hidden: false,
                    required: true,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                PidI: {
                    hidden: false,
                    required: true,
                    domain: "Double",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                PidD: {
                    hidden: false,
                    required: true,
                    domain: "Double",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                MaxPWM: {
                    hidden: false,
                    required: false,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                TweetOn: {
                    hidden: false,
                    required: false,
                    domain: "Boolean",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                TweetPeriodInMinutes: {
                    hidden: false,
                    required: false,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                PwmFrequency: {
                    hidden: false,
                    required: false,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                autoseq: {
                    hidden: true,
                    required: false,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: false,
                    foreignKey: false,
                    initialValue: "null",
                },
            }
        },
        ThermometerConfig: {
            name: "ThermometerConfig",
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
                    hidden: false,
                    required: true,
                    domain: "GeneratedKey",
                    persistent: true,
                    key: true,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                Name: {
                    hidden: false,
                    required: true,
                    domain: "Text",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                AlarmLow: {
                    hidden: false,
                    required: false,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                AlarmHigh: {
                    hidden: false,
                    required: false,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                AlarmOn: {
                    hidden: false,
                    required: false,
                    domain: "Boolean",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                wTemperatureWithinAlarmThreshold: {
                    hidden: false,
                    required: false,
                    domain: "Boolean",
                    persistent: false,
                    key: false,
                    update: true,
                    foreignKey: false,
                    initialValue: "null",
                },
                autoseq: {
                    hidden: true,
                    required: false,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: false,
                    foreignKey: false,
                    initialValue: "null",
                },
                fk_id_configuration: {
                    hidden: true,
                    required: true,
                    domain: "GeneratedKey",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: true,
                    initialValue: "null",
                },
            }
        },
    }
};
//# sourceMappingURL=Configuration.js.map