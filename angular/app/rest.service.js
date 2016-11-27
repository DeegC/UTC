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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("./rxjs-extensions");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/toPromise");
var Session_1 = require("./Session");
var zeidon_rest_client_1 = require("./zeidon-rest-client");
var RestService = (function () {
    function RestService(http, values) {
        this.http = http;
        this.values = values;
    }
    RestService.prototype.handleError = function (e) {
        console.log("There was an error: " + e);
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
        var url = this.values.restUrl + "/getSession";
        var session = new Session_1.Session();
        return this.http.get(url)
            .map(function (response) { return _this.parseCommitResponse(session, response); });
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
    __metadata("design:paramtypes", [http_1.Http, zeidon_rest_client_1.ZeidonRestValues])
], RestService);
exports.RestService = RestService;
//# sourceMappingURL=rest.service.js.map