"use strict";
var ZeidonEntityInstance = (function () {
    function ZeidonEntityInstance(initialize) {
        // List of attributes
        this.attributes = {};
        for (var attr in initialize) {
            this.setAttribute(attr, initialize[attr]);
        }
    }
    ZeidonEntityInstance.prototype.setAttribute = function (attr, value, setIncrementals) {
        if (setIncrementals === void 0) { setIncrementals = true; }
        console.log("----setting " + attr + " to " + value);
        this["." + attr] = true;
        this["_" + attr] = value;
    };
    ZeidonEntityInstance.prototype.getAttribute = function (attr) {
        return this["_" + attr];
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
//# sourceMappingURL=zeidon.entity.instance.js.map