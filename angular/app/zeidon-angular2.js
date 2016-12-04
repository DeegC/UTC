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
var forms_2 = require("@angular/forms");
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
var ZeidonFormBuilder = (function () {
    function ZeidonFormBuilder() {
    }
    ZeidonFormBuilder.prototype.group = function (ei, options, form) {
        options = options || {};
        form = form || new forms_2.FormGroup({});
        var entityDef = ei.entityDef;
        for (var attrName in entityDef.attributes) {
            var attributeDef = ei.getAttributeDef(attrName);
            form.addControl(attrName, new forms_2.FormControl(ei.getAttribute(attrName)));
        }
        ;
        for (var entityName in entityDef.childEntities) {
            if (options.childEntities && options.childEntities.indexOf(entityName) == -1) {
                continue;
            }
            var entities = ei.getChildEntityArray(entityName);
            if (entities.length == 0)
                continue;
            var entityInfo = entityDef.childEntities[entityName];
            if (entityInfo.cardMax == 1) {
                var formGroup = this.group(entities[0], options);
                form.addControl(entityName, formGroup);
            }
            else {
                var formArray = new forms_2.FormArray([]);
                for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
                    var child = entities_1[_i];
                    var formGroup = this.group(child, options);
                    formArray.push(formGroup);
                }
                form.addControl(entityName, formArray);
            }
        }
        return form;
    };
    return ZeidonFormBuilder;
}());
exports.ZeidonFormBuilder = ZeidonFormBuilder;
//# sourceMappingURL=zeidon-angular2.js.map