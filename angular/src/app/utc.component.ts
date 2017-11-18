import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UtcConfig } from './lod/UtcConfig';
import { ThermometerType, ThermometerType_ThermometerType } from './lod/ThermometerType';
import { FormGroup } from '@angular/forms';
import * as zeidon from './zeidon-angular';

@Component({
    selector: 'utc-config',
    template: `
  <div *ngIf="utcConfig && utcConfig.isEmpty == false" >
    <ul class="utcConfig">
    </ul>
  </div>

  <div *ngIf="thermometerList && thermometerList.isEmpty == false" >
    <ul class="thermometerList">
        <li *ngFor="let therm of thermometerList.ThermometerType"
            [class.selected]="selectedTherm.ThermometerType$$.Id == therm.Id">
            <span (click)="onSelect(therm)">
                <span class="badge">{{therm.Name}}</span> {{therm.Description}}
            </span>
            <img src="/img/icons/red-x.png" (click)="onDelete( config )"/>
        </li>
    </ul>
  </div>

  <div *ngIf="! selectedTherm.isEmpty">
    <form [formGroup]="form" (ngSubmit)="saveTherm($event)">
      <div>
        <label>Name: </label>
        <input type="text"
               formControlName="Name" [zeidonErrorElement]="NameError"
               placeholder="name"
        />
      </div>
      <div #nameError class="alert alert-danger" style="display:none"></div>

      <div>
        <label>Description: </label>
        <input type="text"
               formControlName="Description" [zeidonErrorElement]="descriptionError"
               placeholder="Description"
        />
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
                formControlName="A" [zeidonErrorElement]="aError"
                placeholder="steinhart A value"
            />
        </div>
        <div #aError class="alert alert-danger" style="display:none"></div>

        <div>
            <label>Voltage Reference: </label>
            <input type="number"
                formControlName="VoltageReference" [zeidonErrorElement]="voltageError"
                placeholder="voltage reference"
            />
        </div>
        <div #voltageError class="alert alert-danger" style="display:none"></div>

      </div>

    </form>
  </div>
`,
    styleUrls: ['app/configuration.css']
})
export class UtcComponent implements OnInit {
    utcConfig: UtcConfig;
    thermometerList : ThermometerType;
    selectedTherm : ThermometerType = new ThermometerType();
    form: FormGroup;

    constructor() { }

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

    onSelect( therm: ThermometerType_ThermometerType ): void {
        ThermometerType.activate( { Id: therm.Id } ).subscribe( thermType => {
            this.selectedTherm = thermType;
            this.buildForm();
            console.log( "onSelect utcConfig" );
        } );
    }
}
