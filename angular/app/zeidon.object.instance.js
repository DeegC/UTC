//import { ZeidonEntityInstance } from './zeidon.entity.instance';
"use strict";
var ZeidonObjectInstance = (function () {
    function ZeidonObjectInstance(initialize) {
        this.roots = [];
        var rootEntityName = this.oiName() + "_" + this.rootEntityName();
        var proto = this.getPrototype(this.rootEntityName());
        var root = Object.create(proto);
        root.constructor.apply(root, [initialize]);
        this.roots.push(root);
    }
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