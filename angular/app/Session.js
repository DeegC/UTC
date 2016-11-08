"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
  Generated from LOD Session on 2016-11-06T19:33:29.196

*/
var zeidon = require('./zeidon');
// Session LOD.
var Session = (function (_super) {
    __extends(Session, _super);
    function Session() {
        _super.apply(this, arguments);
    }
    Session.prototype.rootEntityName = function () { return "Session"; };
    ;
    Session.prototype.getApplicationName = function () { return "UTC"; };
    ;
    Session.prototype.getPrototype = function (entityName) {
        return SessionEntityPrototypes[entityName];
    };
    Session.prototype.getLodDef = function () {
        return exports.Session_LodDef;
    };
    ;
    Object.defineProperty(Session.prototype, "Session", {
        get: function () {
            return this.roots;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "Session$", {
        get: function () {
            return this.roots.selected();
        },
        enumerable: true,
        configurable: true
    });
    Session.activate = function (options) {
        return zeidon.ObjectInstance.activateOi(new Session(), options);
    };
    return Session;
}(zeidon.ObjectInstance));
exports.Session = Session;
var Session_Session = (function (_super) {
    __extends(Session_Session, _super);
    function Session_Session() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Session_Session.prototype, "entityName", {
        get: function () { return "Session"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Session_Session.prototype, "Id", {
        get: function () { return this.getAttribute("Id"); },
        set: function (value) { this.setAttribute("Id", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Session.prototype, "Date", {
        get: function () { return this.getAttribute("Date"); },
        set: function (value) { this.setAttribute("Date", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Session.prototype, "EndDate", {
        get: function () { return this.getAttribute("EndDate"); },
        set: function (value) { this.setAttribute("EndDate", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Session.prototype, "Notes", {
        get: function () { return this.getAttribute("Notes"); },
        set: function (value) { this.setAttribute("Notes", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Session.prototype, "Configuration", {
        get: function () {
            return this.getChildEntityArray("Configuration");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Session_Session.prototype, "Instant", {
        get: function () {
            return this.getChildEntityArray("Instant");
        },
        enumerable: true,
        configurable: true
    });
    return Session_Session;
}(zeidon.EntityInstance));
exports.Session_Session = Session_Session;
var Session_Configuration = (function (_super) {
    __extends(Session_Configuration, _super);
    function Session_Configuration() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Session_Configuration.prototype, "entityName", {
        get: function () { return "Configuration"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Session_Configuration.prototype, "Id", {
        get: function () { return this.getAttribute("Id"); },
        set: function (value) { this.setAttribute("Id", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Configuration.prototype, "Description", {
        get: function () { return this.getAttribute("Description"); },
        set: function (value) { this.setAttribute("Description", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Configuration.prototype, "Notes", {
        get: function () { return this.getAttribute("Notes"); },
        set: function (value) { this.setAttribute("Notes", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Configuration.prototype, "TargetTemperature", {
        get: function () { return this.getAttribute("TargetTemperature"); },
        set: function (value) { this.setAttribute("TargetTemperature", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Configuration.prototype, "ThermometerCount", {
        get: function () { return this.getAttribute("ThermometerCount"); },
        set: function (value) { this.setAttribute("ThermometerCount", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Configuration.prototype, "TemperatureUnit", {
        get: function () { return this.getAttribute("TemperatureUnit"); },
        set: function (value) { this.setAttribute("TemperatureUnit", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Configuration.prototype, "RecordTemperatures", {
        get: function () { return this.getAttribute("RecordTemperatures"); },
        set: function (value) { this.setAttribute("RecordTemperatures", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Configuration.prototype, "PidP", {
        get: function () { return this.getAttribute("PidP"); },
        set: function (value) { this.setAttribute("PidP", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Configuration.prototype, "PidI", {
        get: function () { return this.getAttribute("PidI"); },
        set: function (value) { this.setAttribute("PidI", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Configuration.prototype, "PidD", {
        get: function () { return this.getAttribute("PidD"); },
        set: function (value) { this.setAttribute("PidD", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Configuration.prototype, "MaxPWM", {
        get: function () { return this.getAttribute("MaxPWM"); },
        set: function (value) { this.setAttribute("MaxPWM", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Configuration.prototype, "TweetOn", {
        get: function () { return this.getAttribute("TweetOn"); },
        set: function (value) { this.setAttribute("TweetOn", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Configuration.prototype, "TweetPeriodInMinutes", {
        get: function () { return this.getAttribute("TweetPeriodInMinutes"); },
        set: function (value) { this.setAttribute("TweetPeriodInMinutes", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Configuration.prototype, "PwmFrequency", {
        get: function () { return this.getAttribute("PwmFrequency"); },
        set: function (value) { this.setAttribute("PwmFrequency", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Session_Configuration;
}(zeidon.EntityInstance));
exports.Session_Configuration = Session_Configuration;
var Session_Instant = (function (_super) {
    __extends(Session_Instant, _super);
    function Session_Instant() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Session_Instant.prototype, "entityName", {
        get: function () { return "Instant"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Session_Instant.prototype, "Timestamp", {
        get: function () { return this.getAttribute("Timestamp"); },
        set: function (value) { this.setAttribute("Timestamp", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Instant.prototype, "TargetTemperature", {
        get: function () { return this.getAttribute("TargetTemperature"); },
        set: function (value) { this.setAttribute("TargetTemperature", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Instant.prototype, "Therm0", {
        get: function () { return this.getAttribute("Therm0"); },
        set: function (value) { this.setAttribute("Therm0", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Instant.prototype, "Therm1", {
        get: function () { return this.getAttribute("Therm1"); },
        set: function (value) { this.setAttribute("Therm1", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Instant.prototype, "Therm2", {
        get: function () { return this.getAttribute("Therm2"); },
        set: function (value) { this.setAttribute("Therm2", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Instant.prototype, "Therm3", {
        get: function () { return this.getAttribute("Therm3"); },
        set: function (value) { this.setAttribute("Therm3", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Instant.prototype, "Therm4", {
        get: function () { return this.getAttribute("Therm4"); },
        set: function (value) { this.setAttribute("Therm4", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Instant.prototype, "Therm5", {
        get: function () { return this.getAttribute("Therm5"); },
        set: function (value) { this.setAttribute("Therm5", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Instant.prototype, "Therm6", {
        get: function () { return this.getAttribute("Therm6"); },
        set: function (value) { this.setAttribute("Therm6", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Instant.prototype, "Therm7", {
        get: function () { return this.getAttribute("Therm7"); },
        set: function (value) { this.setAttribute("Therm7", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Instant.prototype, "PWM0", {
        get: function () { return this.getAttribute("PWM0"); },
        set: function (value) { this.setAttribute("PWM0", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Session_Instant.prototype, "CpuTemperature", {
        get: function () { return this.getAttribute("CpuTemperature"); },
        set: function (value) { this.setAttribute("CpuTemperature", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Session_Instant;
}(zeidon.EntityInstance));
exports.Session_Instant = Session_Instant;
var SessionEntityPrototypes = {
    Session: Session_Session.prototype,
    Configuration: Session_Configuration.prototype,
    Instant: Session_Instant.prototype,
};
exports.Session_LodDef = {
    name: "Session",
    entities: {
        Session: {
            name: "Session",
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
                Configuration: {},
                Instant: {},
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
        Configuration: {
            name: "Configuration",
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
                    hidden: false,
                    required: true,
                    domain: "GeneratedKey",
                    persistent: true,
                    key: true,
                    update: true,
                    foreignKey: false,
                },
                Description: {
                    hidden: false,
                    required: true,
                    domain: "Text",
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
                TargetTemperature: {
                    hidden: false,
                    required: true,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                ThermometerCount: {
                    hidden: false,
                    required: true,
                    domain: "ThermometerCount",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                TemperatureUnit: {
                    hidden: false,
                    required: true,
                    domain: "TemperatureUnit",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                RecordTemperatures: {
                    hidden: false,
                    required: false,
                    domain: "Boolean",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                PidP: {
                    hidden: false,
                    required: true,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                PidI: {
                    hidden: false,
                    required: true,
                    domain: "Double",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                PidD: {
                    hidden: false,
                    required: true,
                    domain: "Double",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                MaxPWM: {
                    hidden: false,
                    required: false,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                TweetOn: {
                    hidden: false,
                    required: false,
                    domain: "Boolean",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                TweetPeriodInMinutes: {
                    hidden: false,
                    required: false,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                PwmFrequency: {
                    hidden: false,
                    required: false,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                autoseq: {
                    hidden: true,
                    required: false,
                    domain: "Integer",
                    persistent: true,
                    key: false,
                    update: false,
                    foreignKey: false,
                },
            }
        },
        Instant: {
            name: "Instant",
            create: true,
            cardMax: 999999,
            hasInit: false,
            creatable: true,
            includable: false,
            deletable: true,
            excludable: false,
            updatable: true,
            parentDelete: true,
            childEntities: {},
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
                    hidden: false,
                    required: false,
                    domain: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
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
    }
};
//# sourceMappingURL=Session.js.map