import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Configuration } from './Configuration';
import { RestService } from './rest.service';
import { Configuration_ThermometerConfig } from './Configuration';
import { Session } from './Session';

@Component({
    moduleId:  module.id,
    selector: 'configuration-detail',
    template: `
  <div *ngIf="configOi">
    <form>
      <h2>Configuration Details</h2>
      <div><label>Id: </label>{{configOi.Configuration$.Id}}</div>
      <div>
        <label>Description: </label>
        <input type="text"
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
        <input [(ngModel)]="configOi.Configuration$.PidP" 
            [validateAttributeValue]="configOi.Configuration$"
            placeholder="P" maxlength="2" size="2" name="PidP"/>
        <input [(ngModel)]="configOi.Configuration$.PidI" placeholder="I" maxlength="5" size="5" name="PidI"/>
        <input [(ngModel)]="configOi.Configuration$.PidD"
            [validateAttributeValue]="configOi.Configuration$"
            placeholder="D" maxlength="2" size="2" name="PidD"/>
      </div>
        <div *ngIf="configOi.Configuration$.validateErrors.PidP" class="alert alert-danger">
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
          <input [(ngModel)]="therm.Name" placeholder="name" name="thermName.{{i}}"/>
          <img src="/img/icons/red-x.png" (click)="deleteThermometer( therm )"/>
        </div>
      </div>
      <div>
        <button type="button" class="btn btn-default" (click)="newThermometer()" 
               [disabled]="configOi.Configuration$.ThermometerConfig.length > 3" >
            New Thermometer
        </button>
      </div>

      <div>
        <button type="button" class="btn btn-default" (click)="save()" [disabled]="! configOi.isUpdated">
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
export class ConfigurationComponent {
    @Input() configOi: Configuration;
    @Input() configurationList: Configuration;
    @Output() onSessionStarted = new EventEmitter<Session>();

    constructor(private restService: RestService) { 
    }

    save(): void {
        this.configOi.commit().subscribe(config => {
            this.configOi = config;
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
