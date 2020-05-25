import { Component, OnInit, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Configuration } from '../lod/Configuration';
import { Session } from '../lod/Session';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ThermometerType } from '../lod/ThermometerType';
import { RestService } from '../rest.service';
import { ZeidonFormBuilder, ZeidonFormReader } from '../zeidon-angular';

@Component({
  selector: 'configuration-detail',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent implements OnChanges, OnInit {
    @Input() configOi: Configuration;
    @Input() configurationList: Configuration;
    @Output() onSessionStarted = new EventEmitter<Session>();
    form: FormGroup;
    thermometerTypes: ThermometerType;

    constructor( private restService: RestService ) {
    }

    ngOnInit() {
        ThermometerType.activate( { rootOnly: true } ).then( list => {
            this.thermometerTypes = list;
        } )
    }

    ngOnChanges( changes: SimpleChanges ) {
        this.buildForm();
    }

    buildForm() {
        this.form = new ZeidonFormBuilder().group( this.configOi.Configuration$ );
    }

    saveConfig( event ): void {
        new ZeidonFormReader().readForm( this.configOi, this.form );
        this.configOi.commit().then( config => {
            this.configOi = config;
            this.buildForm();
            this.configurationList.reload();
        } );
    }

    startSession(): void {
        // Commit the current changes to the config.
        this.configOi.commit().then( configOi => {
            this.configOi = configOi;
            this.configurationList.reload();
            // Now call the server to start a new session.
            this.restService
                .startSession( configOi )
                .subscribe( sessionOi => this.onSessionStarted.emit( sessionOi ) );
        } );
    }

    cancel(): void {
        this.configOi = undefined;
    }

    onThermTypeSelected( typeIdx ): void {
        if ( this.configOi.Configuration$.ThermometerType$ )
            this.configOi.Configuration$.ThermometerType.exclude();
        else
            // If we get here then a thermtype was not already specified.  That should
            // mean that an additional option called "Specify therm type" was displayed.
            // Subtract one from the index to account for it.
            typeIdx -= 1;

        let type = this.thermometerTypes.ThermometerType[ typeIdx ];
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
        this.configOi.Configuration$.ThermometerConfig.create( { Name: "New therm" } );
        // Rebuild the form with the new therm.
        this.buildForm();
    }
}
