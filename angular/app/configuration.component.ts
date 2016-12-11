import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Configuration } from './Configuration';
import { RestService } from './rest.service';
import { Configuration_ThermometerConfig } from './Configuration';
import { Session } from './Session';
import { FormGroup, Validators } from '@angular/forms';
import * as zeidon from './zeidon-angular2';

@Component({
    moduleId:  module.id,
    selector: 'configuration-detail',
    template: `
  <div *ngIf="configOi">
    <form [formGroup]="form" (ngSubmit)="saveConfig($event)">
      <h2>Configuration Details</h2>
      <div>
        <label>Id: </label>{{configOi.Configuration$.Id}}
      </div>
      <div>
        <label>Description: </label>
        <input type="text"
               formControlName="Description"
               placeholder="Description"
        />
      </div>
      <div>
        <label>Target Temperature: </label>
        <input formControlName="TargetTemperature" placeholder="target temperature"  />
      </div>

      <div>
        <label>PID: </label>
        <input formControlName="PidP"
            placeholder="P" maxlength="2" size="2"/>
        <input formControlName="PidI" placeholder="I" maxlength="5" size="5" />
        <input formControlName="PidD"
            placeholder="D" maxlength="2" size="2"/>
      </div>
        <div name="pidError" *ngIf="configOi.Configuration$.validateErrors.PidP" class="alert alert-danger">
            {{ configOi.Configuration$.validateErrors.PidP.message }}
        </div>
        <div *ngIf="configOi.Configuration$.validateErrors.PidI" class="alert alert-danger">
            {{ configOi.Configuration$.validateErrors.PidI.message }}
        </div>
        <div *ngIf="configOi.Configuration$.validateErrors.PidD" class="alert alert-danger">
            {{ configOi.Configuration$.validateErrors.PidD.message }}
        </div>
      <div>
        <label>Max PWM: </label>
        <input formControlName="MaxPWM" placeholder="max PWM"/>
      </div>
      <div>
        <label>Tweet On: </label>
        <input id="TweetOn"
            formControlName="TweetOn" placeholder="tweet on" [validateAttributeValue]="tweetError"
        />
        <div #tweetError class="alert alert-danger" style="display:none">
        </div>
      </div>
      <div>
        <label>Tweet Period: </label>
        <input formControlName="TweetPeriodInMinutes" placeholder="Tweet period"/>
      </div>

      <h3>Thermometers</h3>
      <div formArrayName="ThermometerConfig">
        <div *ngFor="let therm of form.controls.ThermometerConfig.controls; let i = index;" >
            <div [formGroupName]="i">
                <label>name: </label>
                <input formControlName="Name" placeholder="name" />
                <img src="/img/icons/red-x.png" (click)="deleteThermometer( therm )"/>
            </div>
        </div>
      </div>

<!--
      <div>
        <button type="button" class="btn btn-default" (click)="newThermometer()"
               [disabled]="configOi.Configuration$.ThermometerConfig.length > 3" >
            New Thermometer
        </button>
      </div>
-->
      <div>
        <button type="submit" class="btn btn-default" [disabled]="false">
            Save Configuration
        </button>
        <button type="button" class="btn btn-default" (click)="cancel()" >
            Cancel
        </button>
      </div>
      <div>
        <button type="button" class="btn btn-default" (click)="startSession()" >
            Start Session
        </button>
      </div>
    </form>
  </div>
`
})
export class ConfigurationComponent implements OnChanges {
    @Input() configOi: Configuration;
    @Input() configurationList: Configuration;
    @Output() onSessionStarted = new EventEmitter<Session>();
    form: FormGroup;

    constructor(private restService: RestService) {
    }

    // ngOnInit() {
    //     console.log("nOnInit");
    // }

    ngOnChanges(changes: SimpleChanges) {
        this.buildForm();
        console.log( "ngOnChanges for configuration" );
    }

    buildForm() {
        this.form = new zeidon.ZeidonFormBuilder().group( this.configOi.Configuration$ );
    }

    saveConfig( event ): void {
        this.configOi.Configuration$.update( this.form.value );
        this.configOi.commit().subscribe(config => {
            this.configOi = config;
            this.buildForm();
            this.configurationList.reload();
        });
    }

    startSession(): void {
        this.configOi.commit().subscribe(configOi => {
            this.configOi = configOi;
            this.configurationList.reload();
            this.restService
                .startSession( configOi )
                .subscribe( sessionOi => this.onSessionStarted.emit( sessionOi ) );
        });
    }

    cancel(): void {
        this.configOi = undefined;
    }

    deleteThermometer( therm: Configuration_ThermometerConfig ): void {
        therm.delete();
    }

    newThermometer(): void {
        this.configOi.Configuration$.ThermometerConfig.create({Name: "New therm" });
    }
}
