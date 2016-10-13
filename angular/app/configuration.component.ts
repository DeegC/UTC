import { Component, Input } from '@angular/core';
import { Configuration } from './configuration';

@Component({
  selector: 'configuration-detail',
  template: `
  <div *ngIf="configuration">
    <h2>{{configuration.Description}} details!</h2>
    <div><label>Id: </label>{{configuration.Id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="configuration.Description" placeholder="Description"/>
    </div>
  </div>
`
})
export class ConfigurationComponent {
    @Input()
    configuration: Configuration;
}
