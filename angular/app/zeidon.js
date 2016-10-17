"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ObjectInstance = (function () {
    function ObjectInstance(initialize, options) {
        if (initialize === void 0) { initialize = []; }
        if (options === void 0) { options = {}; }
        this.roots = new Array();
        this.isUpdated = false;
        var root = this.createEntity(this.rootEntityName(), initialize, options);
        this.roots.push(root);
    }
    ObjectInstance.prototype.createEntity = function (entityName, initialize, options) {
        var proto = this.getPrototype(entityName);
        var ei = Object.create(proto);
        ei.constructor.apply(ei, [initialize, this, options]);
        return ei;
    };
    ObjectInstance.prototype.rootEntityName = function () { throw "rootEntityName must be overridden"; };
    ;
    ObjectInstance.prototype.getPrototype = function (entityName) { throw "getPrototype must be overriden"; };
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
    return ObjectInstance;
}());
exports.ObjectInstance = ObjectInstance;
var EntityInstance = (function () {
    function EntityInstance(initialize, oi, options) {
        if (options === void 0) { options = {}; }
        this.childEntityInstances = {};
        this.oi = oi;
        for (var attr in initialize) {
            if (this.attributes[attr])
                this.setAttribute(attr, initialize[attr], options);
            else if (this.childEntities[attr]) {
                var init = initialize[attr];
                if (!(init.constructor === Array)) {
                    init = [init]; // If it's not an arry, wrap it.
                }
                for (var _i = 0, init_1 = init; _i < init_1.length; _i++) {
                    var o = init_1[_i];
                    var array = this.getChildEntities(attr);
                    array.create(o);
                }
            }
            else
                throw "Unknown initial value " + attr;
        }
    }
    Object.defineProperty(EntityInstance.prototype, "attributes", {
        get: function () { throw "attributes() but be overridden"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(EntityInstance.prototype, "childEntities", {
        get: function () { throw "childEntities() but be overridden"; },
        enumerable: true,
        configurable: true
    });
    ;
    EntityInstance.prototype.setAttribute = function (attr, value, options) {
        if (options === void 0) { options = {}; }
        console.log("----setting " + attr + " to " + value);
        var internalName = "_" + attr;
        if (this[internalName] == value)
            return;
        this["." + attr] = true;
        this[internalName] = value;
    };
    EntityInstance.prototype.getAttribute = function (attr) {
        return this["_" + attr];
    };
    EntityInstance.prototype.getChildEntities = function (entityName) {
        var entities = this.childEntityInstances[entityName];
        if (entities == undefined) {
            entities = new EntityArray(entityName, this.oi);
            this.childEntityInstances[entityName] = entities;
        }
        return entities;
    };
    EntityInstance.prototype.toJSON = function () {
        console.log("json attributes = " + this.attributes);
        var json = {};
        for (var fieldName in this.attributes) {
            if (this["_" + fieldName] || this["." + fieldName]) {
                json[fieldName] = this["_" + fieldName];
                if (this["." + fieldName]) {
                    json["." + fieldName] = this["." + fieldName];
                }
            }
        }
        ;
        for (var entityName in this.childEntities) {
            console.log("json entity = " + entityName);
            var entities = this.getChildEntities(entityName);
            if (entities.length == 0)
                continue;
            var entityInfo = this.childEntities[entityName];
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
        this.entityName = entityName;
        this.entityPrototype = oi.getPrototype(entityName);
        this.oi = oi;
    }
    EntityArray.prototype.create = function (initialize) {
        if (initialize === void 0) { initialize = {}; }
        console.log("Creating entity " + this.entityName);
        var ei = Object.create(this.entityPrototype);
        ei.constructor.apply(ei, [initialize]);
        this.push(ei);
        return ei;
    };
    return EntityArray;
}(Array));
exports.EntityArray = EntityArray;
//# sourceMappingURL=zeidon.js.map