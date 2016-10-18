import { Component } from '@angular/core';
import { Configuration } from './configuration';

@Component({
    selector: 'utc-app',
    template: `
  <h1>Universal Temperature Controller</h1>
  <ul class="configurations">
    <li *ngFor="let config of configurationList.Configuration">
      <span cass="badge">{{config.Id}}</span> {{config.Description}}
    </li>
  </ul>
  <configuration-detail [configuration]="selectedConfiguration"></configuration-detail>
`,
styleUrls: ['app/configuration.css']
})
export class AppComponent {
    selectedConfiguration: Configuration;
    configurationList: Configuration;

    constructor() {
        this.selectedConfiguration = new Configuration({
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
        });

        this.configurationList = new Configuration([
            {
                Id: 100,
                Description: "Configuration 1",
                TargetTemperature: 225,
                ThermometerCount: 1
            },
            {
                Id: 101,
                Description: "Configuration 2",
                TargetTemperature: 200,
                ThermometerCount: 1
            }
        ]);

        let tc = this.selectedConfiguration.Configuration$.ThermometerConfig.create();
        tc.AlarmOn = false;
        tc.Name = "TestName";
        console.log(JSON.stringify(this.selectedConfiguration, null, 2));
    }
}
