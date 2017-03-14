"use strict";
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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
require("./rxjs-extensions");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/toPromise");
var Session_1 = require("./Session");
var Instant_1 = require("./Instant");
var zeidon_rest_client_1 = require("./zeidon-rest-client");
var RestService = (function () {
    function RestService(http, sanitizer, values) {
        this.http = http;
        this.sanitizer = sanitizer;
        this.values = values;
    }
    RestService.prototype.handleError = function (e) {
        console.log("There was an error: " + e);
    };
    RestService.prototype.deleteRoot = function (root) {
        var oi = root.oi;
        var lodName = oi.getLodDef().name;
        var url = this.values.restUrl + "/" + lodName + "/" + root.key;
        this.http.delete(url)
            .toPromise()
            .then(function () { return root.drop(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    RestService.prototype.deleteOi = function (oi) {
        // For now we only handle a single root.  No real reason it can't handle more
        // but the semantics of calling the server need to be worked out.
        if (oi.root.length != 1)
            throw ("deleteOi may only be called on OI with a single root.");
        var lodName = oi.getLodDef().name;
        var url = this.values.restUrl + "/" + lodName + "/" + oi.root[0].key;
        this.http.delete(url)
            .toPromise()
            .then(function () { return oi.root[0].drop(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    RestService.prototype.deleteConfiguration = function (config) {
        var lodName = config.oi.getLodDef().name;
        var url = this.values.restUrl + "/" + lodName + "/" + config.Id;
        this.http.delete(url)
            .toPromise()
            .then(function () { return config.drop(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    RestService.prototype.getCurrentSession = function () {
        var _this = this;
        var url = this.values.restUrl + "/getCurrentSession";
        var session = new Session_1.Session();
        return this.http.get(url)
            .map(function (response) { return _this.parseCommitResponse(session, response); });
    };
    RestService.prototype.getCurrentState = function () {
        var _this = this;
        var url = this.values.restUrl + "/getCurrentState";
        var session = new Instant_1.Instant();
        return this.http.get(url)
            .map(function (response) { return _this.parseCommitResponse(session, response); });
    };
    RestService.prototype.getChart = function (id) {
        var _this = this;
        var url = this.values.restUrl + "/getChart/" + id;
        var headers = new http_1.Headers({ 'Content-Type': 'image/png' });
        return this.http.get(url, { headers: headers,
            responseType: http_1.ResponseContentType.Blob })
            .map(function (res) {
            var urlCreator = window.URL;
            return _this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(res.blob()));
        });
    };
    RestService.prototype.startSession = function (configOi) {
        var _this = this;
        var url = this.values.restUrl + "/startSession/" + configOi.Configuration$.Id;
        var body = "{}";
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var reqOptions = new http_1.RequestOptions({ headers: headers });
        var session = new Session_1.Session();
        return this.http.post(url, body, reqOptions)
            .map(function (response) { return _this.parseCommitResponse(session, response); });
    };
    RestService.prototype.stopSession = function () {
        var url = this.values.restUrl + "/stopSession";
        var body = "{}";
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var reqOptions = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, reqOptions)
            .map(function (response) { return response.text(); });
    };
    RestService.prototype.parseCommitResponse = function (oi, response) {
        if (response.text() == "{}")
            return oi;
        var data = response.json();
        return oi.createFromJson(data);
    };
    return RestService;
}());
RestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        platform_browser_1.DomSanitizer,
        zeidon_rest_client_1.ZeidonRestValues])
], RestService);
exports.RestService = RestService;
//# sourceMappingURL=rest.service.js.map