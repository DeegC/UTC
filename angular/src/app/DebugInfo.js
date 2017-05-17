/*
  Generated from LOD DebugInfo on 2017-05-11T23:42:22.928

*/
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
var zeidon = require("./zeidon");
var UTC_DomainList_1 = require("./UTC-DomainList");
var UTC_DomainFunctions_1 = require("./UTC-DomainFunctions");
// DebugInfo LOD.
var DebugInfo = (function (_super) {
    __extends(DebugInfo, _super);
    function DebugInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DebugInfo.prototype.rootEntityName = function () { return "DebugInfo"; };
    ;
    DebugInfo.prototype.getApplicationName = function () { return "UTC"; };
    ;
    DebugInfo.prototype.getPrototype = function (entityName) {
        return DebugInfoEntityPrototypes[entityName];
    };
    DebugInfo.prototype.getLodDef = function () {
        return exports.DebugInfo_LodDef;
    };
    ;
    DebugInfo.prototype.getDomain = function (name) {
        return UTC_DomainList_1.UTC_DomainList[name];
    };
    ;
    DebugInfo.prototype.getDomainFunctions = function (name) {
        return UTC_DomainFunctions_1.UTC_DomainFunctions[name];
    };
    Object.defineProperty(DebugInfo.prototype, "DebugInfo", {
        get: function () {
            return this.roots;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugInfo.prototype, "DebugInfo$", {
        get: function () {
            return this.roots.selected();
        },
        enumerable: true,
        configurable: true
    });
    DebugInfo.activate = function (qual) {
        return zeidon.ObjectInstance.activateOi(new DebugInfo(), qual);
    };
    return DebugInfo;
}(zeidon.ObjectInstance));
exports.DebugInfo = DebugInfo;
var DebugInfo_DebugInfo = (function (_super) {
    __extends(DebugInfo_DebugInfo, _super);
    function DebugInfo_DebugInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DebugInfo_DebugInfo.prototype, "entityName", {
        get: function () { return "DebugInfo"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DebugInfo_DebugInfo.prototype, "File", {
        get: function () {
            return this.getChildEntityArray("File");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DebugInfo_DebugInfo.prototype, "File$", {
        get: function () {
            return this.getChildEntityArray("File").selected();
        },
        enumerable: true,
        configurable: true
    });
    return DebugInfo_DebugInfo;
}(zeidon.EntityInstance));
exports.DebugInfo_DebugInfo = DebugInfo_DebugInfo;
var DebugInfo_File = (function (_super) {
    __extends(DebugInfo_File, _super);
    function DebugInfo_File() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DebugInfo_File.prototype, "entityName", {
        get: function () { return "File"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(DebugInfo_File.prototype, "Name", {
        get: function () { return this.getAttribute("Name"); },
        set: function (value) { this.setAttribute("Name", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(DebugInfo_File.prototype, "Size", {
        get: function () { return this.getAttribute("Size"); },
        set: function (value) { this.setAttribute("Size", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return DebugInfo_File;
}(zeidon.EntityInstance));
exports.DebugInfo_File = DebugInfo_File;
var DebugInfoEntityPrototypes = {
    DebugInfo: DebugInfo_DebugInfo.prototype,
    File: DebugInfo_File.prototype,
};
exports.DebugInfo_LodDef = {
    name: "DebugInfo",
    entities: {
        DebugInfo: {
            name: "DebugInfo",
            erToken: "316000031",
            create: true,
            cardMax: 0,
            hasInit: false,
            creatable: true,
            includable: false,
            deletable: true,
            excludable: false,
            updatable: true,
            parentDelete: true,
            childEntities: {
                File: {},
            },
            attributes: {}
        },
        File: {
            name: "File",
            erToken: "316000032",
            create: true,
            cardMax: 999999,
            hasInit: false,
            creatable: true,
            includable: false,
            deletable: true,
            excludable: false,
            updatable: true,
            parentDelete: true,
            childEntities: {},
            attributes: {
                Name: {
                    name: "Name",
                    hidden: false,
                    required: false,
                    domainName: "Text",
                    persistent: false,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Size: {
                    name: "Size",
                    hidden: false,
                    required: false,
                    domainName: "Text",
                    persistent: false,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
            }
        },
    }
};
//# sourceMappingURL=DebugInfo.js.map