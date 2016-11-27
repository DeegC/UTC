import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ElementRef, Renderer } from '@angular/core';
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { EntityInstance, Domain } from './zeidon';

@Directive({
    selector: '[validateAttributeValue]',
    providers: [{ provide: NG_VALIDATORS, useExisting: AttributeValidatorDirective, multi: true }]
})
export class AttributeValidatorDirective implements Validator, OnInit {
    @Input("validateAttributeValue") entityInstance: EntityInstance;

    private attributeName: string;
    private attributeDef: any;
    private domain: Domain;

    constructor(el: ElementRef, renderer: Renderer) {
        console.log("constructor")
        this.attributeName = el.nativeElement.name;
    }

    ngOnInit(): void {
        this.attributeDef = this.entityInstance.getAttributeDef( this.attributeName );
        this.domain = this.attributeDef.domain;
    }

    validate(control: AbstractControl): { [key: string]: any } {
        if ( ! control.touched && ! control.dirty )
            return null;

        if ( ! this.domain.domainFunctions )
            return null;

        let value = control.value;
        let errors = this.entityInstance.validateErrors;
        try {
            console.log("Calling domain funcation" );
            this.domain.domainFunctions.convertExternalValue( value, this.attributeDef );
            errors[ this.attributeName ] = undefined;
            return null;
        }
        catch( e ) {
            console.log( `Error: ${e.message}`);
            errors[ this.attributeName ] = { message: e.message };
            return errors[ this.attributeName ];
        }
    }
}
