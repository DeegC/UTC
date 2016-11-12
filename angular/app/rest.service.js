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
require("rxjs/add/operator/toPromise");
var zeidon = require("./zeidon");
var RestService = (function () {
    function RestService(http, values) {
        this.http = http;
        this.values = values;
    }
    RestService.prototype.handleError = function (e) {
        console.log("There was an error: " + e);
    };
    RestService.prototype.deleteConfigurationFromList = function (config) {
        var lodName = config.oi.getLodDef().name;
        var url = this.values.restUrl + "/" + lodName + "/" + config.Id;
        this.http.delete(url)
            .map(function (response) { return config.drop(); });
    };
    return RestService;
}());
RestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, zeidon.ZeidonRestValues])
], RestService);
exports.RestService = RestService;
//# sourceMappingURL=rest.service.js.map