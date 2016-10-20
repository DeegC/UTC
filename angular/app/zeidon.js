"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ObjectInstance = (function () {
    function ObjectInstance(initialize, options) {
        if (initialize === void 0) { initialize = undefined; }
        if (options === void 0) { options = {}; }
        this.isUpdated = false;
        if (typeof initialize == "string") {
            initialize = JSON.parse(initialize);
        }
        this.roots = new EntityArray(this.rootEntityName(), this);
        if (initialize.constructor === Array) {
            for (var _i = 0, initialize_1 = initialize; _i < initialize_1.length; _i++) {
                var i = initialize_1[_i];
                this.roots.create(i);
            }
        }
        else {
            this.roots.create(initialize);
        }
    }
    ObjectInstance.prototype.rootEntityName = function () { throw "rootEntityName must be overridden"; };
    ;
    ObjectInstance.prototype.getPrototype = function (entityName) { throw "getPrototype must be overriden"; };
    ;
    ObjectInstance.prototype.getLodDef = function () { throw "getLodDef must be overridden"; };
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
    return ObjectInstance;
}());
exports.ObjectInstance = ObjectInstance;
var EntityInstance = (function () {
    function EntityInstance(initialize, oi, options) {
        if (options === void 0) { options = {}; }
        this.childEntityInstances = {};
        this.oi = oi;
        for (var attr in initialize) {
            if (this.attributeDefs[attr])
                this.setAttribute(attr, initialize[attr], options);
            else if (this.entityDef.childEntities[attr]) {
                var init = initialize[attr];
                if (!(init.constructor === Array)) {
                    init = [init]; // If it's not an array, wrap it.
                }
                for (var _i = 0, init_1 = init; _i < init_1.length; _i++) {
                    var o = init_1[_i];
                    var array = this.getChildEntityArray(attr);
                    array.create(o);
                }
            }
            else
                throw "Unknown initial value " + attr;
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
        this["." + attr] = true;
        this[internalName] = value;
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
    EntityInstance.prototype.toJSON = function () {
        var json = {};
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
    EntityArray.prototype.create = function (initialize) {
        if (initialize === void 0) { initialize = {}; }
        console.log("Creating entity " + this.entityName);
        var ei = Object.create(this.entityPrototype);
        ei.constructor.apply(ei, [initialize, this.oi]);
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