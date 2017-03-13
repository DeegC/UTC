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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
// Observable class extensions
require("rxjs/add/observable/of");
require("rxjs/add/observable/throw");
// Observable operators
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/do");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
require("rxjs/add/operator/switchMap");
var zeidon_1 = require("./zeidon");
var RestActivator = (function () {
    function RestActivator(values, http) {
        this.values = values;
        this.http = http;
    }
    RestActivator.prototype.activateOi = function (oi, qual) {
        if (qual == undefined)
            qual = { rootOnly: true };
        var lodName = oi.getLodDef().name;
        var errorHandler = oi.handleActivateError;
        var url = this.values.restUrl + "/" + lodName + "?qual=" + encodeURIComponent(JSON.stringify(qual));
        return this.http.get(url)
            .map(function (response) { return oi.createFromJson(response.json(), { incrementalsSpecified: true }); });
    };
    return RestActivator;
}());
RestActivator = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ZeidonRestValues, http_1.Http])
], RestActivator);
exports.RestActivator = RestActivator;
/**
 * These are the values for configuring Zeidon to use a REST server for activate/commits.
 */
var ZeidonRestValues = (function () {
    function ZeidonRestValues() {
    }
    return ZeidonRestValues;
}());
ZeidonRestValues = __decorate([
    core_1.Injectable()
], ZeidonRestValues);
exports.ZeidonRestValues = ZeidonRestValues;
var ZeidonRestConfiguration = (function (_super) {
    __extends(ZeidonRestConfiguration, _super);
    function ZeidonRestConfiguration(values, http) {
        var _this = _super.call(this, new RestActivator(values, http), new RestCommitter(values, http)) || this;
        _this.values = values;
        _this.http = http;
        console.log("--- ZeidonRestConfiguration --- " + values.restUrl);
        return _this;
    }
    return ZeidonRestConfiguration;
}(zeidon_1.ZeidonConfiguration));
ZeidonRestConfiguration = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ZeidonRestValues, http_1.Http])
], ZeidonRestConfiguration);
exports.ZeidonRestConfiguration = ZeidonRestConfiguration;
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
            .map(function (response) { return _this.parseCommitResponse(oi, response); });
    };
    RestCommitter.prototype.parseCommitResponse = function (oi, response) {
        if (response.text() == "{}")
            return oi.createFromJson(undefined);
        var data = response.json();
        return oi.createFromJson(data, { incrementalsSpecified: true });
    };
    return RestCommitter;
}());
RestCommitter = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ZeidonRestValues, http_1.Http])
], RestCommitter);
exports.RestCommitter = RestCommitter;
//# sourceMappingURL=zeidon-rest-client.js.map