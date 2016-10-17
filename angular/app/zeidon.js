"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ObjectInstance = (function () {
    function ObjectInstance(initialize) {
        this.roots = [];
        var root = this.createEntity(this.rootEntityName(), initialize);
        this.roots.push(root);
    }
    ObjectInstance.prototype.createEntity = function (entityName, initialize) {
        var proto = this.getPrototype(entityName);
        var ei = Object.create(proto);
        ei.constructor.apply(ei, [initialize, this]);
        return ei;
    };
    ObjectInstance.prototype.rootEntityName = function () { throw "rootEntityName must be overridden"; };
    ;
    ObjectInstance.prototype.getPrototype = function (entityName) { throw "getPrototype must be overriden"; };
    ;
    return ObjectInstance;
}());
exports.ObjectInstance = ObjectInstance;
var EntityInstance = (function () {
    function EntityInstance(initialize, oi) {
        this.childEntityInstances = {};
        this.oi = oi;
        for (var attr in initialize) {
            if (this.attributes[attr])
                this.setAttribute(attr, initialize[attr]);
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
    EntityInstance.prototype.createEmptyEntityArray = function () {
        throw "createEmptyEntityArray must be overridden";
    };
    EntityInstance.prototype.setAttribute = function (attr, value, setIncrementals) {
        if (setIncrementals === void 0) { setIncrementals = true; }
        console.log("----setting " + attr + " to " + value);
        this["." + attr] = true;
        this["_" + attr] = value;
    };
    EntityInstance.prototype.getAttribute = function (attr) {
        return this["_" + attr];
    };
    EntityInstance.prototype.getChildEntities = function (entityName) {
        var entities = this.childEntityInstances[entityName];
        if (entities == undefined) {
            entities = this.createEmptyEntityArray();
            entities.oi = this.oi;
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
        return json;
    };
    return EntityInstance;
}());
exports.EntityInstance = EntityInstance;
;
var EntityArray = (function (_super) {
    __extends(EntityArray, _super);
    function EntityArray() {
        _super.apply(this, arguments);
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