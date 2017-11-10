import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Configuration } from './lod/Configuration';
import { RestService } from './rest.service';
import { Configuration_ThermometerConfig } from './lod/Configuration';
import { Session } from './lod/Session';
import { ThermometerType } from './lod/ThermometerType';
import { FormGroup, Validators } from '@angular/forms';
import * as zeidon from './zeidon-angular';

@Component({
    moduleId:  module.id,
    selector: 'configuration-detail',
    templateUrl: 'configuration.component.html'
})
export class ConfigurationComponent implements OnChanges, OnInit {
    @Input() configOi: Configuration;
    @Input() configurationList: Configuration;
    @Output() onSessionStarted = new EventEmitter<Session>();
    form: FormGroup;
    thermometerTypes: ThermometerType;

    constructor(private restService: RestService) {
    }

    ngOnInit() {
        ThermometerType.activate( { rootOnly: true } ).subscribe( list => {
            this.thermometerTypes = list;
        } )
    }

    ngOnChanges(changes: SimpleChanges) {
        this.buildForm();
        console.log( "ngOnChanges for configuration" );
    }

    buildForm() {
        this.form = new zeidon.ZeidonFormBuilder().group( this.configOi.Configuration$ );
    }

    saveConfig( event ): void {
        this.configOi.Configuration$.update( this.form.value );
        this.configOi.commit().subscribe(config => {
            this.configOi = config;
            this.buildForm();
            this.configurationList.reload();
        });
    }

    startSession(): void {
        // Commit the current changes to the config.
        this.configOi.commit().subscribe(configOi => {
            this.configOi = configOi;
            this.configurationList.reload();
            // Now call the server to start a new session.
            this.restService
                .startSession( configOi )
                .subscribe( sessionOi => this.onSessionStarted.emit( sessionOi ) );
        });
    }

    cancel(): void {
        this.configOi = undefined;
    }

    onThermTypeSelected( typeIdx ): void {
        // Subtract 1 from idx to take into account the blank option.
        let type = this.thermometerTypes.ThermometerType[ typeIdx - 1 ];
        if ( this.configOi.Configuration$.ThermometerType$ )
            this.configOi.Configuration$.ThermometerType.exclude();

        this.configOi.Configuration$.ThermometerType.include( type );
        this.buildForm();
    }

    deleteThermometer( therm: any, index: number ): void {
        therm.removeAt( index );
    }

    newThermometer(): void {
        // Copy any changed values to the OI
        this.configOi.Configuration$.update( this.form.value );
        // Create the new entity.
        this.configOi.Configuration$.ThermometerConfig.create({Name: "New therm" });
        // Rebuild the form with the new therm.
        this.buildForm();
    }
}
