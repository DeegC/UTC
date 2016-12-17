/*
  Generated from LOD Instant on 2016-12-16T22:12:58.526

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
// Instant LOD.
var Instant = (function (_super) {
    __extends(Instant, _super);
    function Instant() {
        return _super.apply(this, arguments) || this;
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
    Instant.prototype.getDomain = function (name) {
        return UTC_DomainList_1.UTC_DomainList[name];
    };
    ;
    Instant.prototype.getDomainFunctions = function (name) {
        return UTC_DomainFunctions_1.UTC_DomainFunctions[name];
    };
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
    Instant.activate = function (qual) {
        return zeidon.ObjectInstance.activateOi(new Instant(), qual);
    };
    return Instant;
}(zeidon.ObjectInstance));
exports.Instant = Instant;
var Instant_Instant = (function (_super) {
    __extends(Instant_Instant, _super);
    function Instant_Instant() {
        return _super.apply(this, arguments) || this;
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
            return this.getChildEntityArray("Session");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Instant_Instant.prototype, "Session$", {
        get: function () {
            return this.getChildEntityArray("Session").selected();
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
        return _super.apply(this, arguments) || this;
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
            erToken: "905181315",
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
                Session: {},
            },
            attributes: {
                Timestamp: {
                    name: "Timestamp",
                    hidden: false,
                    required: true,
                    domainName: "DateTime",
                    persistent: true,
                    key: true,
                    update: true,
                    foreignKey: false,
                },
                TargetTemperature: {
                    name: "TargetTemperature",
                    hidden: false,
                    required: true,
                    domainName: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm0: {
                    name: "Therm0",
                    hidden: false,
                    required: false,
                    domainName: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm1: {
                    name: "Therm1",
                    hidden: false,
                    required: false,
                    domainName: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm2: {
                    name: "Therm2",
                    hidden: false,
                    required: false,
                    domainName: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm3: {
                    name: "Therm3",
                    hidden: false,
                    required: false,
                    domainName: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm4: {
                    name: "Therm4",
                    hidden: false,
                    required: false,
                    domainName: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm5: {
                    name: "Therm5",
                    hidden: false,
                    required: false,
                    domainName: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm6: {
                    name: "Therm6",
                    hidden: false,
                    required: false,
                    domainName: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Therm7: {
                    name: "Therm7",
                    hidden: false,
                    required: false,
                    domainName: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                PWM0: {
                    name: "PWM0",
                    hidden: false,
                    required: false,
                    domainName: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                CpuTemperature: {
                    name: "CpuTemperature",
                    hidden: true,
                    required: false,
                    domainName: "Temperature",
                    persistent: true,
                    key: false,
                    update: false,
                    foreignKey: false,
                },
                fk_id_session: {
                    name: "fk_id_session",
                    hidden: true,
                    required: true,
                    domainName: "GeneratedKey",
                    persistent: true,
                    key: true,
                    update: true,
                    foreignKey: true,
                },
            }
        },
        Session: {
            name: "Session",
            erToken: "905181347",
            create: false,
            cardMax: 1,
            hasInit: false,
            creatable: false,
            includable: true,
            deletable: false,
            excludable: true,
            updatable: false,
            parentDelete: false,
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
                Date: {
                    name: "Date",
                    hidden: false,
                    required: true,
                    domainName: "DateTime",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                EndDate: {
                    name: "EndDate",
                    hidden: false,
                    required: false,
                    domainName: "DateTime",
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
//# sourceMappingURL=Instant.js.map