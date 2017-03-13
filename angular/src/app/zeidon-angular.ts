/**
 * Classes for dealing specifically with Angular 2+ apps.
 */

import { OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Input } from '@angular/core';
import { ElementRef, Renderer, ViewContainerRef } from '@angular/core';
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { EntityInstance, Domain } from './zeidon';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

/**
 * When added to an input element, this will automatically set the value of
 * the error element to display the attribute error.
 */
@Directive({
    selector: '[zeidonErrorElement]',
    providers: [{ provide: NG_VALIDATORS, useExisting: ErrorElementDirective, multi: true }]
})
export class ErrorElementDirective implements Validator, OnInit, OnChanges {
    @Input("zeidonErrorElement") errorElement: any;

    private attributeName: string;
    private attributeDef: any;
    private domain: Domain;

    constructor( private el: ElementRef,
                 private renderer: Renderer,
                 private viewContainer: ViewContainerRef ) {
        console.log("constructor")
        this.attributeName = el.nativeElement.attributes.formControlName;
    }

    ngOnInit(): void {
        console.log("validator OnInit" );
        //this.attributeDef = this.entityInstance.getAttributeDef( this.attributeName );
        //this.domain = this.attributeDef.domain;
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log( "ngOnChanges for directive" );
    }

    registerOnValidatorChange( control ) {
        // Do nothing for now.  This method is necessary to prevent an exception when
        // called from Angular logic.
    }

    /**
     * This doesn't actually do any validation.  It checks to see if there is an error message
     * associated with the control.  If there is, update the elements with the appropriate
     * styles/classes.
     */
    validate( control ) {
        if ( control.zeidonErrorMessage ) {
            if ( this.errorElement ) {
                this.renderer.setElementStyle( this.errorElement, "display", "" );
                this.errorElement.innerHTML = control.zeidonErrorMessage;
            }
        } else {
            if ( this.errorElement ) {
                this.renderer.setElementStyle( this.errorElement, "display", "none" );
            }
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
        try {
            domain.domainFunctions.convertExternalValue( value, attributeDef );
            return null;
        }
        catch( e ) {
            console.log( `Error: ${e.message}`);
            control.zeidonErrorMessage = e.message;
            let errors = {};
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
