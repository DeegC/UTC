import { Component, Input } from '@angular/core';
import { Configuration } from './Configuration';
import { RestService } from './rest.service';

@Component({
  selector: 'configuration-detail',
  template: `
  <div *ngIf="configOi">
    <h2>Configuration Details</h2>
    <div><label>Id: </label>{{configOi.Configuration$.Id}}</div>
    <div>
      <label>Description: </label>
      <input [(ngModel)]="configOi.Configuration$.Description" placeholder="Description"/>
    </div>
    <div>
      <label>Target Temperature: </label>
      <input [(ngModel)]="configOi.Configuration$.TargetTemperature" placeholder="target temperature"/>
    </div>
    <div>
      <label>PID: </label>
      <input [(ngModel)]="configOi.Configuration$.PidP" placeholder="P" maxlength="2" size="2"/>
      <input [(ngModel)]="configOi.Configuration$.PidI" placeholder="I" maxlength="5" size="5"/>
      <input [(ngModel)]="configOi.Configuration$.PidD" placeholder="D" maxlength="2" size="2"/>
    </div>
    <div>
      <label>Max PWM: </label>
      <input [(ngModel)]="configOi.Configuration$.MaxPWM" placeholder="max PWM"/>
    </div>
    <div>
      <label>Tweet On: </label>
      <input [(ngModel)]="configOi.Configuration$.TweetOn" placeholder="tweet on"/>
    </div>
    <div>
      <label>Tweet Period: </label>
      <input [(ngModel)]="configOi.Configuration$.TweetPeriodInMinutes" placeholder="Tweet period"/>
    </div>
    <h3>Thermometers</h3>
    <div *ngFor="let therm of configOi.Configuration$.ThermometerConfig" >
      <div>
        <label>name: </label>
        <input [(ngModel)]="therm.Name" placeholder="name"/>
      </div>
    </div>
    <button (click)="save()" [disabled]="! configOi.isUpdated">
      Save Configuration
    </button>
  </div>
`
})
export class ConfigurationComponent {
    @Input()
    configOi: Configuration;

    constructor( private restService: RestService ) { }

    save(): void {
        this.configOi.commit().subscribe( config => this.configOi = config ); 
    }
}
