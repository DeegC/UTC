"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Application = (function () {
    function Application(lodDefs) {
        this.lodDefs = lodDefs;
    }
    return Application;
}());
exports.Application = Application;
var ObjectInstance = (function () {
    function ObjectInstance(initialize, options) {
        if (initialize === void 0) { initialize = undefined; }
        if (options === void 0) { options = {}; }
        this.isUpdated = false;
        if (typeof initialize == "string") {
            initialize = JSON.parse(initialize);
        }
        this.roots = new EntityArray(this.rootEntityName(), this);
        if (initialize.OIs) {
            // TODO: Someday we should handle multiple return OIs for for now
            // we'll assume just one and hardcode '[0]'.
            var oimeta = initialize.OIs[0][".oimeta"];
            // If incrementals are set then set the constructor option to 
            // not set the update flag when the attribute value is set.  The
            // flags will be set by the incrementals.
            if (oimeta && oimeta.incremental) {
                if (options.dontSetUpdate == undefined)
                    options.dontSetUpdate = true;
            }
            for (var _i = 0, _a = initialize.OIs[0][this.rootEntityName()]; _i < _a.length; _i++) {
                var i = _a[_i];
                this.roots.create(i, options);
            }
        }
        else if (initialize.constructor === Array) {
            for (var _b = 0, initialize_1 = initialize; _b < initialize_1.length; _b++) {
                var i = initialize_1[_b];
                this.roots.create(i, options);
            }
        }
        else {
            this.roots.create(initialize, options);
        }
    }
    ObjectInstance.prototype.rootEntityName = function () { throw "rootEntityName must be overridden"; };
    ;
    ObjectInstance.prototype.getPrototype = function (entityName) { throw "getPrototype must be overriden"; };
    ;
    ObjectInstance.prototype.getLodDef = function () { throw "getLodDef must be overridden"; };
    ;
    ObjectInstance.prototype.getApplicationName = function () { throw "getApplicationName must be overriden"; };
    ;
    ObjectInstance.prototype.getEntityAttributes = function (entityName) {
        this.getLodDef().entities[entityName].attributes;
    };
    ;
    ObjectInstance.prototype.toJSON = function () {
        console.log("JSON for Configuration OI");
        var jarray = [];
        for (var _i = 0, _a = this.roots; _i < _a.length; _i++) {
            var root = _a[_i];
            jarray.push(root.toJSON());
        }
        ;
        var json = {};
        json[this.rootEntityName()] = jarray;
        return json;
    };
    /**
     * Wrap the JSON for this object with Zeidon OI meta.
     */
    ObjectInstance.prototype.toZeidonMeta = function () {
        var wrapper = {
            ".meta": { version: "1" },
            OIs: [{
                    ".oimeta": {
                        application: this.getApplicationName(),
                        odName: this.getLodDef().name,
                        incremental: true,
                        readOnlyOi: false
                    }
                }]
        };
        // Add the OI.
        wrapper.OIs[0][this.getLodDef().name] = this.toJSON()[this.getLodDef().name];
        return wrapper;
    };
    return ObjectInstance;
}());
exports.ObjectInstance = ObjectInstance;
var EntityInstance = (function () {
    function EntityInstance(initialize, oi, options) {
        if (options === void 0) { options = {}; }
        this.created = false;
        this.included = false;
        this.deleted = false;
        this.excluded = false;
        this.updated = false;
        // If incomplete = true then this entity did not have all its children
        // loaded and so cannot be deleted.
        this.incomplete = false;
        this.childEntityInstances = {};
        this.oi = oi;
        for (var attr in initialize) {
            if (this.attributeDefs[attr]) {
                this.setAttribute(attr, initialize[attr], options);
                continue;
            }
            if (this.entityDef.childEntities[attr]) {
                var init = initialize[attr];
                if (!(init.constructor === Array)) {
                    init = [init]; // If it's not an array, wrap it.
                }
                for (var _i = 0, init_1 = init; _i < init_1.length; _i++) {
                    var o = init_1[_i];
                    var array = this.getChildEntityArray(attr);
                    array.create(o, options);
                }
                continue;
            }
            if (attr == ".meta") {
                var meta = initialize[attr];
                if (meta.incremntal)
                    options.includesIncremntal = true;
                if (meta.readOnlyOi)
                    options.readOnlyOi = true;
                continue;
            }
            if (attr.startsWith(".")) {
                var metaName = attr.substr(1); // Remove leading "."
                if (this.attributeDefs[metaName]) {
                    this[attr] = initialize[attr];
                    continue;
                }
            }
            throw "Unknown attribute " + attr + " for entity " + this.entityName;
        }
    }
    Object.defineProperty(EntityInstance.prototype, "entityName", {
        get: function () { throw "entityName() but be overridden"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(EntityInstance.prototype, "entityDef", {
        get: function () {
            return this.oi.getLodDef().entities[this.entityName];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityInstance.prototype, "attributeDefs", {
        get: function () {
            return this.entityDef.attributes;
        },
        enumerable: true,
        configurable: true
    });
    EntityInstance.prototype.setAttribute = function (attr, value, options) {
        if (options === void 0) { options = {}; }
        var internalName = "_" + attr;
        if (this[internalName] == value)
            return;
        this[internalName] = value;
        if (options.dontSetUpdate)
            return;
        var metaAttr = "." + attr;
        if (!this[metaAttr])
            this[metaAttr] = {};
        this[metaAttr].updated = true;
        this.oi.isUpdated = true;
        this.updated = true;
    };
    EntityInstance.prototype.getAttribute = function (attr) {
        return this["_" + attr];
    };
    EntityInstance.prototype.getChildEntityArray = function (entityName) {
        var entities = this.childEntityInstances[entityName];
        if (entities == undefined) {
            entities = new EntityArray(entityName, this.oi);
            this.childEntityInstances[entityName] = entities;
        }
        return entities;
    };
    EntityInstance.prototype.buildIncrementalStr = function () {
        var str = "";
        if (this.updated)
            str += 'U';
        if (this.created)
            str += 'C';
        if (this.deleted)
            str += 'D';
        if (this.included)
            str += 'I';
        if (this.excluded)
            str += 'X';
        return str;
    };
    EntityInstance.prototype.toJSON = function () {
        var json = {};
        var meta = {};
        var incrementals = this.buildIncrementalStr();
        if (incrementals != "")
            meta.incrementals = incrementals;
        if (Object.keys(meta).length > 0)
            json[".meta"] = meta;
        for (var attrName in this.attributeDefs) {
            if (this["_" + attrName] || this["." + attrName]) {
                json[attrName] = this["_" + attrName];
                if (this["." + attrName]) {
                    json["." + attrName] = this["." + attrName];
                }
            }
        }
        ;
        for (var entityName in this.entityDef.childEntities) {
            console.log("json entity = " + entityName);
            var entities = this.getChildEntityArray(entityName);
            if (entities.length == 0)
                continue;
            var entityInfo = this.entityDef.childEntities[entityName];
            if (entityInfo.cardMax == 1) {
                json[entityName] = entities[0].toJSON();
            }
            else {
                json[entityName] = entities.map(function (ei) { return ei.toJSON(); });
            }
        }
        return json;
    };
    return EntityInstance;
}());
exports.EntityInstance = EntityInstance;
;
var EntityArray = (function (_super) {
    __extends(EntityArray, _super);
    function EntityArray(entityName, oi) {
        _super.call(this);
        this.currentlySelected = 0;
        this.entityName = entityName;
        this.entityPrototype = oi.getPrototype(entityName);
        this.oi = oi;
    }
    /**
     * Create an entity at the end of the current entity list.
     */
    EntityArray.prototype.create = function (initialize, options) {
        if (initialize === void 0) { initialize = {}; }
        if (options === void 0) { options = {}; }
        console.log("Creating entity " + this.entityName);
        var ei = Object.create(this.entityPrototype);
        ei.constructor.apply(ei, [initialize, this.oi, options]);
        this.push(ei);
        this.currentlySelected = this.length - 1;
        return ei;
    };
    EntityArray.prototype.delete = function (index) {
        var entityDef = this.oi.getLodDef().entities[this.entityName];
        if (index == undefined)
            index = this.currentlySelected;
        if (!this.hiddenEntities)
            this.hiddenEntities = new Array();
        this.hiddenEntities.push(this[index]);
    };
    EntityArray.prototype.selected = function () {
        return this[this.currentlySelected];
    };
    return EntityArray;
}(Array));
exports.EntityArray = EntityArray;
//# sourceMappingURL=zeidon.js.map