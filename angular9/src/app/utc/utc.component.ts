import { Component, OnInit } from '@angular/core';
import { UtcConfig } from '../lod/UtcConfig';
import { ThermometerType, ThermometerType_ThermometerType } from '../lod/ThermometerType';
import { FormGroup } from '@angular/forms';
import { DebugInfo } from '../lod/DebugInfo';
import { RestService } from '../rest.service';
import { ZeidonRestService, ZeidonFormBuilder, ZeidonFormReader } from '../zeidon-angular';

@Component({
  selector: 'app-utc',
  templateUrl: './utc.component.html',
  styleUrls: ['./utc.component.css']
})
export class UtcComponent implements OnInit {
    utcConfig: UtcConfig;
    thermometerTypes: ThermometerType;
    selectedTherm: ThermometerType = new ThermometerType();
    thermConfigForm: FormGroup;
    configForm: FormGroup;
    debugInfo: DebugInfo;

    constructor( private utcRestService: RestService,
                 private zeidonRestService: ZeidonRestService ) { }

    ngOnInit(): void {
        UtcConfig.activate( { Id: { ">": 0 } } ).then( config => {
            this.utcConfig = config;
            this.buildConfigForm();
        } );

        ThermometerType.activate().then( list => {
            this.thermometerTypes = list;
        } );

        DebugInfo.activate().then( info => {
            this.debugInfo = info;
        } );
    }

    buildThermConfigForm() {
        this.thermConfigForm = new ZeidonFormBuilder().group( this.selectedTherm.ThermometerType$ );
    }

    buildConfigForm() {
        this.configForm = new ZeidonFormBuilder().group( this.utcConfig.UtcConfig$ );
    }

    onThermTypeSelected( typeIdx ): void {
        // Subtract 1 from idx to take into account the blank option.
        let type = this.thermometerTypes.ThermometerType[ typeIdx - 1 ];
        if ( this.utcConfig.UtcConfig$.DefaultThermometerType$ )
            this.utcConfig.UtcConfig$.DefaultThermometerType.exclude();

        this.utcConfig.UtcConfig$.DefaultThermometerType.include( type );
        this.buildConfigForm();
    }

    saveConfig( event ): void {
        new ZeidonFormReader().readForm( this.utcConfig, this.configForm );
        this.utcConfig.commit().then( config => {
            this.utcConfig = config;
            this.buildConfigForm();
        } );
    }

    saveTherm( event ): void {
        this.selectedTherm.ThermometerType$.update( this.thermConfigForm.value );
        this.selectedTherm.commit().then( therm => {
            this.selectedTherm = therm;
            this.buildThermConfigForm();
            this.thermometerTypes.reload();
        } );
    }

    newThermometerType(): void {
        // Instantiate a new thermometer type.
        this.selectedTherm = new ThermometerType( {
            ProbeAlgorithm: "SteinhartHart",
            SteinhartHartConfig: {
            }
        } );
        this.buildThermConfigForm();
    }

    cancel(): void {
        this.selectedTherm = new ThermometerType();
    }

    onSelectThermConfig( therm: ThermometerType_ThermometerType ): void {
        ThermometerType.activate( { Id: therm.Id } ).then( thermType => {
            this.selectedTherm = thermType;
            this.buildThermConfigForm();
        } );
    }

    onDeleteThermConfig( therm: ThermometerType_ThermometerType ): void {
        this.zeidonRestService.deleteRoot( therm );
    }

    shutdown(): void {
        console.log( "Requesting shutdown" );
        this.utcRestService.shutdown();
    }
}
