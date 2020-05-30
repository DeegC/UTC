import { Component, OnInit } from '@angular/core';
import { Configuration, Configuration_Configuration } from '../lod/Configuration';
import { Session } from '../lod/Session';
import { ZeidonRestService } from '../zeidon-angular';

@Component( {
    selector: 'app-configuration-list',
    templateUrl: './configuration-list.component.html',
    styleUrls: [ './configuration-list.component.css' ]
} )
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

    onSelect( config: Configuration_Configuration ): void {
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
