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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var Configuration_1 = require('./Configuration');
var zeidon = require('./zeidon');
var RestService = (function () {
    function RestService(http) {
        this.http = http;
        this.restUrl = 'http://localhost:8080/utc';
        this.baseOptions = new zeidon.ActivateOptions({
            restUrl: this.restUrl,
            http: this.http,
            errorHandler: this.handleError,
        });
    }
    RestService.prototype.getConfigurationList = function () {
        return Configuration_1.Configuration.activate(this.baseOptions);
    };
    RestService.prototype.getConfiguration = function (id) {
        var options = this.baseOptions.clone();
        options.id = id;
        return Configuration_1.Configuration.activate(options);
    };
    RestService.prototype.saveConfiguration = function (configOi) {
        return configOi.commit(this.baseOptions);
        // let body = JSON.stringify( configOi.toZeidonMeta() );
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        // return this.http.post(`${this.restUrl}/Configuration`, body, options)
        //     .toPromise()
        //     .then(response => this.parseConfigurationResponse( response ) )
        //     .catch(this.handleError);
    };
    RestService.prototype.parseConfigurationResponse = function (response) {
        if (response == "{}")
            return new Configuration_1.Configuration(); // Return an empty config.
        var data = response.json();
        return new Configuration_1.Configuration(data);
        /*
                return new Configuration( [
                    {
                        Id: 100,
                        Description: "Configuration 1",
                        TargetTemperature: 225,
                        ThermometerCount: 1
                    },
                    {
                        Id: 101,
                        Description: "Configuration 2",
                        TargetTemperature: 200,
                        ThermometerCount: 1
                    }
                ]);
        */
    };
    RestService.prototype.handleError = function (e) {
        console.log("There was an error: " + e);
    };
    RestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RestService);
    return RestService;
}());
exports.RestService = RestService;
//# sourceMappingURL=rest.service.js.map