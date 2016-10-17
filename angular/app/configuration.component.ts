import { Component, Input } from '@angular/core';
import { Configuration } from './configuration';

@Component({
  selector: 'configuration-detail',
  template: `
  <div *ngIf="configuration">
    <h2>{{configuration.Configuration.Description}} details!</h2>
    <div><label>Id: </label>{{configuration.Configuration.Id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="configuration.Configuration.Description" placeholder="Description"/>
    </div>
    <div><label>Therm name </label>{{configuration.Configuration.ThermometerConfig[0].Name}}</div>
  </div>
`
})
export class ConfigurationComponent {
    @Input()
    configuration: Configuration;
}
