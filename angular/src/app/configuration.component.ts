import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Configuration } from './lod/Configuration';
import { RestService } from './rest.service';
import { Configuration_ThermometerConfig } from './lod/Configuration';
import { Session } from './lod/Session';
import { FormGroup, Validators } from '@angular/forms';
import * as zeidon from './zeidon-angular';

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
               formControlName="Description" [zeidonErrorElement]="descriptionError"
               placeholder="Description"
        />
      </div>
      <div #descriptionError class="alert alert-danger" style="display:none"></div>

      <div>
        <label>Target Temperature: </label>
        <input type="number" formControlName="TargetTemperature" [zeidonErrorElement]="targetError"
               placeholder="target temperature" style="width:3em" />
      </div>
      <div #targetError class="alert alert-danger" style="display:none"></div>

      <div>
        <label>PID: </label>
        <input type="number" formControlName="PidP" [zeidonErrorElement]="pidError"
            placeholder="P" maxlength="2" style="width:3em" />
        <input formControlName="PidI" [zeidonErrorElement]="pidError"
            placeholder="I" maxlength="5" style="width:3em" />
        <input formControlName="PidD" [zeidonErrorElement]="pidError"
            placeholder="D" maxlength="2" style="width:3em" />
      </div>
      <div #pidError class="alert alert-danger" style="display:none"></div>

      <div>
        <label>Max PWM: </label>
        <input type="number" formControlName="MaxPWM" [zeidonErrorElement]="pwmError"
               placeholder="max PWM" style="width:3em" />
      </div>
      <div #pwmError class="alert alert-danger" style="display:none"></div>

      <div>
        <label>PWM Frequency: </label>
        <input type="number" formControlName="PwmFrequency" [zeidonErrorElement]="freqError"
               placeholder="freq" style="width:3em" />
      </div>
      <div #freqError class="alert alert-danger" style="display:none"></div>

      <div>
        <label>Tweet On: </label>
        <input type="checkbox"
            formControlName="TweetOn" placeholder="tweet on" [zeidonErrorElement]="tweetError"
        />
        <div #tweetError class="alert alert-danger" style="display:none"></div>
      </div>

      <h3>Thermometers</h3>
      <div formArrayName="ThermometerConfig">
        <div *ngFor="let therm of form.controls.ThermometerConfig.controls; let i = index;" >
            <div [formGroupName]="i">
                <label>{{i + 1}}</label>
                <input type="text" formControlName="Name" placeholder="name" [zeidonErrorElement]="thermError"  />
                <input type="checkbox" formControlName="AlarmOn" [zeidonErrorElement]="thermError" />
                <input type="number" formControlName="AlarmLow" placeholder="low"
                       [zeidonErrorElement]="thermError" maxlength="2" style="width:3em" />
                <input type="number" formControlName="AlarmHigh" placeholder="high"
                       [zeidonErrorElement]="thermError" maxlength="2" style="width:3em" />
                <img src="/img/icons/red-x.png" (click)="deleteThermometer( form.controls.ThermometerConfig, i )"/>
            </div>
            <div #thermError class="alert alert-danger" style="display:none"></div>
        </div>
      </div>

      <div>
        <button type="button" class="btn btn-default" (click)="newThermometer()"
               [disabled]="configOi.Configuration$.ThermometerConfig.length > 7" >
            New Thermometer
        </button>
      </div>
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
        // Commit the current changes to the config.
        this.configOi.commit().subscribe(configOi => {
            this.configOi = configOi;
            this.configurationList.reload();
            // Now call the server to start a new session.
            this.restService
                .startSession( configOi )
                .subscribe( sessionOi => this.onSessionStarted.emit( sessionOi ) );
        });
    }

    cancel(): void {
        this.configOi = undefined;
    }

    deleteThermometer( therm: any, index: number ): void {
        therm.removeAt( index );
    }

    newThermometer(): void {
        // Copy any changed values to the OI
        this.configOi.Configuration$.update( this.form.value );
        // Create the new entity.
        this.configOi.Configuration$.ThermometerConfig.create({Name: "New therm" });
        // Rebuild the form with the new therm.
        this.buildForm();
    }
}
