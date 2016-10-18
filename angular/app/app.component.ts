import { Component } from '@angular/core';
import { Configuration } from './configuration';

@Component({
    selector: 'utc-app',
    template: `
  <h1>Universal Temperature Controller</h1>
  <ul class="configurations">
    <li *ngFor="let config of configurationList.Configuration" 
         [class.selected]="selectedConfigOi && selectedConfigOi.Configuration$.Id == config.Id"
         (click)="onSelect(config)">
      <span class="badge">{{config.Id}}</span> {{config.Description}}
    </li>
  </ul>
  <configuration-detail [configuration]="selectedConfigOi"></configuration-detail>
`,
styleUrls: ['app/configuration.css']
})
export class AppComponent {
    selectedConfigOi: Configuration;
    configurationList: Configuration;

    constructor() {
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
    }

    onSelect(config: any): void {
        this.selectedConfigOi = new Configuration({
            Id: config.Id,
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

        let tc = this.selectedConfigOi.Configuration$.ThermometerConfig.create();
        tc.AlarmOn = false;
        tc.Name = "TestName";
        console.log(JSON.stringify(this.selectedConfigOi, null, 2));
    }
    
}
