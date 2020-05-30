import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Configuration } from './lod/Configuration';
import { Configuration_Configuration } from './lod/Configuration';
import { Session } from './lod/Session';
import { RestService } from './rest.service';
import * as zeidon from './zeidon';
import { ZeidonRestService } from './zeidon-angular';

@Component({
    selector: 'configuration-list',
    template: `
  <div *ngIf="sessionOi && sessionOi.isEmpty == false" class="alert alert-danger">
    Session is running!
  </div>
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
  <button type="button" class="btn btn-default" (click)="newConfiguration()">
        New Configuration
  </button>
  <div *ngIf="selectedConfigOi">
    <configuration-detail [configOi]="selectedConfigOi" [configurationList]="configurationList"
        (onSessionStarted)="onSessionStarted($event)" >
    </configuration-detail>
  </div>
`,
    styleUrls: ['app/configuration.css'],
    providers: [RestService]
})
export class ConfigurationListComponent implements OnInit {
    selectedConfigOi: Configuration;
    configurationList: Configuration;
    sessionOi: Session;

    constructor( private zeidonRestService: ZeidonRestService ) { }

    ngOnInit(): void {
        this.getConfigurationList();
    }

    getConfigurationList(): void {
        Configuration.activate().then( configList => {
            this.configurationList = configList;
        } );
    }

    onSelect(config: Configuration_Configuration): void {
        Configuration.activate( { Id: config.Id } ).then( configOi => {
            this.selectedConfigOi = configOi;
        } );
    }

    /**
     * Delete the selected configuration from the OI list.
     */
    onDelete( config: Configuration_Configuration ): void {
        this.zeidonRestService.deleteRoot( config );
    }

    newConfiguration(): void {
        // Instantiate a new Configuration with a single ThermometerConfig.
        this.selectedConfigOi = new Configuration( { ThermometerConfig: {} } );
    }

    onSessionStarted( sessionOi: Session ) {
        this.sessionOi = sessionOi;
    }
}
