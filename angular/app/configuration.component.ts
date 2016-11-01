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
    <h3>Thermometers</h3>
    <div *ngFor="let therm of configOi.Configuration$.ThermometerConfig" >
      <div>
        <label>name: </label>
        <input [(ngModel)]="therm.Name" placeholder="name"/>
      </div>
      <div><label>Therm name </label>{{therm.Name}}</div>
    </div>
    <button (click)="save()">
      Save
    </button>
    </div>
`
})
export class ConfigurationComponent {
    @Input()
    configOi: Configuration;

    constructor( private restService: RestService ) { }

    save(): void {
        this.configOi.commit().then( config => this.configOi = config ); 
    }
}
