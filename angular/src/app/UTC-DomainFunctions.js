"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var zeidon_1 = require("./zeidon");
var BaseDomainFunctions = (function () {
    function BaseDomainFunctions() {
    }
    BaseDomainFunctions.prototype.checkForRequiredValue = function (value, attributeDef) {
        if (attributeDef.required && (value == undefined || value === ""))
            throw new zeidon_1.AttributeValueError("Value is required.", attributeDef);
    };
    BaseDomainFunctions.prototype.convertExternalValue = function (value, attributeDef, context) {
        this.checkForRequiredValue(value, attributeDef);
        return value;
    };
    return BaseDomainFunctions;
}());
exports.BaseDomainFunctions = BaseDomainFunctions;
var StringDomainFunctions = (function (_super) {
    __extends(StringDomainFunctions, _super);
    function StringDomainFunctions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringDomainFunctions.prototype.convertExternalValue = function (value, attributeDef, context) {
        this.checkForRequiredValue(value, attributeDef);
        if (value == undefined)
            return undefined;
        var str = value.toString();
        if (attributeDef.maxLength) {
            if (str.length > attributeDef.maxLength)
                throw new zeidon_1.AttributeValueError("Length is longer than max string length: " + value, attributeDef);
            else if (str.length > attributeDef.domain.maxLength)
                throw new zeidon_1.AttributeValueError("Length is longer than max string length: " + value, attributeDef);
        }
        return str;
    };
    return StringDomainFunctions;
}(BaseDomainFunctions));
exports.StringDomainFunctions = StringDomainFunctions;
var IntegerDomainFunctions = (function (_super) {
    __extends(IntegerDomainFunctions, _super);
    function IntegerDomainFunctions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntegerDomainFunctions.prototype.convertExternalValue = function (value, attributeDef, context) {
        this.checkForRequiredValue(value, attributeDef);
        if (value == undefined)
            return undefined;
        if (typeof value === 'number') {
            // Do nothing atm.
        }
        else if (typeof value === 'string') {
            var v = Number(value);
            if (isNaN(v)) {
                throw new zeidon_1.AttributeValueError("Invalid integer value: " + value, attributeDef);
            }
            value = v;
        }
        else {
            throw new zeidon_1.AttributeValueError("Invalid integer value: " + value, attributeDef);
        }
        if (!Number.isInteger(value))
            throw new zeidon_1.AttributeValueError("Invalid integer value: " + value, attributeDef);
        return value;
    };
    return IntegerDomainFunctions;
}(BaseDomainFunctions));
exports.IntegerDomainFunctions = IntegerDomainFunctions;
var BooleanDomainFunctions = (function (_super) {
    __extends(BooleanDomainFunctions, _super);
    function BooleanDomainFunctions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BooleanDomainFunctions.prototype.convertExternalValue = function (value, attributeDef, context) {
        this.checkForRequiredValue(value, attributeDef);
        switch (value) {
            case true:
            case false:
                return value;
            case "true":
                return true;
            case "false":
                return false;
            case null:
            case "":
            case undefined:
                return undefined;
        }
        throw new zeidon_1.AttributeValueError("Invalid boolean value: " + value, attributeDef);
    };
    return BooleanDomainFunctions;
}(BaseDomainFunctions));
exports.BooleanDomainFunctions = BooleanDomainFunctions;
var DoubleDomainFunctions = (function (_super) {
    __extends(DoubleDomainFunctions, _super);
    function DoubleDomainFunctions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DoubleDomainFunctions.prototype.convertExternalValue = function (value, attributeDef, context) {
        this.checkForRequiredValue(value, attributeDef);
        if (value == undefined)
            return undefined;
        if (typeof value === 'number') {
            // Do nothing atm.
        }
        else if (typeof value === 'string') {
            var v = Number(value);
            if (isNaN(v)) {
                throw new zeidon_1.AttributeValueError("Invalid double value: " + value, attributeDef);
            }
            value = v;
        }
        else {
            throw new zeidon_1.AttributeValueError("Invalid double value: " + value, attributeDef);
        }
        return value;
    };
    return DoubleDomainFunctions;
}(BaseDomainFunctions));
exports.DoubleDomainFunctions = DoubleDomainFunctions;
var xxxDomainFunctions = (function (_super) {
    __extends(xxxDomainFunctions, _super);
    function xxxDomainFunctions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    xxxDomainFunctions.prototype.convertExternalValue = function (value, attributeDef, context) {
        this.checkForRequiredValue(value, attributeDef);
        return value;
    };
    return xxxDomainFunctions;
}(BaseDomainFunctions));
exports.xxxDomainFunctions = xxxDomainFunctions;
exports.UTC_DomainFunctions = {
    "com.quinsoft.zeidon.domains.BooleanDomain": new BooleanDomainFunctions(),
    "com.quinsoft.zeidon.domains.IntegerDomain": new IntegerDomainFunctions(),
    "com.quinsoft.zeidon.domains.StringDomain": new StringDomainFunctions(),
    "com.quinsoft.zeidon.domains.DoubleDomain": new DoubleDomainFunctions(),
};
//# sourceMappingURL=UTC-DomainFunctions.js.map