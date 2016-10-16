"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var zeidon_object_instance_1 = require('./zeidon.object.instance');
//import { ZeidonEntityInstance } from './zeidon.entity.instance';
var zeidon = require('./zeidon.entity.instance');
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
    function Configuration_Configuration(initialize) {
        _super.call(this, initialize);
        this.attributes = {
            Id: true,
            Description: true,
            TargetTemperature: true,
            ThermometerCount: true
        };
    }
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
    return Configuration_Configuration;
}(zeidon.ZeidonEntityInstance));
exports.Configuration_Configuration = Configuration_Configuration;
var prototypes = {
    "Configuration": Configuration_Configuration.prototype
};
//# sourceMappingURL=configuration.js.map