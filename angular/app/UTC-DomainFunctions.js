"use strict";
var zeidon_1 = require("./zeidon");
exports.UTC_DomainFunctions = {
    "com.quinsoft.zeidon.domains.BooleanDomain": {
        convertExternalValue: function (value, attributeDef, domain) {
            switch (value) {
                case true:
                case false:
                    return value;
                case "true":
                    return true;
                case "false":
                    return false;
            }
            throw new zeidon_1.AttributeValueError("Unknown boolean value " + value, attributeDef);
        }
    }
};
//# sourceMappingURL=UTC-DomainFunctions.js.map