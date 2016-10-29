import { Component, Input } from '@angular/core';
import { Configuration } from './Configuration';
import { RestService } from './rest.service';

@Component({
  selector: 'configuration-detail',
  template: `
  <div *ngIf="configuration">
    <h2>Configuration Details</h2>
    <div><label>Id: </label>{{configuration.Configuration$.Id}}</div>
    <div>
      <label>Description: </label>
      <input [(ngModel)]="configuration.Configuration$.Description" placeholder="Description"/>
    </div>
    <h3>Thermometers</h3>
    <div *ngFor="let therm of configuration.Configuration$.ThermometerConfig" >
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
    configuration: Configuration;

    constructor( private restService: RestService ) { }

    save(): void {
        this.restService.saveConfiguration( this.configuration)
                        .then( config => this.configuration = config ); 
    }
}
