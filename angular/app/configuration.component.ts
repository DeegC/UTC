import { Component, Input } from '@angular/core';
import { Configuration } from './Configuration';
import { RestService } from './rest.service';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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
          <input [(ngModel)]="therm.Name" placeholder="name" name="thermName.{{i}}"/>
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
    @Input() configOi: Configuration;
    @Input() configurationList: Configuration;

    constructor(private restService: RestService) { 
    }

    save(): void {
        this.configOi.commit().subscribe(config => {
            this.configOi = config;
            this.configurationList.reload();
        });
    }
}

