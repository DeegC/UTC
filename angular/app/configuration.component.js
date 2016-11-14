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
var Configuration_1 = require("./Configuration");
var rest_service_1 = require("./rest.service");
var ConfigurationComponent = (function () {
    function ConfigurationComponent(restService) {
        this.restService = restService;
    }
    ConfigurationComponent.prototype.save = function () {
        var _this = this;
        this.configOi.commit().subscribe(function (config) { return _this.configOi = config; });
    };
    return ConfigurationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Configuration_1.Configuration)
], ConfigurationComponent.prototype, "configOi", void 0);
ConfigurationComponent = __decorate([
    core_1.Component({
        selector: 'configuration-detail',
        template: "\n  <div *ngIf=\"configOi\">\n    <h2>Configuration Details</h2>\n    <div><label>Id: </label>{{configOi.Configuration$.Id}}</div>\n    <div>\n      <label>Description: </label>\n      <input [(ngModel)]=\"configOi.Configuration$.Description\" placeholder=\"Description\"/>\n    </div>\n    <div>\n      <label>Target Temperature: </label>\n      <input [(ngModel)]=\"configOi.Configuration$.TargetTemperature\" placeholder=\"target temperature\"/>\n    </div>\n    <div>\n      <label>PID: </label>\n      <input [(ngModel)]=\"configOi.Configuration$.PidP\" placeholder=\"P\" maxlength=\"2\" size=\"2\"/>\n      <input [(ngModel)]=\"configOi.Configuration$.PidI\" placeholder=\"I\" maxlength=\"5\" size=\"5\"/>\n      <input [(ngModel)]=\"configOi.Configuration$.PidD\" placeholder=\"D\" maxlength=\"2\" size=\"2\"/>\n    </div>\n    <div>\n      <label>Max PWM: </label>\n      <input [(ngModel)]=\"configOi.Configuration$.MaxPWM\" placeholder=\"max PWM\"/>\n    </div>\n    <div>\n      <label>Tweet On: </label>\n      <input [(ngModel)]=\"configOi.Configuration$.TweetOn\" placeholder=\"tweet on\"/>\n    </div>\n    <div>\n      <label>Tweet Period: </label>\n      <input [(ngModel)]=\"configOi.Configuration$.TweetPeriodInMinutes\" placeholder=\"Tweet period\"/>\n    </div>\n    <h3>Thermometers</h3>\n    <div *ngFor=\"let therm of configOi.Configuration$.ThermometerConfig\" >\n      <div>\n        <label>name: </label>\n        <input [(ngModel)]=\"therm.Name\" placeholder=\"name\"/>\n      </div>\n    </div>\n    <button (click)=\"save()\" [disabled]=\"! configOi.isUpdated\">\n      Save Configuration\n    </button>\n  </div>\n"
    }),
    __metadata("design:paramtypes", [rest_service_1.RestService])
], ConfigurationComponent);
exports.ConfigurationComponent = ConfigurationComponent;
//# sourceMappingURL=configuration.component.js.map