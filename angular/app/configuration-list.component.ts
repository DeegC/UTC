import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Configuration } from './Configuration';
import { Configuration_Configuration } from './Configuration';
import { RestService } from './rest.service';
import * as zeidon from './zeidon';

@Component({
    selector: 'configuration-list',
    template: `
  <div *ngIf="configurationList">
    <ul class="configurations">
        <li *ngFor="let config of configurationList.Configuration" 
            [class.selected]="selectedConfigOi && selectedConfigOi.Configuration$.Id == config.Id"
            (click)="onSelect(config)">
        <span class="badge">{{config.Id}}</span> {{config.Description}}
        </li>
    </ul>
  </div>
  <button (click)="newConfiguration()">
        New Configuration
  </button>
  <configuration-detail [configuration]="selectedConfigOi"></configuration-detail>
`,
    styleUrls: ['app/configuration.css'],
    providers: [RestService]
})
export class ConfigurationListComponent implements OnInit {
    selectedConfigOi: Configuration;
    configurationList: Configuration;

    constructor( private restService: RestService ) { }

    ngOnInit(): void {
        this.getConfigurationList();
    }    

    getConfigurationList(): void {
        Configuration.activate().then( configList => {
            this.configurationList = configList; 
        } );
    }    

    onSelect(config: Configuration_Configuration): void {
        let options = new zeidon.ActivateOptions( { id: config.Id } );
        Configuration.activate( options ).then( configOi => {
            this.selectedConfigOi = configOi; 
        } );
    }
    
    newConfiguration(): void {
        this.selectedConfigOi = new Configuration( { ThermometerConfig: {} } );
    }
}
