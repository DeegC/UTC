import { Component } from '@angular/core';
import { Configuration }   from './configuration';

@Component({
  selector: 'utc-app',
  template: `
  <h1>My First Angular App</h1>
  <configuration-detail [configuration]="selectedConfiguration"></configuration-detail>
`
})
export class AppComponent { 
  selectedConfiguration: Configuration = new Configuration( { 
    Id: 100,
    Description: "Test Description",
    TargetTemperature: 160,
    ThermometerCount: 1
   } );
}
