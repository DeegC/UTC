/**
 * Classes for dealing specifically with Angular 2+ apps.
 */
import { Headers, Http, RequestOptions } from '@angular/http';
import { OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Input } from '@angular/core';
import { ElementRef, Renderer, ViewContainerRef } from '@angular/core';
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { ObjectInstance, EntityInstance, Domain } from './zeidon';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { ZeidonConfiguration } from './zeidon';
import { ZeidonRestValues, RestActivator, RestCommitter } from './zeidon-rest-client';

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

let domainValidator = function( entityDef: any, attributeDef ) {
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
    public group( ei: EntityInstance,
                  options?: ZeidonFormBuilderOptions,
                  form?: FormGroup ): FormGroup {
        return this.buildForms( ei, ei.oi.getLodDef(), ei.entityDef, options, form );
    }

    buildForms( ei        : EntityInstance,
                lodDef    : any,
                entityDef : any,
                options?  : ZeidonFormBuilderOptions,
                form?     : FormGroup ) : FormGroup {

        // Set default values
        options = options || {};
        form = form || new FormGroup({});

        // Add a FormControl to the form for each attribute.  If ei is blank
        // then set the attribute value to undefined and read-only.  This allows the page
        // to display a non-existent entity isntance without throwing an error.
        for ( let attrName in entityDef.attributes ) {
            let attributeDef = entityDef.attributes[ attrName ];
            if ( attributeDef.hidden )
                continue;

            let value = ei ? ei.getAttribute( attrName) : undefined;
            let formControl = new FormControl( value, domainValidator( entityDef, attributeDef ) );

            // If the attribute is not updatable for some reason then set it as disabled.
            // If ei == undefined then there is no valid entity instance.
            if ( attributeDef.update === false || entityDef.updatable === false || ! ei || ei.oi.readOnly )
                formControl.disable();

            form.addControl( attrName, formControl );
        };

        if ( ! ei )
            return form;

        // Add the fingerprint so we can match up EIs later.
        form.addControl( "fingerprint", new FormControl( ei.fingerprint ) );

        for ( let entityName in entityDef.childEntities ) {
            if ( options.childEntities && options.childEntities.indexOf( entityName ) == -1 ) {
                continue;
            }

            let entities = ei.getChildEntityArray( entityName );
            let childEntityDef = lodDef.entities[ entityName ];
            if ( childEntityDef.cardMax === 1 ) {
                let formGroup = this.buildForms( entities[ 0 ], lodDef, childEntityDef, options );
                form.addControl( entityName, formGroup );
            } else {
                let formArray = new FormArray([]);
                for ( let child of entities ) {
                    let formGroup = this.buildForms( child, lodDef, childEntityDef, options );
                    formArray.push( formGroup );
                }
                form.addControl( entityName, formArray );
            }
        }

        return form;
    }
}

/**
 * Components with OIs that need to be dropped (e.g. locked OIs that need to have
 * their locks removed) implement this interface.  The deactivator will use the method
 * to find views to drop.
 */
export interface ZeidonComponentWithOis {
    getOis: () => ObjectInstance[];
}

/**
 * This will drop OIs when a component is deactivated.
 */
export class DropViewsOnDeactivate implements CanDeactivate<ZeidonComponentWithOis> {

    canDeactivate(target: ZeidonComponentWithOis) {
        console.log( "Deactivate: dropping OIs" );
        let ois = target.getOis();
        if ( ois ) {
            for ( let oi of ois ) {
                oi.drop();
            }
        }
        return true;
    }
}

/**
 * Converts calls from Angular HTTP to Zeidon's HttpClient.
 */
class HttpWrapper {
    constructor( private http: Http ) {}

    get( url: string ) : Observable<any> {
        return this.http.get( url ).map( response => { return { "body": response.text() } } );
    }

    post( url: string, body: string, headers: Object ) : Observable<any> {
        let rheaders = new Headers( headers );
        let reqOptions = new RequestOptions({ headers: rheaders });
        return this.http.post( url, body, reqOptions).map( response => { return { "body": response.text() } } );
    }
}

@Injectable()
export class ZeidonAngularConfiguration extends ZeidonConfiguration {
    constructor( private values: ZeidonRestValues, private http: Http ) {
        super( new RestActivator( values, new HttpWrapper( http ) ),
               new RestCommitter( values, new HttpWrapper( http ) ) );
        console.log("--- ZeidonRestConfiguration --- " + values.restUrl );
    }
}
