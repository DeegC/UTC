import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UtcConfig } from './lod/UtcConfig';
import { RestService } from './rest.service';
import { ThermometerType, ThermometerType_ThermometerType } from './lod/ThermometerType';
import { FormGroup } from '@angular/forms';
import * as zeidon from './zeidon-angular';

@Component({
    selector: 'utc-config',
    template: `
Software: DG Christensen (https://github.com/DeegC)<br/>
Hardware: J Haddad

  <div *ngIf="utcConfig && utcConfig.isEmpty == false" >
    <ul class="utcConfig">
    </ul>
  </div>

    <div style="border: 1px solid #000000; padding: 25px;">
    <div *ngIf="thermometerList && thermometerList.isEmpty == false" >
        <ul class="thermometerList">
            <li *ngFor="let therm of thermometerList.ThermometerType"
                [class.selected]="selectedTherm.ThermometerType$$.Id == therm.Id">
                <span (click)="onSelect(therm)">
                    <span class="badge">{{therm.Name}}</span> {{therm.Description}}
                </span>
                <img src="/img/icons/red-x.png" (click)="onDelete( therm )"/>
            </li>
        </ul>
    </div>

    <button type="button" class="btn btn-default" (click)="newThermometerType()">
            New Thermometer Type
    </button>

    <h4>Thermometer Type Configuration:</h4>
    <div *ngIf="! selectedTherm.isEmpty">
        <form [formGroup]="form" (ngSubmit)="saveTherm($event)">
        <div>
            <label>Name: </label>
            <input type="text" class="my-class"
                formControlName="Name" [zeidonErrorElement]="nameError"
                placeholder="name"
            />
        </div>
        <div #nameError class="alert alert-danger" style="display:none"></div>

        <div>
            <label>Description: </label>
            <textarea formControlName="Description" [zeidonErrorElement]="descriptionError" rows="4" cols="50">
            </textarea>
        </div>
        <div #descriptionError class="alert alert-danger" style="display:none"></div>

        <div>
            <select id="ProbeAlgorithm" class="form-control" formControlName="ProbeAlgorithm">
            <option *ngFor="let entry of selectedTherm.ThermometerType$.getAttributeDef( 'ProbeAlgorithm' ).domain.domainFunctions.getTableValues()"
                [selected]="(entry === selectedTherm.ThermometerType$.ProbeAlgorithm)"
                [value]="entry" >
                {{ entry }}
            </option>
            </select>
        </div>

        <div formGroupName="SteinhartHartConfig">
            <div>
                <label>A: </label>
                <input type="number"
                    formControlName="A" [zeidonErrorElement]="steinhartError"
                    placeholder="steinhart A value"
                />
            </div>
            <div>
                <label>B: </label>
                <input type="number"
                    formControlName="B" [zeidonErrorElement]="steinhartError"
                    placeholder="steinhart B value"
                />
            </div>
            <div>
                <label>C: </label>
                <input type="number"
                    formControlName="C" [zeidonErrorElement]="steinhartError"
                    placeholder="steinhart C value"
                />
            </div>
            <div>
                <label>R: </label>
                <input type="number"
                    formControlName="R" [zeidonErrorElement]="steinhartError"
                    placeholder="steinhart R value"
                />
            </div>
            <div #steinhartError class="alert alert-danger" style="display:none"></div>

            <div>
                <label>Voltage Reference: </label>
                <input type="number"
                    formControlName="VoltageReference" [zeidonErrorElement]="voltageError"
                    placeholder="voltage reference"
                />
            </div>
            <div #voltageError class="alert alert-danger" style="display:none"></div>

        </div>

        <div>
            <button type="submit" class="btn btn-default" [disabled]="false">
                Save Configuration
            </button>
            <button type="button" class="btn btn-default" (click)="cancel()" >
                Cancel
            </button>
        </div>
      </form>
    </div>
  </div>

  <button type="button" class="btn btn-default" (click)="shutdown()" >
      Shutdown Computer
  </button>
`,
    styleUrls: ['app/configuration.css']
})
export class UtcComponent implements OnInit {
    utcConfig: UtcConfig;
    thermometerList : ThermometerType;
    selectedTherm : ThermometerType = new ThermometerType();
    form: FormGroup;

    constructor( private utcRestService: RestService,
                 private zeidonRestService: zeidon.ZeidonRestService ) { }

    ngOnInit(): void {
        UtcConfig.activate().subscribe( config => {
            this.utcConfig = config;
        } );

        ThermometerType.activate().subscribe( list => {
            this.thermometerList = list;
        } );
    }

    buildForm() {
        this.form = new zeidon.ZeidonFormBuilder().group( this.selectedTherm.ThermometerType$$ );
    }

    saveTherm( event ): void {
        this.selectedTherm.ThermometerType$.update( this.form.value );
        this.selectedTherm.commit().subscribe( therm => {
            this.selectedTherm = therm;
            this.buildForm();
            this.thermometerList.reload();
        } );
    }

    newThermometerType(): void {
        // Instantiate a new thermometer type.
        this.selectedTherm = new ThermometerType( {
                ProbeAlgorithm: "SteinhartHart",
                SteinhartHartConfig: {

                }
        } );
        this.buildForm();
    }

    cancel(): void {
        this.selectedTherm = new ThermometerType();
    }

    onSelect( therm: ThermometerType_ThermometerType ): void {
        ThermometerType.activate( { Id: therm.Id } ).subscribe( thermType => {
            this.selectedTherm = thermType;
            this.buildForm();
            console.log( "onSelect utcConfig" );
        } );
    }

    onDelete( therm: ThermometerType_ThermometerType ): void {
        this.zeidonRestService.deleteRoot( therm );
    }

    shutdown( ): void {
        console.log( "Requesting shutdown" );
        this.utcRestService.shutdown();
    }
}
