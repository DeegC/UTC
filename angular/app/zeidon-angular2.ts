import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ElementRef, Renderer, ViewContainerRef } from '@angular/core';
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { EntityInstance, Domain } from './zeidon';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Directive({
    selector: '[validateAttributeValue]',
    providers: [{ provide: NG_VALIDATORS, useExisting: AttributeValidatorDirective, multi: true }]
})
export class AttributeValidatorDirective implements Validator, OnInit {
    @Input("validateAttributeValue") entityInstance: EntityInstance;

    private attributeName: string;
    private attributeDef: any;
    private domain: Domain;

    constructor( private el: ElementRef, 
                 private renderer: Renderer, 
                 private vieweContainer: ViewContainerRef ) {
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

export class ZeidonFormBuilder {
    public group( ei: EntityInstance, 
           options?: { 
               childEntities? : string[] // If undefined then add all, otherwise list of child entities to be added.
           },
           form? : FormGroup ) : FormGroup {

        options = options || {};
        form = form || new FormGroup({});

        let entityDef = ei.entityDef;
        for ( let attrName in entityDef.attributes ) {
            let attributeDef = ei.getAttributeDef( attrName );
            form.addControl( attrName, new FormControl( ei.getAttribute( attrName) ) );
        };

        for ( let entityName in entityDef.childEntities ) {
            if ( options.childEntities && options.childEntities.indexOf( entityName ) == -1 ) {
                continue;
            }

            let entities = ei.getChildEntityArray( entityName ) 
            if ( entities.length == 0 )
                continue;

            let entityInfo = entityDef.childEntities[ entityName ];
            if ( entityInfo.cardMax == 1 ) {
                let formGroup = this.group( entities[ 0 ], options );
                form.addControl( entityName, formGroup );
            } else {
                let formArray = new FormArray([]);
                for ( let child of entities ) {
                    let formGroup = this.group( child, options );
                    formArray.push( formGroup );
                }
                form.addControl( entityName, formArray );
            }
        }

        return form;
    }
}
