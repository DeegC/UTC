import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { Configuration } from './Configuration';
import { RestService } from './rest.service';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Directive, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';
import { ElementRef, Renderer } from '@angular/core';
import { EntityInstance, Domain } from './zeidon';

@Component({
    selector: 'configuration-detail',
    template: `
  <div *ngIf="configOi">
    <form #configForm="ngForm" >
      <h2>Configuration Details</h2>
      <div><label>Id: </label>{{configOi.Configuration$.Id}}</div>
      <div>
        <label>Description: </label>
        <input type="text" id="Description" 
               [(ngModel)]="configOi.Configuration$.Description"
               placeholder="Description" name="Description"
        />
      </div>
      <div>
        <label>Target Temperature: </label>
        <input [(ngModel)]="configOi.Configuration$.TargetTemperature" placeholder="target temperature" name="target"  />
      </div>
      
      <div>
        <label>PID: </label>
        <input [(ngModel)]="configOi.Configuration$.PidP" placeholder="P" maxlength="2" size="2" name="PidP"/>
        <input [(ngModel)]="configOi.Configuration$.PidI" placeholder="I" maxlength="5" size="5" name="PidI"/>
        <input [(ngModel)]="configOi.Configuration$.PidD" placeholder="D" maxlength="2" size="2" name="PidD"/>
      </div>
      <div>
        <label>Max PWM: </label>
        <input [(ngModel)]="configOi.Configuration$.MaxPWM" placeholder="max PWM" name="maxPwm"/>
      </div>
      <div>
        <label>Tweet On: </label>
        <input id="TweetOn"
            [validateAttributeValue]="configOi.Configuration$"
            [(ngModel)]="configOi.Configuration$.TweetOn" placeholder="tweet on" name="TweetOn"
        />
        <div *ngIf="configOi.Configuration$.validateErrors.TweetOn" class="alert alert-danger">
          {{ configOi.Configuration$.validateErrors.TweetOn.message }}
        </div>
      </div>
      <div>
        <label>Tweet Period: </label>
        <input [(ngModel)]="configOi.Configuration$.TweetPeriodInMinutes" placeholder="Tweet period" name="tweetPeriod"/>
      </div>
      <h3>Thermometers</h3>
      <div *ngFor="let therm of configOi.Configuration$.ThermometerConfig; let i = index;" >
        <div>
          <label>name: </label>
          <input id="thermName" [(ngModel)]="therm.Name" placeholder="name" name="thermName.{{i}}"/>
        </div>
      </div>
      <button (click)="save()" [disabled]="! configOi.isUpdated">
        Save Configuration
      </button>
    </form>
  </div>
`
})
export class ConfigurationComponent {
    @Input()
    configOi: Configuration;
    @Input()
    configurationList: Configuration;
    @ViewChild('configForm')
    currentForm: NgForm;

    constructor(private restService: RestService) { }

    save(): void {
        this.configOi.commit().subscribe(config => {
            this.configOi = config;
            this.configurationList.reload();
        });
    }
}

/** A hero's name can't match the given regular expression */
export function attributeValidator(name: string): ValidatorFn {
    console.log("validator- factory");
    return (control: AbstractControl): { [key: string]: any } => {
        console.log("validator- AbstractControl");
        const name = control.value;
        return null;
    };
}

@Directive({
    selector: '[validateAttributeValue]',
    providers: [{ provide: NG_VALIDATORS, useExisting: AttributeValidatorDirective, multi: true }]
})
export class AttributeValidatorDirective implements Validator, OnInit {
    @Input("validateAttributeValue") entityInstance: EntityInstance;

    private valFn = Validators.nullValidator;
    private attributeName: string;
    private attributeDef: any;
    private domain: Domain;

    constructor(el: ElementRef, renderer: Renderer) {
        console.log("constructor")
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

    ngOnInit(): void {
        console.log( "onInit" );
        this.attributeDef = this.entityInstance.attributeDefs[ this.attributeName ];
        this.domain = this.entityInstance.getDomainForAttribute( this.attributeName );
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
            this.domain.domainFunctions.convertExternalValue( value, this.attributeDef, this.domain );
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
