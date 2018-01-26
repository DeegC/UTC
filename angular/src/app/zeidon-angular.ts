/**
 * Classes for dealing specifically with Angular 2+ apps.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Input } from '@angular/core';
import { ElementRef, Renderer, Renderer2, ViewContainerRef } from '@angular/core';
import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { ObjectInstance, EntityInstance, Domain } from './zeidon';
import { FormGroup, FormControl, FormArray, Validators, NgControl } from '@angular/forms';
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { ZeidonConfiguration } from './zeidon';
import { ZeidonRestValues, RestActivator, RestCommitter } from './zeidon-rest-client';

@Directive( {
    selector: '[attributeContext]',
} )
export class AttributeContextDirective implements OnChanges {
    @Input( "attributeContext" ) context: any;

    constructor( private el: ElementRef,
                 private ngControl: NgControl,
                 private renderer: Renderer2,
                 private viewContainer: ViewContainerRef ) {
    }

    ngOnChanges( changes: SimpleChanges ) {
        // Set the zeidonContext to undefined.  This will force the value of
        // the control to be reset with the new context.
        (this.ngControl.control as any).zeidonContext = undefined;
        this.setValueWithContext();
    }

    ngDoCheck(): void {
        this.setValueWithContext();
    }

    private setValueWithContext() {
        let control = this.ngControl.control as any;

        // If the zeidonContext for this control has been set then we don't need
        // to set the value because it's already been done.
        if ( control.zeidonContext )
            return;

        let ei = control.entityInstance;
        let attributeDef = control.attributeDef;
        let value = ei ? ei.getAttribute( attributeDef.name, this.context ) : undefined;
        control.setValue( value );
        control.zeidonContext = this.context;
        control.root.controlsWithContext.push(control);
    }
}

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
    private control: AbstractControl;

    constructor( private el: ElementRef,
                 private renderer: Renderer2,
                 private viewContainer: ViewContainerRef ) {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
    }

    registerOnValidatorChange( control ) {
        // Do nothing for now.  This method is necessary to prevent an exception when
        // called from Angular logic.
    }

    /**
     * Add entity, attribute, and domain names to the element's class.
     * @param control
     */
    private initControl( control ) {
        this.control = control;
        this.renderer.addClass( this.el.nativeElement, `attr_${control.attributeDef.name}` );
        this.renderer.addClass( this.el.nativeElement, `entity_${control.entityDef.name}` );
        this.renderer.addClass( this.el.nativeElement, `domain_${control.attributeDef.domain.name}` );
    }

    /**
     * This doesn't actually do any validation.  It checks to see if there is an error message
     * associated with the control.  If there is, update the elements with the appropriate
     * styles/classes.
     */
    validate( control ) {
        if ( ! this.control )
            this.initControl( control );

        if ( control.zeidonErrorMessage ) {
            if ( this.errorElement ) {
                this.renderer.setStyle( this.errorElement, "display", "" );
                this.errorElement.innerHTML = control.zeidonErrorMessage;
            }
        } else {
            if ( this.errorElement ) {
                this.renderer.setStyle( this.errorElement, "display", "none" );
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
                  options?: ZeidonFormBuilderOptions ): FormGroup {
        return this.buildForms( ei, ei.oi.getLodDef(), ei.entityDef, options, undefined );
    }

    private buildForms( ei        : EntityInstance,
                        lodDef    : any,
                        entityDef : any,
                        options?  : ZeidonFormBuilderOptions,
                        form?     : FormGroup ) : FormGroup {

        // Set default values
        options = options || {};

        // Create the root form if it doesn't exist.
        if ( ! form ) {
            form = new FormGroup({});

            // Create an empty array on the root to keep track of which
            // controls have Zeidon contexts.
            (form as any).controlsWithContext = [];
        }

        // Add a FormControl to the form for each attribute.  If ei is blank
        // then set the attribute value to undefined and read-only.  This allows the page
        // to display a non-existent entity instance without throwing an error.
        for ( let attrName in entityDef.attributes ) {
            let attributeDef = entityDef.attributes[ attrName ];
            if ( attributeDef.hidden )
                continue;

            let value = ei ? ei.getAttribute( attrName) : undefined;
            let formControl = new FormControl( value, domainValidator( entityDef, attributeDef ) );

            // Add entityDef and attributeDef to the control so it can be used later to add to the class.
            // (See ErrorElementDirective.)
            let fc = formControl as any;
            fc.entityDef = entityDef;
            fc.attributeDef = attributeDef;
            fc.entityInstance = ei;

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

export interface ZeidonFormReaderOptions {
}

export class ZeidonFormReader {
    public readForm( oi: ObjectInstance,
                     form: FormGroup,
                     options?: ZeidonFormReaderOptions ) {

        // Apply the domain to convert the external value to the internal value.
        for ( let control of (form as any).controlsWithContext ) {
            let attributeDef = control.attributeDef;
            let value;

            if ( attributeDef.domain && attributeDef.domain && attributeDef.domain.domainFunctions ) {
                value = attributeDef.domain && attributeDef.domain.domainFunctions.convertExternalValue( control.value, attributeDef, control.zeidonContext );
                console.log( `Setting value to ${value}` )
                control.setValue( value );
            }
        }

        oi.root.selected().update( form.value );
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
    constructor( private http: HttpClient ) {}

    get( url: string ) : Promise<any> {
        return this.http.get( url ).map( response => { return { body: response } } ).toPromise();
    }

    post( url: string, body: string, headers?: string | { [ name: string]: string | string[]; } ) : Promise<any> {
        return this.http.post( url, body, { headers: new HttpHeaders( headers ) } )
                        .map( response => { return { body: response } } ).toPromise();
    }
}

@Injectable()
export class ZeidonAngularConfiguration extends ZeidonConfiguration {
    constructor( private values: ZeidonRestValues, private http: HttpClient ) {
        super( new RestActivator( values, new HttpWrapper( http ) ),
               new RestCommitter( values, new HttpWrapper( http ) ) );
        console.log("--- ZeidonRestConfiguration --- " + values.restUrl );
    }
}

@Injectable()
export class ZeidonRestService {
    constructor( private http: HttpClient,
                 private values: ZeidonRestValues ) { }

    /**
     * Deletes a root entity instance (and all its children) just from the
     * EI id.
     *
     * @param root
     */
    deleteRoot( root: EntityInstance ) {
        let oi = root.oi;
        let lodName = oi.getLodDef().name;
        let url = `${this.values.restUrl}/${lodName}/${root.key}`;
        this.http.delete( url )
            .toPromise()
            .then(() => root.drop() )
            .catch(( error: any ) => { throw ( error || 'Server error' ) } );
    }

    deleteOi( oi: ObjectInstance ) {
        // For now we only handle a single root.  No real reason it can't handle more
        // but the semantics of calling the server need to be worked out.
        if ( oi.root.length != 1 )
            throw ( "deleteOi may only be called on OI with a single root." );

        let lodName = oi.getLodDef().name;
        let url = `${this.values.restUrl}/${lodName}/${oi.root[ 0 ].key}`;
        this.http.delete( url )
            .toPromise()
            .then(() => oi.root[ 0 ].drop() )
            .catch(( error: any ) => { throw( error.json().error || 'Server error' ) } );
    }
}