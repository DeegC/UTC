import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Configuration } from './configuration';
import { RestService } from './rest.service';

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
        this.restService.getConfigurationList().then( configList => {
            this.configurationList = configList; 
        } );
    }    

    onSelect(config: any): void {
        this.restService.getConfiguration( config.Id ).then( configOi => {
            this.selectedConfigOi = configOi; 
        } );
    }
    
}
