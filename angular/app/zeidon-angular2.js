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
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var forms_1 = require("@angular/forms");
var zeidon_1 = require("./zeidon");
var AttributeValidatorDirective = (function () {
    function AttributeValidatorDirective(el, renderer, vieweContainer) {
        this.el = el;
        this.renderer = renderer;
        this.vieweContainer = vieweContainer;
        console.log("constructor");
        this.attributeName = el.nativeElement.name;
    }
    AttributeValidatorDirective.prototype.ngOnInit = function () {
        this.attributeDef = this.entityInstance.getAttributeDef(this.attributeName);
        this.domain = this.attributeDef.domain;
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
            this.domain.domainFunctions.convertExternalValue(value, this.attributeDef);
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
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: AttributeValidatorDirective, multi: true }]
    }),
    __metadata("design:paramtypes", [core_2.ElementRef,
        core_2.Renderer,
        core_2.ViewContainerRef])
], AttributeValidatorDirective);
exports.AttributeValidatorDirective = AttributeValidatorDirective;
//# sourceMappingURL=zeidon-angular2.js.map