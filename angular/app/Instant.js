"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
  Generated from LOD Instant on 2016-10-28T07:40:13.441

*/
var zeidon = require('./zeidon');
// Instant LOD.
var Instant = (function (_super) {
    __extends(Instant, _super);
    function Instant() {
        _super.apply(this, arguments);
    }
    Instant.prototype.rootEntityName = function () { return "Instant"; };
    ;
    Instant.prototype.getApplicationName = function () { return "UTC"; };
    ;
    Instant.prototype.getPrototype = function (entityName) {
        return InstantEntityPrototypes[entityName];
    };
    Instant.prototype.getLodDef = function () {
        return exports.Instant_LodDef;
    };
    ;
    Object.defineProperty(Instant.prototype, "Instant", {
        get: function () {
            return this.roots;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Instant.prototype, "Instant$", {
        get: function () {
            return this.roots.selected();
        },
        enumerable: true,
        configurable: true
    });
    return Instant;
}(zeidon.ObjectInstance));
exports.Instant = Instant;
var Instant_Instant = (function (_super) {
    __extends(Instant_Instant, _super);
    function Instant_Instant() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Instant_Instant.prototype, "entityName", {
        get: function () { return "Instant"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Instant_Instant.prototype, "Timestamp", {
        get: function () { return this.getAttribute("Timestamp"); },
        set: function (value) { this.setAttribute("Timestamp", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Instant_Instant.prototype, "TargetTemperature", {
        get: function () { return this.getAttribute("TargetTemperature"); },
        set: function (value) { this.setAttribute("TargetTemperature", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Instant_Instant.prototype, "Therm0", {
        get: function () { return this.getAttribute("Therm0"); },
        set: function (value) { this.setAttribute("Therm0", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Instant_Instant.prototype, "Therm1", {
        get: function () { return this.getAttribute("Therm1"); },
        set: function (value) { this.setAttribute("Therm1", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Instant_Instant.prototype, "Therm2", {
        get: function () { return this.getAttribute("Therm2"); },
        set: function (value) { this.setAttribute("Therm2", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Instant_Instant.prototype, "Therm3", {
        get: function () { return this.getAttribute("Therm3"); },
        set: function (value) { this.setAttribute("Therm3", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Instant_Instant.prototype, "Therm4", {
        get: function () { return this.getAttribute("Therm4"); },
        set: function (value) { this.setAttribute("Therm4", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Instant_Instant.prototype, "Therm5", {
        get: function () { return this.getAttribute("Therm5"); },
        set: function (value) { this.setAttribute("Therm5", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Instant_Instant.prototype, "Therm6", {
        get: function () { return this.getAttribute("Therm6"); },
        set: function (value) { this.setAttribute("Therm6", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Instant_Instant.prototype, "Therm7", {
        get: function () { return this.getAttribute("Therm7"); },
        set: function (value) { this.setAttribute("Therm7", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Instant_Instant.prototype, "PWM0", {
        get: function () { return this.getAttribute("PWM0"); },
        set: function (value) { this.setAttribute("PWM0", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Instant_Instant.prototype, "Session", {
        get: function () {
            var entities = this.getChildEntityArray("Session");
            return entities;
        },
        enumerable: true,
        configurable: true
    });
    return Instant_Instant;
}(zeidon.EntityInstance));
exports.Instant_Instant = Instant_Instant;
var Instant_Session = (function (_super) {
    __extends(Instant_Session, _super);
    function Instant_Session() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Instant_Session.prototype, "entityName", {
        get: function () { return "Session"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Instant_Session.prototype, "Id", {
        get: function () { return this.getAttribute("Id"); },
        set: function (value) { this.setAttribute("Id", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Instant_Session.prototype, "Date", {
        get: function () { return this.getAttribute("Date"); },
        set: function (value) { this.setAttribute("Date", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Instant_Session.prototype, "EndDate", {
        get: function () { return this.getAttribute("EndDate"); },
        set: function (value) { this.setAttribute("EndDate", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Instant_Session.prototype, "Notes", {
        get: function () { return this.getAttribute("Notes"); },
        set: function (value) { this.setAttribute("Notes", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Instant_Session;
}(zeidon.EntityInstance));
exports.Instant_Session = Instant_Session;
var InstantEntityPrototypes = {
    Instant: Instant_Instant.prototype,
    Session: Instant_Session.prototype,
};
exports.Instant_LodDef = {
    name: "Instant",
    entities: {
        Instant: {
            name: "Instant",
            create: true,
            cardMax: 0,
            childEntities: {
                Session: {},
            },
            attributes: {
                Timestamp: {
                    hidden: false,
                    required: true,
                    domain: "DateTime",
                    persistent: true,
                    key: true,
                    update: true,
                    foreignKey: false,
                },
                TargetTemperature: {
                    hidden: false,
                    required: true,
                    domain: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm0: {
                    hidden: false,
                    required: false,
                    domain: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm1: {
                    hidden: false,
                    required: false,
                    domain: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm2: {
                    hidden: false,
                    required: false,
                    domain: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm3: {
                    hidden: false,
                    required: false,
                    domain: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm4: {
                    hidden: false,
                    required: false,
                    domain: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm5: {
                    hidden: false,
                    required: false,
                    domain: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm6: {
                    hidden: false,
                    required: false,
                    domain: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm7: {
                    hidden: false,
                    required: false,
                    domain: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                PWM0: {
                    hidden: false,
                    required: false,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                CpuTemperature: {
                    hidden: true,
                    required: false,
                    domain: "Temperature",
                    persistent: true,
                    key: false,
                    update: false,
                    foreignKey: false,
                },
                fk_id_session: {
                    hidden: true,
                    required: true,
                    domain: "GeneratedKey",
                    persistent: true,
                    key: true,
                    update: true,
                    foreignKey: true,
                },
            }
        },
        Session: {
            name: "Session",
            create: false,
            cardMax: 1,
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
                },
                Date: {
                    hidden: false,
                    required: true,
                    domain: "DateTime",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                EndDate: {
                    hidden: false,
                    required: false,
                    domain: "DateTime",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Notes: {
                    hidden: false,
                    required: false,
                    domain: "Text",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                fk_id_configuration: {
                    hidden: true,
                    required: true,
                    domain: "GeneratedKey",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: true,
                },
            }
        },
    }
};
//# sourceMappingURL=Instant.js.map