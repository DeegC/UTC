/*
  Generated from LOD TwitterConfig on 2017-05-11T23:42:22.936

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
// TwitterConfig LOD.
var TwitterConfig = (function (_super) {
    __extends(TwitterConfig, _super);
    function TwitterConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TwitterConfig.prototype.rootEntityName = function () { return "TwitterConfig"; };
    ;
    TwitterConfig.prototype.getApplicationName = function () { return "UTC"; };
    ;
    TwitterConfig.prototype.getPrototype = function (entityName) {
        return TwitterConfigEntityPrototypes[entityName];
    };
    TwitterConfig.prototype.getLodDef = function () {
        return exports.TwitterConfig_LodDef;
    };
    ;
    TwitterConfig.prototype.getDomain = function (name) {
        return UTC_DomainList_1.UTC_DomainList[name];
    };
    ;
    TwitterConfig.prototype.getDomainFunctions = function (name) {
        return UTC_DomainFunctions_1.UTC_DomainFunctions[name];
    };
    Object.defineProperty(TwitterConfig.prototype, "Twitter", {
        get: function () {
            return this.roots;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TwitterConfig.prototype, "Twitter$", {
        get: function () {
            return this.roots.selected();
        },
        enumerable: true,
        configurable: true
    });
    TwitterConfig.activate = function (qual) {
        return zeidon.ObjectInstance.activateOi(new TwitterConfig(), qual);
    };
    return TwitterConfig;
}(zeidon.ObjectInstance));
exports.TwitterConfig = TwitterConfig;
var TwitterConfig_Twitter = (function (_super) {
    __extends(TwitterConfig_Twitter, _super);
    function TwitterConfig_Twitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TwitterConfig_Twitter.prototype, "entityName", {
        get: function () { return "Twitter"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(TwitterConfig_Twitter.prototype, "Id", {
        get: function () { return this.getAttribute("Id"); },
        set: function (value) { this.setAttribute("Id", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(TwitterConfig_Twitter.prototype, "ConsumerKey", {
        get: function () { return this.getAttribute("ConsumerKey"); },
        set: function (value) { this.setAttribute("ConsumerKey", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(TwitterConfig_Twitter.prototype, "ConsumerSecret", {
        get: function () { return this.getAttribute("ConsumerSecret"); },
        set: function (value) { this.setAttribute("ConsumerSecret", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(TwitterConfig_Twitter.prototype, "AccessToken", {
        get: function () { return this.getAttribute("AccessToken"); },
        set: function (value) { this.setAttribute("AccessToken", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(TwitterConfig_Twitter.prototype, "AccessTokenSecret", {
        get: function () { return this.getAttribute("AccessTokenSecret"); },
        set: function (value) { this.setAttribute("AccessTokenSecret", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(TwitterConfig_Twitter.prototype, "Username", {
        get: function () { return this.getAttribute("Username"); },
        set: function (value) { this.setAttribute("Username", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(TwitterConfig_Twitter.prototype, "TweetPeriodInMinutes", {
        get: function () { return this.getAttribute("TweetPeriodInMinutes"); },
        set: function (value) { this.setAttribute("TweetPeriodInMinutes", value); },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return TwitterConfig_Twitter;
}(zeidon.EntityInstance));
exports.TwitterConfig_Twitter = TwitterConfig_Twitter;
var TwitterConfigEntityPrototypes = {
    Twitter: TwitterConfig_Twitter.prototype,
};
exports.TwitterConfig_LodDef = {
    name: "TwitterConfig",
    entities: {
        Twitter: {
            name: "Twitter",
            erToken: "905181370",
            create: true,
            cardMax: 0,
            hasInit: false,
            creatable: true,
            includable: false,
            deletable: true,
            excludable: false,
            updatable: true,
            parentDelete: true,
            childEntities: {},
            attributes: {
                Id: {
                    name: "Id",
                    hidden: false,
                    required: true,
                    domainName: "GeneratedKey",
                    persistent: true,
                    key: true,
                    update: true,
                    foreignKey: false,
                },
                ConsumerKey: {
                    name: "ConsumerKey",
                    hidden: false,
                    required: false,
                    domainName: "Text",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                ConsumerSecret: {
                    name: "ConsumerSecret",
                    hidden: false,
                    required: false,
                    domainName: "Text",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                AccessToken: {
                    name: "AccessToken",
                    hidden: false,
                    required: false,
                    domainName: "Text",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                AccessTokenSecret: {
                    name: "AccessTokenSecret",
                    hidden: false,
                    required: false,
                    domainName: "Text",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                Username: {
                    name: "Username",
                    hidden: false,
                    required: false,
                    domainName: "Text",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
                TweetPeriodInMinutes: {
                    name: "TweetPeriodInMinutes",
                    hidden: false,
                    required: false,
                    domainName: "Integer",
                    persistent: true,
                    key: false,
                    update: true,
                    foreignKey: false,
                },
            }
        },
    }
};
//# sourceMappingURL=TwitterConfig.js.map