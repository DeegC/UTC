/*
  Generated from LOD Session on 2016-12-18T01:33:59.135

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
// Session LOD.
var Session = (function (_super) {
    __extends(Session, _super);
    function Session() {
        return _super.apply(this, arguments) || this;
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
    Session.prototype.getDomain = function (name) {
        return UTC_DomainList_1.UTC_DomainList[name];
    };
    ;
    Session.prototype.getDomainFunctions = function (name) {
        return UTC_DomainFunctions_1.UTC_DomainFunctions[name];
    };
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
    Session.activate = function (qual) {
        return zeidon.ObjectInstance.activateOi(new Session(), qual);
    };
    return Session;
}(zeidon.ObjectInstance));
exports.Session = Session;
var Session_Session = (function (_super) {
    __extends(Session_Session, _super);
    function Session_Session() {
        return _super.apply(this, arguments) || this;
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
    Object.defineProperty(Session_Session.prototype, "Configuration$", {
        get: function () {
            return this.getChildEntityArray("Configuration").selected();
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
    Object.defineProperty(Session_Session.prototype, "Instant$", {
        get: function () {
            return this.getChildEntityArray("Instant").selected();
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
        return _super.apply(this, arguments) || this;
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
        return _super.apply(this, arguments) || this;
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
            erToken: "905181347",
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
        Configuration: {
            name: "Configuration",
            erToken: "905181331",
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
        Instant: {
            name: "Instant",
            erToken: "905181315",
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
                    hidden: false,
                    required: false,
                    domainName: "Temperature",
                    persistent: true,
                    key: false,
                    update: true,
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
    }
};
//# sourceMappingURL=Session.js.map