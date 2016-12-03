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
var forms_1 = require("@angular/forms");
var ConfigurationComponent = (function () {
    function ConfigurationComponent(restService, fb) {
        this.restService = restService;
        this.fb = fb;
        this.onSessionStarted = new core_1.EventEmitter();
    }
    ConfigurationComponent.prototype.ngOnInit = function () {
        this.form = new forms_1.FormGroup({
            Description: new forms_1.FormControl(this.configOi.Configuration$.Description, forms_1.Validators.required),
            TargetTemperature: new forms_1.FormControl(this.configOi.Configuration$.TargetTemperature, forms_1.Validators.required),
            PidP: new forms_1.FormControl(this.configOi.Configuration$.PidP, forms_1.Validators.required),
            PidI: new forms_1.FormControl(this.configOi.Configuration$.PidI, forms_1.Validators.required),
            PidD: new forms_1.FormControl(this.configOi.Configuration$.PidD, forms_1.Validators.required),
            MaxPWM: new forms_1.FormControl(this.configOi.Configuration$.MaxPWM, forms_1.Validators.required),
            TweetOn: new forms_1.FormControl(this.configOi.Configuration$.TweetOn, forms_1.Validators.required),
            TweetPeriodInMinutes: new forms_1.FormControl(this.configOi.Configuration$.TweetPeriodInMinutes, forms_1.Validators.required),
            ThermometerConfig: new forms_1.FormArray([
                new forms_1.FormControl(this.configOi.Configuration$.ThermometerConfig[0].Name),
                new forms_1.FormControl(this.configOi.Configuration$.ThermometerConfig[1].Name),
            ]),
        });
        console.log("nOnInit");
    };
    Object.defineProperty(ConfigurationComponent.prototype, "ThermometerConfig", {
        get: function () {
            var t = this.form.get('ThermometerConfig');
            return t;
        },
        enumerable: true,
        configurable: true
    });
    ConfigurationComponent.prototype.saveConfig = function (event) {
        var _this = this;
        this.configOi.commit().subscribe(function (config) {
            _this.configOi = config;
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
        template: "\n  <div *ngIf=\"configOi\">\n    <form [formGroup]=\"form\" (ngSubmit)=\"saveConfig($event)\">\n      <h2>Configuration Details</h2>\n      <div><label>Id: </label>{{configOi.Configuration$.Id}}</div>\n      <div>\n        <label>Description: </label>\n        <input type=\"text\"\n               formControlName=\"Description\"\n               placeholder=\"Description\" name=\"Description\"\n        />\n      </div>\n      <div>\n        <label>Target Temperature: </label>\n        <input formControlName=\"TargetTemperature\" placeholder=\"target temperature\"  />\n      </div>\n      \n      <div>\n        <label>PID: </label>\n        <input formControlName=\"PidP\" \n            placeholder=\"P\" maxlength=\"2\" size=\"2\"/>\n        <input formControlName=\"PidI\" placeholder=\"I\" maxlength=\"5\" size=\"5\" />\n        <input formControlName=\"PidD\"\n            placeholder=\"D\" maxlength=\"2\" size=\"2\"/>\n      </div>\n        <div *ngIf=\"configOi.Configuration$.validateErrors.PidP\" class=\"alert alert-danger\">\n            {{ configOi.Configuration$.validateErrors.PidP.message }}\n        </div>\n        <div *ngIf=\"configOi.Configuration$.validateErrors.PidI\" class=\"alert alert-danger\">\n            {{ configOi.Configuration$.validateErrors.PidI.message }}\n        </div>\n        <div *ngIf=\"configOi.Configuration$.validateErrors.PidD\" class=\"alert alert-danger\">\n            {{ configOi.Configuration$.validateErrors.PidD.message }}\n        </div>\n      <div>\n        <label>Max PWM: </label>\n        <input formControlName=\"MaxPWM\" placeholder=\"max PWM\"/>\n      </div>\n      <div>\n        <label>Tweet On: </label>\n        <input id=\"TweetOn\"\n            formControlName=\"TweetOn\" placeholder=\"tweet on\"\n        />\n        <div *ngIf=\"configOi.Configuration$.validateErrors.TweetOn\" class=\"alert alert-danger\">\n          {{ configOi.Configuration$.validateErrors.TweetOn.message }}\n        </div>\n      </div>\n      <div>\n        <label>Tweet Period: </label>\n        <input formControlName=\"TweetPeriodInMinutes\" placeholder=\"Tweet period\"/>\n      </div>\n\n      <h3>Thermometers</h3>\n      <div formArrayName=\"ThermometerConfig\">\n        <div *ngFor=\"let therm of ThermometerConfig.controls; let i = index;\" >\n            <label>name: </label>\n            <input formControlName=\"i\" placeholder=\"name\" />\n            <img src=\"/img/icons/red-x.png\" (click)=\"deleteThermometer( therm )\"/>\n        </div>\n      </div>\n      \n<!--      \n      <div>\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"newThermometer()\" \n               [disabled]=\"configOi.Configuration$.ThermometerConfig.length > 3\" >\n            New Thermometer\n        </button>\n      </div>\n-->\n      <div>\n        <button type=\"submit\" class=\"btn btn-default\" [disabled]=\"! configOi.isUpdated\">\n            Save Configuration\n        </button>\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"cancel()\" >\n            Cancel\n        </button>\n      </div>\n      <div>\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"startSession()\" >\n            Start Session\n        </button>\n      </div>\n    </form>\n  </div>\n"
    }),
    __metadata("design:paramtypes", [rest_service_1.RestService, forms_1.FormBuilder])
], ConfigurationComponent);
exports.ConfigurationComponent = ConfigurationComponent;
//# sourceMappingURL=configuration.component.js.map