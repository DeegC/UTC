"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ZeidonEntityInstance = (function () {
    function ZeidonEntityInstance(initialize, oi) {
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
    Object.defineProperty(ZeidonEntityInstance.prototype, "attributes", {
        get: function () { throw "attributes() but be overridden"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ZeidonEntityInstance.prototype, "childEntities", {
        get: function () { throw "childEntities() but be overridden"; },
        enumerable: true,
        configurable: true
    });
    ;
    ZeidonEntityInstance.prototype.createEmptyEntityArray = function () {
        throw "createEmptyEntityArray must be overridden";
    };
    ZeidonEntityInstance.prototype.setAttribute = function (attr, value, setIncrementals) {
        if (setIncrementals === void 0) { setIncrementals = true; }
        console.log("----setting " + attr + " to " + value);
        this["." + attr] = true;
        this["_" + attr] = value;
    };
    ZeidonEntityInstance.prototype.getAttribute = function (attr) {
        return this["_" + attr];
    };
    ZeidonEntityInstance.prototype.getChildEntities = function (entityName) {
        var entities = this.childEntityInstances[entityName];
        if (entities == undefined) {
            entities = this.createEmptyEntityArray();
            entities.oi = this.oi;
            this.childEntityInstances[entityName] = entities;
        }
        return entities;
    };
    ZeidonEntityInstance.prototype.toJSON = function () {
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
    return ZeidonEntityInstance;
}());
exports.ZeidonEntityInstance = ZeidonEntityInstance;
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
//# sourceMappingURL=zeidon.entity.instance.js.map