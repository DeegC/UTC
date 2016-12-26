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
var core_1 = require("@angular/core");
var configurationInstance = undefined;
/**
 * Keeps track of the current EI fingerprint.  The fingerprint is used to differentiate between
 * EIs that don't (yet) have a key.
 */
var entityInstanceFingerprintCount = 0;
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
    ObjectInstance.prototype.getDomain = function (name) { throw "getDomain() must be overriden"; };
    ;
    ObjectInstance.prototype.getDomainFunctions = function (name) {
        // Can be overwritten but not necessary.
        return undefined;
    };
    ObjectInstance.prototype.toJSON = function (options) {
        console.log("JSON for Configuration OI");
        options = options || {};
        var jarray = [];
        for (var _i = 0, _a = this.roots.allEntities(); _i < _a.length; _i++) {
            var root = _a[_i];
            jarray.push(root.toJSON(options));
        }
        ;
        var json = {};
        json[this.rootEntityName()] = jarray;
        return json;
    };
    ObjectInstance.prototype.logOi = function () {
        console.log(JSON.stringify(this, null, 2));
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
        wrapper.OIs[0][this.getLodDef().name] = this.toJSON({ meta: true })[this.getLodDef().name];
        return wrapper;
    };
    ObjectInstance.activateOi = function (oi, options) {
        var config = configurationInstance;
        if (!config)
            error("ZeidonConfiguration not properly initiated.");
        oi.activateOptions = options;
        return config.getActivator().activateOi(oi, options);
    };
    ObjectInstance.prototype.commit = function (options) {
        var config = configurationInstance;
        if (!config)
            error("ZeidonConfiguration not properly initiated.");
        return config.getCommitter().commitOi(this, options);
    };
    /**
     * Reset this OI so that's empty.
     */
    ObjectInstance.prototype.reset = function () {
        this.roots = new EntityArray(this.rootEntityName(), this, undefined);
        this.isUpdated = false;
    };
    ObjectInstance.prototype.reload = function () {
        this.reset();
        var obs = ObjectInstance.activateOi(this, this.activateOptions);
        obs.toPromise();
        return obs;
    };
    Object.defineProperty(ObjectInstance.prototype, "isEmpty", {
        get: function () {
            return this.roots.length == 0;
        },
        enumerable: true,
        configurable: true
    });
    ObjectInstance.prototype.createFromJson = function (initialize, options) {
        if (options === void 0) { options = DEFAULT_CREATE_OPTIONS; }
        if (typeof initialize == "string") {
            initialize = JSON.parse(initialize);
        }
        this.reset();
        if (!initialize) {
            return this;
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
                    options = Object.assign({}, options);
                    options.incrementalsSpecified = true;
                }
            }
            var root = initialize.OIs[0][this.rootEntityName()];
            if (root) {
                for (var _i = 0, _a = initialize.OIs[0][this.rootEntityName()]; _i < _a.length; _i++) {
                    var i = _a[_i];
                    this.roots.create(i, options);
                }
            }
        }
        else if (initialize.constructor === Array) {
            for (var _b = 0, initialize_1 = initialize; _b < initialize_1.length; _b++) {
                var i = initialize_1[_b];
                this.roots.create(i, options);
            }
        }
        else if (initialize != {}) {
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
var EiMetaFlags = (function () {
    function EiMetaFlags() {
    }
    return EiMetaFlags;
}());
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
        this.metaFlags = {};
        this.validateErrors = {};
        // If incomplete = true then this entity did not have all its children
        // loaded and so cannot be deleted.
        this.incomplete = false;
        // A value that can be used to compare EIs that don't have a key.
        this.fingerprint = String(entityInstanceFingerprintCount++);
        // Map of child entities and the array associated with each one.
        // Key: entityName
        // Value: EntityArray.
        this.childEntityInstances = {};
        this.oi = oi;
        this.parentArray = parentArray;
        for (var attr in initialize) {
            if (this.getAttributeDef(attr)) {
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
                this.metaFlags = initialize[attr];
                continue;
            }
            if (attr.startsWith(".")) {
                var metaName = attr.substr(1); // Remove leading "."
                if (this.getAttributeDef(metaName)) {
                    var attribs = this.getAttribHash(metaName);
                    attribs[attr] = initialize[attr];
                    continue;
                }
            }
            error("Unknown attribute " + attr + " for entity " + this.entityName);
        }
        if (!options.incrementalsSpecified) {
            this.setDefaultAttributeValues();
            this.created = true;
            this.oi.isUpdated = true;
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
    EntityInstance.prototype.getAttributeDef = function (attributeName) {
        var attributeDef = this.entityDef.attributes[attributeName];
        if (!attributeDef)
            return undefined;
        if (!attributeDef.domain) {
            var domain = this.oi.getDomain(attributeDef.domainName);
            if (domain) {
                attributeDef.domain = domain;
                if (!domain.domainFunctions)
                    domain.domainFunctions = this.oi.getDomainFunctions(domain.class);
            }
            else {
                console.log("Couldn't find domain '" + attributeDef.domain + "'");
            }
        }
        return attributeDef;
    };
    EntityInstance.prototype.setDefaultAttributeValues = function () {
        var entityDef = this.entityDef;
        if (!entityDef.hasInit)
            return;
        for (var attributeName in entityDef.attributes) {
            var attributeDef = entityDef.attributes[attributeName];
            if (!attributeDef.initialValue)
                continue;
            // If the attribute is already set, skip it.
            if (this.getAttribute(attributeName) != undefined)
                continue;
            this.setAttribute(attributeName, attributeDef.initialValue);
        }
    };
    EntityInstance.prototype.setAttribute = function (attr, value, options) {
        if (options === void 0) { options = DEFAULT_CREATE_OPTIONS; }
        //    console.log( `Setting attribute ${attr}`)
        var attributeDef = this.getAttributeDef(attr);
        if (!attributeDef)
            error("Attribute " + attr + " is unknown for entity " + this.entityDef.name);
        // Perform some validations unless incrementals are specified.
        if (!options.incrementalsSpecified) {
            if (!attributeDef.update)
                error("Attribute " + this.entityDef.name + "." + attr + " is read only");
            if (this.deleted || this.excluded)
                error("Can't set attribute for hidden EntityInstance: " + this.entityDef.name + "." + attr);
        }
        if (attributeDef.domain.domainFunctions) {
            value = attributeDef.domain.domainFunctions.convertExternalValue(value, attributeDef);
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
        if (attr == "Name")
            this.oi.logOi();
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
        var attributeDef = this.getAttributeDef(attr);
        if (attributeDef == undefined)
            console.log("here");
        if (attributeDef.persistent)
            return this.attributes;
        else
            return this.workAttributes;
    };
    EntityInstance.prototype.getChildEntityArray = function (entityName) {
        var entities = this.childEntityInstances[entityName];
        if (entities == undefined) {
            entities = new EntityArray(entityName, this.oi, this);
            this.childEntityInstances[entityName] = entities;
        }
        return entities;
    };
    EntityInstance.prototype.delete = function () {
        var _this = this;
        var idx = this.parentArray.findIndex(function (ei) { return ei === _this; });
        this.parentArray.delete(idx);
    };
    EntityInstance.prototype.drop = function () {
        var _this = this;
        var idx = this.parentArray.findIndex(function (ei) { return ei === _this; });
        this.parentArray.drop(idx);
    };
    EntityInstance.prototype.exclude = function () {
        var _this = this;
        var idx = this.parentArray.findIndex(function (ei) { return ei === _this; });
        this.parentArray.exclude(idx);
    };
    EntityInstance.prototype.parentEntityInstance = function () {
        return this.parentArray.parentEi;
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
    /**
     * Updates the attributes of this entity instance and any children that are specified
     * in 'values'.  The entity fingerprint is used to match up entities in 'value' to the
     * entities in the OI.
     *
     * Note: This will not create or re-order entities.  It is expected that every fingerprint
     * in 'values' exists in the OI.
     *
     * Sample input might look like:
     *      {
     *          fingerprint: 22,
     *          Attr1: 'new value',
     *          Attr2: 'another value',
     *          Attr3: true,
     *          Child1: [
     *              {
     *                  fingerprint: 49,
     *                  ChildAttr1: 10,
     *                  ChildAttr2: 'foo'
     *              }
     *          ]
     *      }
     */
    EntityInstance.prototype.update = function (values, options) {
        if (options === void 0) { options = {}; }
        if (typeof values !== 'object')
            error("Argument passed to update() must be an object");
        var _loop_1 = function (key) {
            // Ignore known non-attributes/entities like fingerprint
            if (key === 'fingerprint')
                return "continue";
            var attributeDef = this_1.getAttributeDef(key);
            if (attributeDef) {
                var value = values[key];
                this_1.setAttribute(key, value);
                return "continue";
            }
            var childDef = this_1.entityDef.childEntities[key];
            if (!childDef) {
                if (options.ignoreUnknownAttributeErrors)
                    return "continue";
                else
                    error("Key '" + key + " in values does not match a known entity or attribute");
            }
            var eiChildren = this_1.getChildEntityArray(key);
            var valueChildren = values[key];
            // Keep track of the fingerprints of the child entities.  We'll use
            // this to determine which children EIs need to be deleted.
            var childFingerprints = {};
            // Children of 1-to-1 relationships are not in an array.  Convert it to
            // an array to make it easier to process.
            if (!Array.isArray(valueChildren))
                valueChildren = [valueChildren];
            var _loop_2 = function (valueChild) {
                var eiChild = eiChildren.find(function (eiChild) { return eiChild.fingerprint === valueChild.fingerprint; });
                if (!eiChild)
                    error("Couldn't find EI using fingerprint");
                childFingerprints[valueChild.fingerprint] = true;
                eiChild.update(valueChild);
            };
            for (var _i = 0, valueChildren_1 = valueChildren; _i < valueChildren_1.length; _i++) {
                var valueChild = valueChildren_1[_i];
                _loop_2(valueChild);
            }
            // Do we have a fingerprint for every child entity?
            if (Object.keys(childFingerprints).length < eiChildren.length) {
                // No.  Delete all child entities that are missing from the list of fingerprints.
                eiChildren.deleteAll(function (ei) { return !childFingerprints[ei.fingerprint]; });
            }
        };
        var this_1 = this;
        for (var key in values) {
            _loop_1(key);
        }
    };
    EntityInstance.prototype.toJSON = function (options) {
        options = options || {};
        var json = {};
        if (options.meta) {
            var meta = {};
            var incrementals = this.buildIncrementalStr();
            if (incrementals != "")
                meta.incrementals = incrementals;
            if (Object.keys(meta).length > 0)
                json[".meta"] = meta;
        }
        for (var attrName in this.entityDef.attributes) {
            if (this.getAttribute(attrName) != undefined || this.isAttributeUpdated(attrName)) {
                json[attrName] = this.getAttribute(attrName);
                if (options.meta && this.isAttributeUpdated(attrName)) {
                    json["." + attrName] = { updated: true };
                }
            }
        }
        ;
        for (var entityName in this.entityDef.childEntities) {
            if (options.childEntities && options.childEntities.indexOf(entityName) == -1) {
                continue;
            }
            var entities = this.getChildEntityArray(entityName).allEntities();
            if (entities.length == 0)
                continue;
            var entityInfo = this.entityDef.childEntities[entityName];
            if (entityInfo.cardMax == 1) {
                json[entityName] = entities[0].toJSON(options);
            }
            else {
                json[entityName] = entities.map(function (ei) { return ei.toJSON(options); });
            }
        }
        return json;
    };
    return EntityInstance;
}());
exports.EntityInstance = EntityInstance;
;
/**
 * Include logic can get pretty hairy.  This class tries to perform it.
 */
var Includer = (function () {
    function Includer(target, source) {
        this.target = target;
        this.source = source;
    }
    Includer.prototype.include = function () {
        this.target;
    };
    return Includer;
}());
/**
 * Array<T> is one of the few classes we can't directly extend so we have to create
 * a delegate class that handles all the real work.  We'll set the appropriate function
 * names when we construct EntityArray<T>.
 *
 * See https://github.com/Microsoft/TypeScript/issues/12013 for more.
 */
var ArrayDelegate = (function () {
    function ArrayDelegate(array, entityName, oi, parentEi) {
        this.array = array;
        this.entityName = entityName;
        this.oi = oi;
        this.parentEi = parentEi;
        this.currentlySelected = 0;
    }
    Object.defineProperty(ArrayDelegate.prototype, "entityDef", {
        get: function () { return this.oi.getLodDef().entities[this.entityName]; },
        enumerable: true,
        configurable: true
    });
    ArrayDelegate.prototype.create = function (initialize, options) {
        if (initialize === void 0) { initialize = {}; }
        if (options === void 0) { options = DEFAULT_CREATE_OPTIONS; }
        //    console.log("Creating entity " + this.entityName );
        var ei = Object.create(this.oi.getPrototype(this.entityName));
        ei.constructor.apply(ei, [initialize, this.oi, this.array, options]);
        // Figure out where to insert the new ei.
        var position = options.position;
        if (position == undefined) {
            // Default is to insert at the end.
            this.array.push(ei);
        }
        else if (typeof position === "Position") {
            if (position === Position.Last)
                this.array.push(ei);
            else if (position === Position.First)
                this.array.unshift(ei);
            else if (position === Position.Next)
                this.array.splice(this.currentlySelected, 0, ei);
            else {
                // Must be Position.Prev.  If currentlySelected is 0, then put
                // at the beginning.
                if (this.currentlySelected == 0)
                    this.array.unshift(ei);
                else
                    this.array.splice(this.currentlySelected - 1, 0, ei);
            }
        }
        else {
            this.array.splice(position, 0, ei);
        }
        this.setSelected(ei);
        return ei;
    };
    ArrayDelegate.prototype.include = function (sourceEi, index, options) {
        if (index === void 0) { index = -1; }
        if (options === void 0) { options = {}; }
        if (!this.entityDef.includable)
            error("Entity " + this.entityDef.name + " does not have include authority.");
    };
    ArrayDelegate.prototype.validateExclude = function (index) {
        if (!this.entityDef.excludable)
            error("Entity " + this.entityDef.name + " does not have exclude authority.");
        if (!this.hiddenEntities)
            this.hiddenEntities = new Array();
    };
    ArrayDelegate.prototype.excludeAll = function () {
        this.validateExclude();
        if (this.array.length == 0)
            return;
        this.hiddenEntities = this.hiddenEntities.concat(this.array);
        for (var _i = 0, _a = this.array; _i < _a.length; _i++) {
            var ei = _a[_i];
            ei.excluded = true;
        }
        this.oi.isUpdated = true;
        this.array.length = 0;
    };
    ArrayDelegate.prototype.validateDelete = function (index) {
        if (!this.entityDef.deletable)
            error("Entity " + this.entityDef.name + " does not have delete authority.");
        var list = index ? [this.array[index]] : this.array;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var ei = list_1[_i];
            if (ei.metaFlags.incomplete)
                error("Entity " + this.entityDef.name + " is incomplete and cannot be deleted.");
        }
        if (!this.hiddenEntities)
            this.hiddenEntities = new Array();
    };
    ArrayDelegate.prototype.deleteAll = function (filter) {
        this.validateDelete();
        if (this.array.length == 0)
            return;
        this.hiddenEntities = this.hiddenEntities.concat(this.array);
        for (var _i = 0, _a = this.array; _i < _a.length; _i++) {
            var ei = _a[_i];
            if (filter == undefined || filter(ei) === true)
                this.deleteEntity(ei);
        }
        this.array.length = 0;
    };
    ArrayDelegate.prototype.delete = function (index) {
        if (index == undefined)
            index = this.currentlySelected;
        this.validateDelete(index);
        var ei = this.array.splice(index, 1)[0];
        this.hiddenEntities.push(ei);
        this.deleteEntity(ei);
    };
    ArrayDelegate.prototype.drop = function (index) {
        if (index == undefined)
            index = this.currentlySelected;
        var ei = this.array.splice(index, 1)[0];
        ei.deleted = true;
        while (ei = ei.parentEntityInstance()) {
            ei.metaFlags.incomplete = true;
        }
    };
    ArrayDelegate.prototype.exclude = function (index) {
        if (index == undefined)
            index = this.currentlySelected;
        var ei = this.array.splice(index, 1)[0];
        ei.excluded = true;
        this.oi.isUpdated = true;
    };
    ArrayDelegate.prototype.deleteEntity = function (ei) {
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
    ArrayDelegate.prototype.setSelected = function (value) {
        if (value instanceof EntityInstance) {
            this.currentlySelected = this.array.findIndex(function (ei) { return value === ei; });
            return this.selected();
        }
        if (typeof value == "number") {
            this.currentlySelected = value;
            return this.selected();
        }
        throw "Value must be number or EntityInstance.  Found " + typeof value;
    };
    ArrayDelegate.prototype.selected = function () {
        return this.array[this.currentlySelected];
    };
    /**
     * Returns all entity instances, including hidden ones.
     */
    ArrayDelegate.prototype.allEntities = function () {
        var ret = [];
        for (var _i = 0, _a = this.array; _i < _a.length; _i++) {
            var ei = _a[_i];
            ret.push(ei);
        }
        if (this.hiddenEntities) {
            for (var _b = 0, _c = this.hiddenEntities; _b < _c.length; _b++) {
                var ei = _c[_b];
                ret.push(ei);
            }
        }
        return ret;
    };
    return ArrayDelegate;
}());
var EntityArray = (function (_super) {
    __extends(EntityArray, _super);
    function EntityArray(entityName, oi, parentEi) {
        var _this;
        var _arr = _this = _super.call(this) || this;
        // See comment starting ArrayDelegate for why we do this.
        _this.delegate = new ArrayDelegate(_arr, entityName, oi, parentEi);
        Object.defineProperty(_arr, 'parentEi', {
            get: function () { return parentEi; },
            enumerable: true,
            configurable: true
        });
        // Add all the functions to EntityArray.
        _arr.create = function (initialize, options) {
            if (initialize === void 0) { initialize = {}; }
            if (options === void 0) { options = DEFAULT_CREATE_OPTIONS; }
            return this.delegate.create(initialize, options);
        };
        _arr.excludeAll = function () { this.delegate.excludeAll(); };
        _arr.deleteAll = function (filter) { this.delegate.deleteAll(filter); };
        _arr.delete = function (index) { this.delegate.delete(index); };
        _arr.drop = function (index) { this.delegate.drop(index); };
        _arr.exclude = function (index) { this.delegate.exclude(index); };
        _arr.selected = function () { return this.delegate.selected(); };
        _arr.setSelected = function (value) { return this.delegate.setSelected(value); };
        _arr.allEntities = function () { return this.delegate.allEntities(); };
        return _arr;
    }
    return EntityArray;
}(Array));
exports.EntityArray = EntityArray;
(function (Position) {
    Position[Position["First"] = 0] = "First";
    Position[Position["Prev"] = 1] = "Prev";
    Position[Position["Next"] = 2] = "Next";
    Position[Position["Last"] = 3] = "Last";
})(exports.Position || (exports.Position = {}));
var Position = exports.Position;
var DEFAULT_CREATE_OPTIONS = {
    incrementalsSpecified: false,
    readOnlyOi: false,
    position: Position.Last
};
var Activator = (function () {
    function Activator() {
    }
    Activator.prototype.activateOi = function (oi, options) {
        throw "activateOi has not been implemented";
    };
    return Activator;
}());
Activator = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], Activator);
exports.Activator = Activator;
var Committer = (function () {
    function Committer() {
    }
    Committer.prototype.commitOi = function (oi, options) {
        throw "commitOi has not been implemented";
    };
    return Committer;
}());
Committer = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], Committer);
exports.Committer = Committer;
var ZeidonConfiguration = (function () {
    function ZeidonConfiguration(activator, committer) {
        this.activator = activator;
        this.committer = committer;
        // Set the private global variable to this configuration.
        configurationInstance = this;
    }
    ZeidonConfiguration.prototype.getActivator = function () { return this.activator; };
    ZeidonConfiguration.prototype.getCommitter = function () { return this.committer; };
    return ZeidonConfiguration;
}());
ZeidonConfiguration = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Activator, Committer])
], ZeidonConfiguration);
exports.ZeidonConfiguration = ZeidonConfiguration;
var AttributeValueError = (function (_super) {
    __extends(AttributeValueError, _super);
    function AttributeValueError(message, attributeDef) {
        var _this = _super.call(this, message) || this;
        _this.attributeDef = attributeDef;
        return _this;
    }
    return AttributeValueError;
}(Error));
exports.AttributeValueError = AttributeValueError;
var error = function (message) {
    var e = new Error('dummy');
    var stack = e.stack.replace(/^[^\(]+?[\n$]/gm, '')
        .replace(/^\s+at\s+/gm, '')
        .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
        .split('\n');
    console.log(stack.join("\n"));
    console.log(message);
    alert(message);
    throw message;
};
//# sourceMappingURL=zeidon.js.map