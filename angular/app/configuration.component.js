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
var rest_service_1 = require('./rest.service');
var ConfigurationComponent = (function () {
    function ConfigurationComponent(restService) {
        this.restService = restService;
    }
    ConfigurationComponent.prototype.save = function () {
        var _this = this;
        this.restService.saveConfiguration(this.configuration)
            .then(function (config) { return _this.configuration = config; });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', configuration_1.Configuration)
    ], ConfigurationComponent.prototype, "configuration", void 0);
    ConfigurationComponent = __decorate([
        core_1.Component({
            selector: 'configuration-detail',
            template: "\n  <div *ngIf=\"configuration\">\n    <h2>{{configuration.Configuration[0].Description}} details!</h2>\n    <div><label>Id: </label>{{configuration.Configuration[0].Id}}</div>\n    <div>\n      <label>Description: </label>\n      <input [(ngModel)]=\"configuration.Configuration[0].Description\" placeholder=\"Description\"/>\n    </div>\n    <div>\n      <label>name: </label>\n      <input [(ngModel)]=\"configuration.Configuration[0].ThermometerConfig[0].Name\" placeholder=\"name\"/>\n    </div>\n    <div><label>Therm name </label>{{configuration.Configuration[0].ThermometerConfig[0].Name}}</div>\n    <button (click)=\"save()\">\n      Save\n    </button>\n    </div>\n"
        }), 
        __metadata('design:paramtypes', [rest_service_1.RestService])
    ], ConfigurationComponent);
    return ConfigurationComponent;
}());
exports.ConfigurationComponent = ConfigurationComponent;
//# sourceMappingURL=configuration.component.js.map