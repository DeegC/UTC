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
 selectedConfiguration: Configuration;

    constructor(  ) {
      this.selectedConfiguration = new Configuration( { 
        Id: 100,
        Description: "Test Description",
        TargetTemperature: 160,
        ThermometerCount: 1,
        ThermometerConfig: [
          {
            Id: 11,
            Name: 'Pit',
            AlarmOn: false,
            fk_id_configuration: 100,
          }
        ],
      } );

     let c = this.selectedConfiguration.Configuration
     let t = c.ThermometerConfig
     let n = t.create()
     let x = t[0]
     x.AlarmOn
    }
}
