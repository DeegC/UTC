import { Component, Input, Output, OnInit, EventEmitter, SimpleChanges, OnChanges, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Configuration } from './lod/Configuration';
import { RestService } from './rest.service';
import { Configuration_ThermometerConfig } from './lod/Configuration';
import { Session } from './lod/Session';
import { ThermometerType } from './lod/ThermometerType';
import { FormGroup, FormBuilder  } from '@angular/forms';
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

    constructor(private restService: RestService, private formBuilder: FormBuilder ) {
    }

    ngOnInit() {
        ThermometerType.activate( { rootOnly: true } ).then( list => {
            this.thermometerTypes = list;
        } )
    }

    ngOnChanges(changes: SimpleChanges) {
        this.buildForm();
    }

    buildForm() {
        this.form = new zeidon.ZeidonFormBuilder().group( this.configOi.Configuration$ );
    }

    saveConfig( event ): void {
        new zeidon.ZeidonFormReader().readForm( this.configOi, this.form );
        this.configOi.commit().then(config => {
            this.configOi = config;
            this.buildForm();
            this.configurationList.reload();
        });
    }

    startSession(): void {
        // Commit the current changes to the config.
        this.configOi.commit().then(configOi => {
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
        let type = this.thermometerTypes.ThermometerType[ typeIdx ];
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
