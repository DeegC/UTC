"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var zeidon_object_instance_1 = require('./zeidon.object.instance');
//import { ZeidonEntityInstance } from './zeidon.entity.instance';
var zeidon = require('./zeidon.entity.instance');
// Configuration LOD.
var Configuration = (function (_super) {
    __extends(Configuration, _super);
    function Configuration(initialize) {
        _super.call(this, initialize);
    }
    Configuration.prototype.oiName = function () { return "Configuration"; };
    ;
    Configuration.prototype.rootEntityName = function () { return "Configuration"; };
    ;
    Object.defineProperty(Configuration.prototype, "Configuration", {
        get: function () {
            return this.roots[0];
        },
        enumerable: true,
        configurable: true
    });
    Configuration.prototype.getPrototype = function (entityName) {
        return prototypes[entityName];
    };
    return Configuration;
}(zeidon_object_instance_1.ZeidonObjectInstance));
exports.Configuration = Configuration;
var Configuration_Configuration = (function (_super) {
    __extends(Configuration_Configuration, _super);
    function Configuration_Configuration() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Configuration_Configuration.prototype, "attributes", {
        get: function () {
            return {
                Id: true,
                Description: true,
                TargetTemperature: true,
                ThermometerCount: true
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration_Configuration.prototype, "childEntities", {
        get: function () {
            return {
                ThermometerConfig: true
            };
        },
        enumerable: true,
        configurable: true
    });
    Configuration_Configuration.prototype.createEmptyEntityArray = function () {
        var array = new zeidon.EntityArray();
        array.entityPrototype = Configuration_ThermometerConfig.prototype;
        array.entityName = "ThermometerConfig";
        return array;
    };
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
            var entities = this.getChildEntities("ThermometerConfig");
            return entities;
        },
        enumerable: true,
        configurable: true
    });
    return Configuration_Configuration;
}(zeidon.ZeidonEntityInstance));
exports.Configuration_Configuration = Configuration_Configuration;
var Configuration_ThermometerConfig = (function (_super) {
    __extends(Configuration_ThermometerConfig, _super);
    function Configuration_ThermometerConfig() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Configuration_ThermometerConfig.prototype, "attributes", {
        get: function () {
            return {
                Id: true,
                Name: true,
                AlarmOn: true,
                fk_id_configuration: true
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Configuration_ThermometerConfig.prototype, "childEntities", {
        get: function () {
            return {};
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(Configuration_ThermometerConfig.prototype, "fk_id_configuration", {
        get: function () { return this.getAttribute("fk_id_configuration"); },
        set: function (value) { this.setAttribute("fk_id_configuration", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Configuration_ThermometerConfig;
}(zeidon.ZeidonEntityInstance));
exports.Configuration_ThermometerConfig = Configuration_ThermometerConfig;
var prototypes = {
    "Configuration": Configuration_Configuration.prototype,
    "ThermometerConfig": Configuration_ThermometerConfig.prototype
};
//# sourceMappingURL=configuration.js.map