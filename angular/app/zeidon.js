"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var configurationInstance = undefined;
var Application = (function () {
    function Application(lodDefs) {
        this.lodDefs = lodDefs;
    }
    return Application;
}());
exports.Application = Application;
var ObjectInstance = (function () {
    function ObjectInstance(initialize, options) {
        if (initialize === void 0) { initialize = undefined; }
        if (options === void 0) { options = DEFAULT_CREATE_OPTIONS; }
        this.isUpdated = false;
        this.createFromJson(initialize, options);
    }
    ObjectInstance.prototype.rootEntityName = function () { throw "rootEntityName must be overridden"; };
    ;
    ObjectInstance.prototype.getPrototype = function (entityName) { throw "getPrototype must be overriden"; };
    ;
    ObjectInstance.prototype.getLodDef = function () { throw "getLodDef must be overridden"; };
    ;
    ObjectInstance.prototype.getApplicationName = function () { throw "getApplicationName must be overriden"; };
    ;
    ObjectInstance.prototype.toJSON = function () {
        console.log("JSON for Configuration OI");
        var jarray = [];
        for (var _i = 0, _a = this.roots.allEntities(); _i < _a.length; _i++) {
            var root = _a[_i];
            jarray.push(root.toJSON());
        }
        ;
        var json = {};
        json[this.rootEntityName()] = jarray;
        return json;
    };
    /**
     * Wrap the JSON for this object with Zeidon OI meta.  Used for committing.
     */
    ObjectInstance.prototype.toZeidonMeta = function () {
        var wrapper = {
            ".meta": { version: "1" },
            OIs: [{
                    ".oimeta": {
                        application: this.getApplicationName(),
                        odName: this.getLodDef().name,
                        incremental: true,
                        readOnlyOi: false
                    }
                }]
        };
        // Add the OI.
        wrapper.OIs[0][this.getLodDef().name] = this.toJSON()[this.getLodDef().name];
        return wrapper;
    };
    ObjectInstance.activateOi = function (oi, options) {
        var config = configurationInstance;
        if (!config)
            error("ZeidonConfiguration not properly initiated.");
        return config.getActivator().activateOi(oi, options);
    };
    ObjectInstance.prototype.commit = function (options) {
        var config = configurationInstance;
        if (!config)
            error("ZeidonConfiguration not properly initiated.");
        return config.getCommitter().commitOi(this, options);
    };
    ObjectInstance.prototype.createFromJson = function (initialize, options) {
        if (typeof initialize == "string") {
            initialize = JSON.parse(initialize);
        }
        this.roots = new EntityArray(this.rootEntityName(), this);
        if (!initialize) {
            this.roots.create(initialize, options);
        }
        else if (initialize.OIs) {
            // TODO: Someday we should handle multiple return OIs for for now
            // we'll assume just one and hardcode '[0]'.
            var oimeta = initialize.OIs[0][".oimeta"];
            // If incrementals are set then set the constructor option to 
            // not set the update flag when the attribute value is set.  The
            // flags will be set by the incrementals.
            if (oimeta && oimeta.incremental) {
                if (options.incrementalsSpecified == undefined) {
                    // We're going to change the options so create a new one so we
                    // don't override the original one.
                    options = options.clone();
                    options.incrementalsSpecified = true;
                }
            }
            for (var _i = 0, _a = initialize.OIs[0][this.rootEntityName()]; _i < _a.length; _i++) {
                var i = _a[_i];
                this.roots.create(i, options);
            }
        }
        else if (initialize.constructor === Array) {
            for (var _b = 0, initialize_1 = initialize; _b < initialize_1.length; _b++) {
                var i = initialize_1[_b];
                this.roots.create(i, options);
            }
        }
        else {
            this.roots.create(initialize, options);
        }
        return this;
    };
    ObjectInstance.prototype.handleActivateError = function (e) {
        console.log("There was an error: " + e);
    };
    return ObjectInstance;
}());
exports.ObjectInstance = ObjectInstance;
var EntityInstance = (function () {
    function EntityInstance(initialize, oi, parentArray, options) {
        if (options === void 0) { options = DEFAULT_CREATE_OPTIONS; }
        this.created = false;
        this.included = false;
        this.deleted = false;
        this.excluded = false;
        this.updated = false;
        this.attributes = {};
        this.workAttributes = {};
        // If incomplete = true then this entity did not have all its children
        // loaded and so cannot be deleted.
        this.incomplete = false;
        // Map of child entities and the array associated with each one.
        // Key: entityName
        // Value: EntityArray.
        this.childEntityInstances = {};
        this.oi = oi;
        this.parentArray = parentArray;
        for (var attr in initialize) {
            if (this.attributeDefs[attr]) {
                this.setAttribute(attr, initialize[attr], options);
                continue;
            }
            if (this.entityDef.childEntities[attr]) {
                var init = initialize[attr];
                if (!(init.constructor === Array)) {
                    init = [init]; // If it's not an array, wrap it.
                }
                for (var _i = 0, init_1 = init; _i < init_1.length; _i++) {
                    var o = init_1[_i];
                    var array = this.getChildEntityArray(attr);
                    array.create(o, options);
                }
                continue;
            }
            if (attr == ".meta") {
                var meta = initialize[attr];
                if (meta.incremntal)
                    options.incrementalsSpecified = true;
                if (meta.readOnlyOi)
                    options.readOnlyOi = true;
                continue;
            }
            if (attr.startsWith(".")) {
                var metaName = attr.substr(1); // Remove leading "."
                if (this.attributeDefs[metaName]) {
                    var attribs = this.getAttribHash(metaName);
                    attribs[attr] = initialize[attr];
                    continue;
                }
            }
            error("Unknown attribute " + attr + " for entity " + this.entityName);
        }
    }
    Object.defineProperty(EntityInstance.prototype, "entityName", {
        get: function () { throw "entityName() but be overridden"; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(EntityInstance.prototype, "entityDef", {
        get: function () { return this.oi.getLodDef().entities[this.entityName]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityInstance.prototype, "attributeDefs", {
        get: function () { return this.entityDef.attributes; },
        enumerable: true,
        configurable: true
    });
    EntityInstance.prototype.setAttribute = function (attr, value, options) {
        if (options === void 0) { options = DEFAULT_CREATE_OPTIONS; }
        //    console.log( `Setting attribute ${attr}`)
        var attributeDef = this.attributeDefs[attr];
        if (!attributeDef)
            error("Attribute " + attr + " is unknown for entity " + this.entityDef.name);
        // Perform some validations unless incrementals are specified.
        if (!options.incrementalsSpecified) {
            if (!attributeDef.update)
                error("Attribute " + this.entityDef.name + "." + attr + " is read only");
            if (this.deleted || this.excluded)
                error("Can't set attribute for hidden EntityInstance: " + this.entityDef.name + "." + attr);
        }
        var attribs = this.getAttribHash(attr);
        if (attribs[attr] == value)
            return;
        attribs[attr] = value;
        if (options.incrementalsSpecified)
            return;
        var metaAttr = "." + attr;
        if (!attribs[metaAttr])
            attribs[metaAttr] = {};
        attribs[metaAttr].updated = true;
        this.oi.isUpdated = true;
        this.updated = true;
    };
    EntityInstance.prototype.getAttribute = function (attr) {
        var attribs = this.getAttribHash(attr);
        return attribs[attr];
    };
    EntityInstance.prototype.isAttributeUpdated = function (attr) {
        var attribs = this.getAttribHash(attr);
        var metaName = "." + attr;
        return (attribs[metaName] && attribs[metaName].updated);
    };
    EntityInstance.prototype.getAttribHash = function (attr) {
        // TODO: This should return attributes or workAttributes.
        var attributeDef = this.attributeDefs[attr];
        if (attributeDef.persistent)
            return this.attributes;
        else
            return this.workAttributes;
    };
    EntityInstance.prototype.getChildEntityArray = function (entityName) {
        var entities = this.childEntityInstances[entityName];
        if (entities == undefined) {
            entities = new EntityArray(entityName, this.oi);
            this.childEntityInstances[entityName] = entities;
        }
        return entities;
    };
    EntityInstance.prototype.delete = function () {
        var _this = this;
        var idx = this.parentArray.findIndex(function (ei) { return ei === _this; });
        this.parentArray.delete(idx);
    };
    EntityInstance.prototype.buildIncrementalStr = function () {
        var str = "";
        if (this.updated)
            str += 'U';
        if (this.created)
            str += 'C';
        if (this.deleted)
            str += 'D';
        if (this.included)
            str += 'I';
        if (this.excluded)
            str += 'X';
        return str;
    };
    EntityInstance.prototype.toJSON = function () {
        var json = {};
        var meta = {};
        var incrementals = this.buildIncrementalStr();
        if (incrementals != "")
            meta.incrementals = incrementals;
        if (Object.keys(meta).length > 0)
            json[".meta"] = meta;
        for (var attrName in this.attributeDefs) {
            if (this.getAttribute(attrName) || this.isAttributeUpdated(attrName)) {
                json[attrName] = this.getAttribute(attrName);
                if (this.isAttributeUpdated(attrName)) {
                    json["." + attrName] = { updated: true };
                }
            }
        }
        ;
        for (var entityName in this.entityDef.childEntities) {
            console.log("json entity = " + entityName);
            var entities = this.getChildEntityArray(entityName).allEntities();
            if (entities.length == 0)
                continue;
            var entityInfo = this.entityDef.childEntities[entityName];
            if (entityInfo.cardMax == 1) {
                json[entityName] = entities[0].toJSON();
            }
            else {
                json[entityName] = entities.map(function (ei) { return ei.toJSON(); });
            }
        }
        return json;
    };
    return EntityInstance;
}());
exports.EntityInstance = EntityInstance;
;
var EntityArray = (function (_super) {
    __extends(EntityArray, _super);
    function EntityArray(entityName, oi) {
        _super.call(this);
        this.currentlySelected = 0;
        this.entityName = entityName;
        this.oi = oi;
    }
    Object.defineProperty(EntityArray.prototype, "entityDef", {
        get: function () { return this.oi.getLodDef().entities[this.entityName]; },
        enumerable: true,
        configurable: true
    });
    /**
     * Create an entity at the end of the current entity list.
     */
    EntityArray.prototype.create = function (initialize, options) {
        if (initialize === void 0) { initialize = {}; }
        if (options === void 0) { options = DEFAULT_CREATE_OPTIONS; }
        //    console.log("Creating entity " + this.entityName );
        var ei = Object.create(this.oi.getPrototype(this.entityName));
        ei.constructor.apply(ei, [initialize, this.oi, options]);
        this.push(ei);
        this.currentlySelected = this.length - 1;
        return ei;
    };
    EntityArray.prototype.validateExclude = function () {
        if (!this.entityDef.excludable)
            error("Entity " + this.entityDef.name + " does not have delete authority.");
    };
    EntityArray.prototype.excludeAll = function () {
        this.validateExclude();
        if (_super.prototype.length == 0)
            return;
        this.hiddenEntities = this.hiddenEntities.concat(this);
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var ei = _a[_i];
            ei.excluded = true;
        }
        this.oi.isUpdated = true;
        _super.prototype.length = 0;
    };
    EntityArray.prototype.validateDelete = function () {
        if (!this.entityDef.deletable)
            error("Entity " + this.entityDef.name + " does not have delete authority.");
    };
    EntityArray.prototype.deleteAll = function () {
        this.validateDelete();
        if (_super.prototype.length == 0)
            return;
        this.hiddenEntities = this.hiddenEntities.concat(this);
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var ei = _a[_i];
            this.deleteEntity(ei);
        }
        _super.prototype.length = 0;
    };
    EntityArray.prototype.delete = function (index) {
        this.validateDelete();
        if (index == undefined)
            index = this.currentlySelected;
        if (!this.hiddenEntities)
            this.hiddenEntities = new Array();
        var ei = this.splice(index, 1)[0];
        this.hiddenEntities.push(ei);
        this.deleteEntity(ei);
    };
    EntityArray.prototype.deleteEntity = function (ei) {
        ei.deleted = true;
        ei.oi.isUpdated = true;
        var entityDef = ei.entityDef;
        for (var _i = 0, _a = entityDef.childEntities; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.parentDelete)
                ei.getChildEntityArray(entityDef.name).deleteAll();
            else
                ei.getChildEntityArray(entityDef.name).excludeAll();
        }
    };
    EntityArray.prototype.selected = function () {
        return this[this.currentlySelected];
    };
    /**
     * Returns all entity instances, including hidden ones.
     */
    EntityArray.prototype.allEntities = function () {
        return this.concat(this.hiddenEntities);
    };
    return EntityArray;
}(Array));
exports.EntityArray = EntityArray;
var OptionsConstructor = (function () {
    function OptionsConstructor(initialize) {
        if (initialize === void 0) { initialize = undefined; }
        for (var i in initialize) {
            this[i] = initialize[i];
        }
    }
    OptionsConstructor.prototype.toString = function () {
        return JSON.stringify(this);
    };
    // Quick and easy way to create a new instance of options with same values.
    OptionsConstructor.prototype.clone = function () {
        var proto = Object.getPrototypeOf(this);
        var options = Object.create(proto);
        options.constructor.apply(options, [this]);
        return options;
    };
    return OptionsConstructor;
}());
var CreateOptions = (function (_super) {
    __extends(CreateOptions, _super);
    function CreateOptions() {
        _super.apply(this, arguments);
        this.incrementalsSpecified = undefined;
        this.readOnlyOi = false;
    }
    return CreateOptions;
}(OptionsConstructor));
exports.CreateOptions = CreateOptions;
var DEFAULT_CREATE_OPTIONS = new CreateOptions({ incrementalsSpecified: false, readOnlyOi: false });
var Activator = (function () {
    function Activator() {
    }
    Activator.prototype.activateOi = function (oi, options) {
        throw "activateOi has not been implemented";
    };
    Activator = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Activator);
    return Activator;
}());
exports.Activator = Activator;
var RestActivator = (function () {
    function RestActivator(values, http) {
        this.values = values;
        this.http = http;
    }
    RestActivator.prototype.activateOi = function (oi, options) {
        if (options == undefined)
            options = new ActivateOptions();
        var lodName = oi.getLodDef().name;
        var errorHandler = oi.handleActivateError;
        var url = this.values.restUrl + "/" + lodName;
        if (options.id) {
            url = url + "/" + options.id; // Add the id to the URL.
            return this.http.get(url)
                .toPromise()
                .then(function (response) { return oi.createFromJson(response.json(), DEFAULT_CREATE_OPTIONS); })
                .catch(errorHandler);
        }
        // If we get here there's no qualification.  Set rootOnly if it's not.
        if (options.rootOnly == undefined) {
            options = options.clone();
            options.rootOnly = true;
        }
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return oi.createFromJson(response.json(), DEFAULT_CREATE_OPTIONS); })
            .catch(errorHandler);
    };
    RestActivator = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ZeidonRestValues, http_1.Http])
    ], RestActivator);
    return RestActivator;
}());
exports.RestActivator = RestActivator;
var Committer = (function () {
    function Committer() {
    }
    Committer.prototype.commitOi = function (oi, options) {
        throw "commitOi has not been implemented";
    };
    Committer = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Committer);
    return Committer;
}());
exports.Committer = Committer;
var RestCommitter = (function () {
    function RestCommitter(values, http) {
        this.values = values;
        this.http = http;
    }
    RestCommitter.prototype.commitOi = function (oi, options) {
        var _this = this;
        var lodName = oi.getLodDef().name;
        var body = JSON.stringify(oi.toZeidonMeta());
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var reqOptions = new http_1.RequestOptions({ headers: headers });
        var errorHandler = oi.handleActivateError;
        var url = this.values.restUrl + "/" + lodName;
        return this.http.post(url, body, reqOptions)
            .toPromise()
            .then(function (response) { return _this.parseCommitResponse(oi, response); })
            .catch(errorHandler);
    };
    RestCommitter.prototype.parseCommitResponse = function (oi, response) {
        if (response == "{}")
            return oi.createFromJson(undefined, DEFAULT_CREATE_OPTIONS);
        var data = response.json();
        return oi.createFromJson(data, DEFAULT_CREATE_OPTIONS);
    };
    RestCommitter = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ZeidonRestValues, http_1.Http])
    ], RestCommitter);
    return RestCommitter;
}());
exports.RestCommitter = RestCommitter;
var ZeidonConfiguration = (function () {
    function ZeidonConfiguration(activator, committer) {
        this.activator = activator;
        this.committer = committer;
        // Set the private global variable to this configuration.
        configurationInstance = this;
    }
    ZeidonConfiguration.prototype.getActivator = function () { return this.activator; };
    ZeidonConfiguration.prototype.getCommitter = function () { return this.committer; };
    ZeidonConfiguration = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [Activator, Committer])
    ], ZeidonConfiguration);
    return ZeidonConfiguration;
}());
exports.ZeidonConfiguration = ZeidonConfiguration;
/**
 * These are the values for configuring Zeidon to use a REST server for activate/commits.
 */
var ZeidonRestValues = (function () {
    function ZeidonRestValues() {
    }
    ZeidonRestValues = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ZeidonRestValues);
    return ZeidonRestValues;
}());
exports.ZeidonRestValues = ZeidonRestValues;
var ZeidonRestConfiguration = (function (_super) {
    __extends(ZeidonRestConfiguration, _super);
    function ZeidonRestConfiguration(values, http) {
        _super.call(this, new RestActivator(values, http), new RestCommitter(values, http));
        this.values = values;
        this.http = http;
        console.log("--- ZeidonRestConfiguration --- " + values.restUrl);
    }
    ZeidonRestConfiguration = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ZeidonRestValues, http_1.Http])
    ], ZeidonRestConfiguration);
    return ZeidonRestConfiguration;
}(ZeidonConfiguration));
exports.ZeidonRestConfiguration = ZeidonRestConfiguration;
var CommitOptions = (function (_super) {
    __extends(CommitOptions, _super);
    function CommitOptions() {
        _super.apply(this, arguments);
    }
    return CommitOptions;
}(OptionsConstructor));
exports.CommitOptions = CommitOptions;
var ActivateOptions = (function (_super) {
    __extends(ActivateOptions, _super);
    function ActivateOptions() {
        _super.apply(this, arguments);
    }
    return ActivateOptions;
}(OptionsConstructor));
exports.ActivateOptions = ActivateOptions;
var error = function (message) {
    var e = new Error('dummy');
    var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
        .replace(/^\s+at\s+/gm, '')
        .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
        .split('\n');
    console.log(stack.join("\n"));
    console.log(message);
    //alert( message );
    throw message;
};
//# sourceMappingURL=zeidon.js.map