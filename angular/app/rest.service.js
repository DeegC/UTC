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
var configuration_1 = require('./configuration');
var RestService = (function () {
    function RestService() {
    }
    RestService.prototype.getConfigurationList = function () {
        return Promise.resolve(new configuration_1.Configuration([
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
        ]));
    };
    RestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], RestService);
    return RestService;
}());
exports.RestService = RestService;
//# sourceMappingURL=rest.service.js.map