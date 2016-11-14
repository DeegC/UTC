import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Configuration } from './Configuration';
import { Configuration_Configuration } from './Configuration';
import { RestService } from './rest.service';
import * as zeidon from './zeidon';

@Component({
    selector: 'configuration-list',
    template: `
  <div *ngIf="configurationList && configurationList.isEmpty == false">
    <ul class="configurations">
        <li *ngFor="let config of configurationList.Configuration" 
            [class.selected]="selectedConfigOi && selectedConfigOi.Configuration$.Id == config.Id">
            <span (click)="onSelect(config)">
                <span class="badge">{{config.Id}}</span> {{config.Description}}
            </span>
            <img src="/img/icons/red-x.png" (click)="onDelete( config )"/>
        </li>
    </ul>
  </div>
  <button (click)="newConfiguration()">
        New Configuration
  </button>
  <div *ngIf="selectedConfigOi">
    <configuration-detail [configOi]="selectedConfigOi"></configuration-detail>
  </div>
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
        Configuration.activate().subscribe( configList => {
            this.configurationList = configList; 
        } );
    }    

    onSelect(config: Configuration_Configuration): void {
        let options = new zeidon.ActivateOptions( { id: config.Id } );
        Configuration.activate( options ).subscribe( configOi => {
            this.selectedConfigOi = configOi; 
        } );
    }

    /**
     * Delete the selected configuration from the OI list. 
     */    
    onDelete( config: Configuration_Configuration ): void {
        console.log("onDelete");
        this.restService.deleteConfiguration( config );
    }

    newConfiguration(): void {
        // Instantiate a new Configuration with a single ThermometerConfig.
        this.selectedConfigOi = new Configuration( { ThermometerConfig: {} } );
    }
}
