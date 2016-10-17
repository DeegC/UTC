"use strict";
var ZeidonObjectInstance = (function () {
    function ZeidonObjectInstance(initialize) {
        this.roots = [];
        var root = this.createEntity(this.rootEntityName(), initialize);
        this.roots.push(root);
    }
    ZeidonObjectInstance.prototype.createEntity = function (entityName, initialize) {
        var proto = this.getPrototype(entityName);
        var ei = Object.create(proto);
        ei.constructor.apply(ei, [initialize, this]);
        return ei;
    };
    ZeidonObjectInstance.prototype.oiName = function () { throw "oiName must be overridden"; };
    ;
    ZeidonObjectInstance.prototype.rootEntityName = function () { throw "rootEntityName must be overridden"; };
    ;
    ZeidonObjectInstance.prototype.getPrototype = function (entityName) { throw "getPrototype must be overriden"; };
    ;
    return ZeidonObjectInstance;
}());
exports.ZeidonObjectInstance = ZeidonObjectInstance;
//# sourceMappingURL=zeidon.object.instance.js.map