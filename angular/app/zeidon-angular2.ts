import { OnInit, SimpleChanges, OnChanges } from '@angular/core';
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
export class AttributeValidatorDirective implements Validator, OnInit, OnChanges {
    @Input("validateAttributeValue") entityInstance: any;

    private attributeName: string;
    private attributeDef: any;
    private domain: Domain;

    constructor( private el: ElementRef,
                 private renderer: Renderer,
                 private viewContainer: ViewContainerRef ) {
        console.log("constructor")
        this.attributeName = el.nativeElement.name;
    }

    ngOnInit(): void {
        console.log("validator OnInit" );
        //this.attributeDef = this.entityInstance.getAttributeDef( this.attributeName );
        //this.domain = this.attributeDef.domain;
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log( "ngOnChanges for directive" );
    }

    validate( control ) {
        console.log( "directive validate" );
        if ( control.zeidonErrorMessage ) {
            this.renderer.setElementStyle( this.entityInstance, "display", "" );
            this.entityInstance.innerHTML = control.zeidonErrorMessage;
        } else {
            this.renderer.setElementStyle( this.entityInstance, "display", "none" );
        }
        return null;
    }
}

let domainValidator = function( ei: EntityInstance, attributeDef ) {
    return function( control ) {
        control.zeidonErrorMessage = undefined;
        let domain = attributeDef.domain;
        if ( ! control.touched && ! control.dirty )
            return null;

        if ( ! domain.domainFunctions )
            return null;

        let value = control.value;
        let errors = ei.validateErrors;
        try {
            console.log("Calling domain function" );
            domain.domainFunctions.convertExternalValue( value, attributeDef );
            errors[ attributeDef.name ] = undefined;
            return null;
        }
        catch( e ) {
            console.log( `Error: ${e.message}`);
            control.zeidonErrorMessage = e.message;
            errors[ attributeDef.name ] = { message: e.message };
            return errors[ attributeDef.name ];
        }
    };
};

export interface ZeidonFormBuilderOptions {
    childEntities? : string[] // If undefined then add all, otherwise list of child entities to be added.
}

export class ZeidonFormBuilder {
    public group( ei       : EntityInstance,
                  options? : ZeidonFormBuilderOptions,
                  form?    : FormGroup ) : FormGroup {

        // Set default values
        options = options || {};
        form = form || new FormGroup({});

        form.addControl( "fingerprint", new FormControl( ei.fingerprint ) );

        // Add a FormControl to the form for each attribute.
        let entityDef = ei.entityDef;
        for ( let attrName in entityDef.attributes ) {
            let attributeDef = ei.getAttributeDef( attrName );
            if ( attributeDef.hidden )
                continue;

            let value = ei.getAttribute( attrName);
            form.addControl( attrName, new FormControl( value, domainValidator( ei, attributeDef ) ) );
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
