import { Component, OnInit } from '@angular/core';
import { RestService } from './rest.service';
import { Session } from './lod/Session';
import { Instant } from './lod/Instant';

@Component({
  selector: 'session',
  template: `
  <h3>Current Session</h3>
  <div>
    {{currentMessage}}
  </div>

  <div *ngIf="currentSession && ! currentSession.isEmpty" >

      <div><label>Configuration: </label>{{currentSession.Session$.Configuration$.Description}}</div>
      <div><label>Started at: </label>{{currentSession.Session$.Date}}</div>
      <div><label>Target Temp: </label>{{currentSession.Session$.Configuration$.TargetTemperature}}</div>

      <div *ngIf="currentState && ! currentState.isEmpty" >
        <div *ngIf="currentState.Instant$.Error" class="alert alert-danger" >
            <h4>{{currentState.Instant$.ErrorMessage}}</h4>
        </div>

        <div><label>Fan: </label>{{currentState.Instant$.PWM0}}</div>

        <div *ngFor="let therm of currentSession.Session$.Configuration$.ThermometerConfig; let i = index;" >
          <div><label>{{therm.Name}} </label>{{getThermTemperature( i ) }}</div>
        </div>

        <div><label>CPU Temp: </label>{{currentState.Instant$.CpuTemperature}}</div>
        <div><label>Timestamp: </label>{{currentState.Instant$.Timestamp}}</div>
      </div>

      <button type="button" class="btn btn-default" (click)="stopSession()" >
            Stop Session
      </button>
  </div>
`
})
export class SessionComponent implements OnInit {
    currentSession: Session;
    currentState:   Instant;
    currentMessage = "No session is currently running";

    constructor( private restService: RestService ) { }

    ngOnInit(): void {
        this.getCurrentSession();
    }

    getCurrentSession() {
        this.restService.getCurrentSession().subscribe( session => {
            this.currentSession = session;
            if ( this.currentSession.isEmpty )
                this.currentSession = undefined;

            if ( this.currentSession ) {
                this.refreshState();
                this.currentMessage = undefined;
            }
            else
                this.currentMessage = "No Session is currently running";
        } );
    }

    refreshState() {
        if ( this.currentSession ) {
            console.log( "refreshSession" );
            this.getCurrentState();
            setTimeout( () => { this.refreshState() }, 5000 );
        }
    }

    getCurrentState() {
        this.restService.getCurrentState().subscribe( instant => {
            this.currentState = instant;
        } );
    }

    stopSession(): void {
        let self = this;
        this.restService.stopSession().subscribe( response => {
            self.currentSession = undefined;
            self.currentState = undefined;
            self.currentMessage = response.message;
        } );
    }

    getThermTemperature( index ): string {
        let name = `Therm${index}`;
        let attr = this.currentState.Instant$.getAttribute( `Therm${index}` );
        return attr;
    }
}
