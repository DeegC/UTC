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
var core_2 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_3 = require("@angular/core");
var forms_2 = require("@angular/forms");
var core_4 = require("@angular/core");
var zeidon_1 = require("./zeidon");
var ConfigurationComponent = (function () {
    function ConfigurationComponent(restService) {
        this.restService = restService;
    }
    ConfigurationComponent.prototype.save = function () {
        var _this = this;
        this.configOi.commit().subscribe(function (config) {
            _this.configOi = config;
            _this.configurationList.reload();
        });
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
    core_2.ViewChild('configForm'),
    __metadata("design:type", forms_1.NgForm)
], ConfigurationComponent.prototype, "currentForm", void 0);
ConfigurationComponent = __decorate([
    core_1.Component({
        selector: 'configuration-detail',
        template: "\n  <div *ngIf=\"configOi\">\n    <form #configForm=\"ngForm\" >\n      <h2>Configuration Details</h2>\n      <div><label>Id: </label>{{configOi.Configuration$.Id}}</div>\n      <div>\n        <label>Description: </label>\n        <input type=\"text\" id=\"Description\" \n               [(ngModel)]=\"configOi.Configuration$.Description\"\n               placeholder=\"Description\" name=\"Description\"\n        />\n      </div>\n      <div>\n        <label>Target Temperature: </label>\n        <input [(ngModel)]=\"configOi.Configuration$.TargetTemperature\" placeholder=\"target temperature\" name=\"target\"  />\n      </div>\n      \n      <div>\n        <label>PID: </label>\n        <input [(ngModel)]=\"configOi.Configuration$.PidP\" placeholder=\"P\" maxlength=\"2\" size=\"2\" name=\"PidP\"/>\n        <input [(ngModel)]=\"configOi.Configuration$.PidI\" placeholder=\"I\" maxlength=\"5\" size=\"5\" name=\"PidI\"/>\n        <input [(ngModel)]=\"configOi.Configuration$.PidD\" placeholder=\"D\" maxlength=\"2\" size=\"2\" name=\"PidD\"/>\n      </div>\n      <div>\n        <label>Max PWM: </label>\n        <input [(ngModel)]=\"configOi.Configuration$.MaxPWM\" placeholder=\"max PWM\" name=\"maxPwm\"/>\n      </div>\n      <div>\n        <label>Tweet On: </label>\n        <input id=\"TweetOn\"\n            [validateAttributeValue]=\"configOi.Configuration$\"\n            [(ngModel)]=\"configOi.Configuration$.TweetOn\" placeholder=\"tweet on\" name=\"TweetOn\"\n        />\n        <div *ngIf=\"configOi.Configuration$.validateErrors.TweetOn\" class=\"alert alert-danger\">\n          {{ configOi.Configuration$.validateErrors.TweetOn.message }}\n        </div>\n      </div>\n      <div>\n        <label>Tweet Period: </label>\n        <input [(ngModel)]=\"configOi.Configuration$.TweetPeriodInMinutes\" placeholder=\"Tweet period\" name=\"tweetPeriod\"/>\n      </div>\n      <h3>Thermometers</h3>\n      <div *ngFor=\"let therm of configOi.Configuration$.ThermometerConfig; let i = index;\" >\n        <div>\n          <label>name: </label>\n          <input id=\"thermName\" [(ngModel)]=\"therm.Name\" placeholder=\"name\" name=\"thermName.{{i}}\"/>\n        </div>\n      </div>\n      <button (click)=\"save()\" [disabled]=\"! configOi.isUpdated\">\n        Save Configuration\n      </button>\n    </form>\n  </div>\n"
    }),
    __metadata("design:paramtypes", [rest_service_1.RestService])
], ConfigurationComponent);
exports.ConfigurationComponent = ConfigurationComponent;
/** A hero's name can't match the given regular expression */
function attributeValidator(name) {
    console.log("validator- factory");
    return function (control) {
        console.log("validator- AbstractControl");
        var name = control.value;
        return null;
    };
}
exports.attributeValidator = attributeValidator;
var AttributeValidatorDirective = (function () {
    function AttributeValidatorDirective(el, renderer) {
        this.valFn = forms_2.Validators.nullValidator;
        console.log("constructor");
        this.attributeName = el.nativeElement.name;
    }
    /*
        ngOnChanges(changes: SimpleChanges): void {
            const change = changes['attributeValue'];
            console.log("validator- on changes");
            if (change) {
                const val: string = change.currentValue;
                this.valFn = attributeValidator(change.currentValue);
            } else {
                this.valFn = Validators.nullValidator;
            }
        }
    */
    AttributeValidatorDirective.prototype.ngOnInit = function () {
        console.log("onInit");
        this.attributeDef = this.entityInstance.attributeDefs[this.attributeName];
        this.domain = this.entityInstance.getDomainForAttribute(this.attributeName);
    };
    AttributeValidatorDirective.prototype.validate = function (control) {
        if (!control.touched && !control.dirty)
            return null;
        if (!this.domain.domainFunctions)
            return null;
        var value = control.value;
        var errors = this.entityInstance.validateErrors;
        try {
            console.log("Calling domain funcation");
            this.domain.domainFunctions.convertExternalValue(value, this.attributeDef, this.domain);
            errors[this.attributeName] = undefined;
            return null;
        }
        catch (e) {
            console.log("Error: " + e.message);
            errors[this.attributeName] = { message: e.message };
            return errors[this.attributeName];
        }
    };
    return AttributeValidatorDirective;
}());
__decorate([
    core_1.Input("validateAttributeValue"),
    __metadata("design:type", zeidon_1.EntityInstance)
], AttributeValidatorDirective.prototype, "entityInstance", void 0);
AttributeValidatorDirective = __decorate([
    core_3.Directive({
        selector: '[validateAttributeValue]',
        providers: [{ provide: forms_2.NG_VALIDATORS, useExisting: AttributeValidatorDirective, multi: true }]
    }),
    __metadata("design:paramtypes", [core_4.ElementRef, core_4.Renderer])
], AttributeValidatorDirective);
exports.AttributeValidatorDirective = AttributeValidatorDirective;
//# sourceMappingURL=configuration.component.js.map