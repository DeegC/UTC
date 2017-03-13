/**
 * Classes for dealing specifically with Angular 2+ apps.
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
/**
 * When added to an input element, this will automatically set the value of
 * the error element to display the attribute error.
 */
var ErrorElementDirective = ErrorElementDirective_1 = (function () {
    function ErrorElementDirective(el, renderer, viewContainer) {
        this.el = el;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
        console.log("constructor");
        this.attributeName = el.nativeElement.attributes.formControlName;
    }
    ErrorElementDirective.prototype.ngOnInit = function () {
        console.log("validator OnInit");
        //this.attributeDef = this.entityInstance.getAttributeDef( this.attributeName );
        //this.domain = this.attributeDef.domain;
    };
    ErrorElementDirective.prototype.ngOnChanges = function (changes) {
        console.log("ngOnChanges for directive");
    };
    ErrorElementDirective.prototype.registerOnValidatorChange = function (control) {
        // Do nothing for now.  This method is necessary to prevent an exception when
        // called from Angular logic.
    };
    /**
     * This doesn't actually do any validation.  It checks to see if there is an error message
     * associated with the control.  If there is, update the elements with the appropriate
     * styles/classes.
     */
    ErrorElementDirective.prototype.validate = function (control) {
        if (control.zeidonErrorMessage) {
            if (this.errorElement) {
                this.renderer.setElementStyle(this.errorElement, "display", "");
                this.errorElement.innerHTML = control.zeidonErrorMessage;
            }
        }
        else {
            if (this.errorElement) {
                this.renderer.setElementStyle(this.errorElement, "display", "none");
            }
        }
        return null;
    };
    return ErrorElementDirective;
}());
__decorate([
    core_1.Input("zeidonErrorElement"),
    __metadata("design:type", Object)
], ErrorElementDirective.prototype, "errorElement", void 0);
ErrorElementDirective = ErrorElementDirective_1 = __decorate([
    core_3.Directive({
        selector: '[zeidonErrorElement]',
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: ErrorElementDirective_1, multi: true }]
    }),
    __metadata("design:paramtypes", [core_2.ElementRef,
        core_2.Renderer,
        core_2.ViewContainerRef])
], ErrorElementDirective);
exports.ErrorElementDirective = ErrorElementDirective;
var domainValidator = function (ei, attributeDef) {
    return function (control) {
        control.zeidonErrorMessage = undefined;
        var domain = attributeDef.domain;
        if (!control.touched && !control.dirty)
            return null;
        if (!domain.domainFunctions)
            return null;
        var value = control.value;
        try {
            domain.domainFunctions.convertExternalValue(value, attributeDef);
            return null;
        }
        catch (e) {
            console.log("Error: " + e.message);
            control.zeidonErrorMessage = e.message;
            var errors = {};
            errors[attributeDef.name] = { message: e.message };
            return errors[attributeDef.name];
        }
    };
};
var ZeidonFormBuilder = (function () {
    function ZeidonFormBuilder() {
    }
    ZeidonFormBuilder.prototype.group = function (ei, options, form) {
        // Set default values
        options = options || {};
        form = form || new forms_2.FormGroup({});
        form.addControl("fingerprint", new forms_2.FormControl(ei.fingerprint));
        // Add a FormControl to the form for each attribute.
        var entityDef = ei.entityDef;
        for (var attrName in entityDef.attributes) {
            var attributeDef = ei.getAttributeDef(attrName);
            if (attributeDef.hidden)
                continue;
            var value = ei.getAttribute(attrName);
            form.addControl(attrName, new forms_2.FormControl(value, domainValidator(ei, attributeDef)));
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
var ErrorElementDirective_1;
//# sourceMappingURL=zeidon-angular.js.map