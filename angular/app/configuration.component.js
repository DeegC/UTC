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
var zeidon = require("./zeidon-angular");
var ConfigurationComponent = (function () {
    function ConfigurationComponent(restService) {
        this.restService = restService;
        this.onSessionStarted = new core_1.EventEmitter();
    }
    // ngOnInit() {
    //     console.log("nOnInit");
    // }
    ConfigurationComponent.prototype.ngOnChanges = function (changes) {
        this.buildForm();
        console.log("ngOnChanges for configuration");
    };
    ConfigurationComponent.prototype.buildForm = function () {
        this.form = new zeidon.ZeidonFormBuilder().group(this.configOi.Configuration$);
    };
    ConfigurationComponent.prototype.saveConfig = function (event) {
        var _this = this;
        this.configOi.Configuration$.update(this.form.value);
        this.configOi.commit().subscribe(function (config) {
            _this.configOi = config;
            _this.buildForm();
            _this.configurationList.reload();
        });
    };
    ConfigurationComponent.prototype.startSession = function () {
        var _this = this;
        this.configOi.commit().subscribe(function (configOi) {
            _this.configOi = configOi;
            _this.configurationList.reload();
            _this.restService
                .startSession(configOi)
                .subscribe(function (sessionOi) { return _this.onSessionStarted.emit(sessionOi); });
        });
    };
    ConfigurationComponent.prototype.cancel = function () {
        this.configOi = undefined;
    };
    ConfigurationComponent.prototype.deleteThermometer = function (therm) {
        therm.delete();
    };
    ConfigurationComponent.prototype.newThermometer = function () {
        this.configOi.Configuration$.ThermometerConfig.create({ Name: "New therm" });
    };
    return ConfigurationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Configuration_1.Configuration)
], ConfigurationComponent.prototype, "configOi", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Configuration_1.Configuration)
], ConfigurationComponent.prototype, "configurationList", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ConfigurationComponent.prototype, "onSessionStarted", void 0);
ConfigurationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'configuration-detail',
        template: "\n  <div *ngIf=\"configOi\">\n    <form [formGroup]=\"form\" (ngSubmit)=\"saveConfig($event)\">\n      <h2>Configuration Details</h2>\n      <div>\n        <label>Id: </label>{{configOi.Configuration$.Id}}\n      </div>\n      <div>\n        <label>Description: </label>\n        <input type=\"text\"\n               formControlName=\"Description\" [zeidonErrorElement]=\"descriptionError\"\n               placeholder=\"Description\"\n        />\n      </div>\n      <div #descriptionError class=\"alert alert-danger\" style=\"display:none\"></div>\n\n      <div>\n        <label>Target Temperature: </label>\n        <input type=\"number\" formControlName=\"TargetTemperature\" [zeidonErrorElement]=\"targetError\"\n               placeholder=\"target temperature\"  />\n      </div>\n      <div #targetError class=\"alert alert-danger\" style=\"display:none\"></div>\n\n      <div>\n        <label>PID: </label>\n        <input type=\"number\" formControlName=\"PidP\" [zeidonErrorElement]=\"pidError\"\n            placeholder=\"P\" maxlength=\"2\" size=\"3\"/>\n        <input formControlName=\"PidI\" [zeidonErrorElement]=\"pidError\"\n            placeholder=\"I\" maxlength=\"5\" size=\"5\" />\n        <input formControlName=\"PidD\" [zeidonErrorElement]=\"pidError\"\n            placeholder=\"D\" maxlength=\"2\" size=\"2\"/>\n      </div>\n      <div #pidError class=\"alert alert-danger\" style=\"display:none\"></div>\n\n      <div>\n        <label>Max PWM: </label>\n        <input type=\"number\" formControlName=\"MaxPWM\" [zeidonErrorElement]=\"pwmError\" placeholder=\"max PWM\"/>\n      </div>\n      <div #pwmError class=\"alert alert-danger\" style=\"display:none\"></div>\n\n      <div>\n        <label>Tweet On: </label>\n        <input type=\"checkbox\"\n            formControlName=\"TweetOn\" placeholder=\"tweet on\" [zeidonErrorElement]=\"tweetError\"\n        />\n        <div #tweetError class=\"alert alert-danger\" style=\"display:none\"></div>\n      </div>\n\n      <div>\n        <label>Tweet Period: </label>\n        <input type=\"number\" formControlName=\"TweetPeriodInMinutes\" [zeidonErrorElement]=\"periodError\" placeholder=\"Tweet period\"/>\n      </div>\n      <div #periodError class=\"alert alert-danger\" style=\"display:none\"></div>\n\n      <h3>Thermometers</h3>\n      <div formArrayName=\"ThermometerConfig\">\n        <div *ngFor=\"let therm of form.controls.ThermometerConfig.controls; let i = index;\" >\n            <div [formGroupName]=\"i\">\n                <label>name: </label>\n                <input type=\"text\" formControlName=\"Name\" placeholder=\"name\" [zeidonErrorElement]=\"thermError\" />\n                <img src=\"/img/icons/red-x.png\" (click)=\"deleteThermometer( therm )\"/>\n            </div>\n            <div #thermError class=\"alert alert-danger\" style=\"display:none\"></div>\n        </div>\n      </div>\n\n<!--\n      <div>\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"newThermometer()\"\n               [disabled]=\"configOi.Configuration$.ThermometerConfig.length > 3\" >\n            New Thermometer\n        </button>\n      </div>\n-->\n      <div>\n        <button type=\"submit\" class=\"btn btn-default\" [disabled]=\"false\">\n            Save Configuration\n        </button>\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"cancel()\" >\n            Cancel\n        </button>\n      </div>\n      <div>\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"startSession()\" >\n            Start Session\n        </button>\n      </div>\n    </form>\n  </div>\n"
    }),
    __metadata("design:paramtypes", [rest_service_1.RestService])
], ConfigurationComponent);
exports.ConfigurationComponent = ConfigurationComponent;
//# sourceMappingURL=configuration.component.js.map