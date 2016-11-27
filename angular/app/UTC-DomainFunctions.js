"use strict";
var zeidon_1 = require("./zeidon");
/**
 * User-written code to process domains.
 */
exports.UTC_DomainFunctions = {
    "com.quinsoft.zeidon.domains.BooleanDomain": {
        convertExternalValue: function (value, attributeDef) {
            if (attributeDef.required && value == undefined)
                throw new zeidon_1.AttributeValueError("Value is required.", attributeDef);
            switch (value) {
                case true:
                case false:
                    return value;
                case "true":
                    return true;
                case "false":
                    return false;
            }
            throw new zeidon_1.AttributeValueError("Invalid boolean value: " + value, attributeDef);
        }
    },
    "com.quinsoft.zeidon.domains.IntegerDomain": {
        convertExternalValue: function (value, attributeDef) {
            if (attributeDef.required && value == undefined)
                throw new zeidon_1.AttributeValueError("Value is required.", attributeDef);
            if (typeof value === 'number') {
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
            return value;
        }
    },
    "com.quinsoft.zeidon.domains.StringDomain": {
        convertExternalValue: function (value, attributeDef) {
            if (attributeDef.required && value == undefined)
                throw new zeidon_1.AttributeValueError("Value is required.", attributeDef);
            var str = value.toString();
            if (attributeDef.maxLength) {
                if (str.length > attributeDef.maxLength)
                    throw new zeidon_1.AttributeValueError("Length is longer than max string length: " + value, attributeDef);
                else if (str.length > attributeDef.domain.maxLength)
                    throw new zeidon_1.AttributeValueError("Length is longer than max string length: " + value, attributeDef);
            }
            return str;
        }
    },
};
//# sourceMappingURL=UTC-DomainFunctions.js.map