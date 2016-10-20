import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Configuration } from './configuration';
import { RestService } from './rest.service';

@Component({
    selector: 'utc-app',
    template: `
  <h1>Universal Temperature Controller</h1>
  <div *ngIf="configurationList">
    <ul class="configurations">
        <li *ngFor="let config of configurationList.Configuration" 
            [class.selected]="selectedConfigOi && selectedConfigOi.Configuration$.Id == config.Id"
            (click)="onSelect(config)">
        <span class="badge">{{config.Id}}</span> {{config.Description}}
        </li>
    </ul>
  </div>
  <configuration-detail [configuration]="selectedConfigOi"></configuration-detail>
`,
    styleUrls: ['app/configuration.css'],
    providers: [RestService]
})
export class AppComponent implements OnInit {
    selectedConfigOi: Configuration;
    configurationList: Configuration;

    constructor( private restService: RestService ) {
    }

    ngOnInit(): void {
        this.getConfigurationList();
    }    

    getConfigurationList(): void {
        this.restService.getConfigurationList().then( configList => {
            this.configurationList = configList; 
        } );
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
