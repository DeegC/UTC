"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var zeidon = require('./zeidon');
// Configuration LOD.
var Configuration = (function (_super) {
    __extends(Configuration, _super);
    function Configuration() {
        _super.apply(this, arguments);
    }
    Configuration.prototype.rootEntityName = function () { return "Configuration"; };
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
    Configuration.prototype.getPrototype = function (entityName) {
        return ConfigurationEntityPrototypes[entityName];
    };
    Configuration.prototype.getLodDef = function () {
        return exports.Configuration_LodDef;
    };
    ;
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
    Object.defineProperty(Configuration_Configuration.prototype, "ThermometerConfig", {
        get: function () {
            var entities = this.getChildEntityArray("ThermometerConfig");
            return entities;
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
    Object.defineProperty(Configuration_ThermometerConfig.prototype, "AlarmOn", {
        get: function () { return this.getAttribute("AlarmOn"); },
        set: function (value) { this.setAttribute("AlarmOn", value); },
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
    ThermometerConfig: Configuration_ThermometerConfig.prototype
};
exports.Configuration_LodDef = {
    name: "Configuration",
    entities: {
        Configuration: {
            name: "Configuration",
            create: true,
            cardMax: undefined,
            childEntities: { ThermometerConfig: {} },
            attributes: {
                Id: {},
                Description: {},
                TargetTemperature: {},
                TemperatureUnit: {},
                RecordTemperatures: {},
                PidP: {},
                PidI: {},
                PidD: {},
                MaxPWM: {},
                TweetOn: {},
                TweetPeriodInMinutes: {},
                PwmFrequency: {},
                ThermometerCount: {}
            }
        },
        ThermometerConfig: {
            name: "ThermometerConfig",
            create: true,
            cardMax: Number.MAX_SAFE_INTEGER,
            childEntities: {},
            attributes: {
                Id: {},
                Name: {},
                AlarmOn: {},
                fk_id_configuration: {}
            }
        }
    } // entities
};
//# sourceMappingURL=configuration.js.map