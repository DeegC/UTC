import { Component, Input } from '@angular/core';
import { Configuration } from './configuration';
import { RestService } from './rest.service';

@Component({
  selector: 'configuration-detail',
  template: `
  <div *ngIf="configuration">
    <h2>{{configuration.Configuration[0].Description}} details!</h2>
    <div><label>Id: </label>{{configuration.Configuration[0].Id}}</div>
    <div>
      <label>Description: </label>
      <input [(ngModel)]="configuration.Configuration[0].Description" placeholder="Description"/>
    </div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="configuration.Configuration[0].ThermometerConfig[0].Name" placeholder="name"/>
    </div>
    <div><label>Therm name </label>{{configuration.Configuration[0].ThermometerConfig[0].Name}}</div>
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
