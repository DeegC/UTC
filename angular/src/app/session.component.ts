import { Component, OnInit } from '@angular/core';
import { RestService } from './rest.service';
import { Session } from './Session';
import { Instant } from './Instant';

@Component({
  selector: 'session',
  template: `
  <h3>Current Session</h3>
  <div>
    {{currentMessage}}
  </div>

  <div *ngIf="currentSession && ! currentSession.isEmpty" >
      <div *ngIf="currentSession.Session.wError" >
        <h2>{{currentSession.Session.wErrorMessage}}</h2>
      </div>

      <div><label>Configuration: </label>{{currentSession.Session$.Configuration$.Description}}</div>
      <div><label>Started at: </label>{{currentSession.Session$.Date}}</div>
      <div><label>Target Temp: </label>{{currentSession.Session$.Configuration$.TargetTemperature}}</div>

      <div *ngIf="currentState && ! currentState.isEmpty" >
        <div><label>Fan: </label>{{currentState.Instant$.PWM0}}</div>
        <div><label>Pit: </label>{{currentState.Instant$.Therm0}}</div>
        <div><label>Therm 1: </label>{{currentState.Instant$.Therm1}}</div>
        <div><label>Therm 2: </label>{{currentState.Instant$.Therm2}}</div>
        <div><label>Therm 3: </label>{{currentState.Instant$.Therm3}}</div>
        <div><label>Therm 4: </label>{{currentState.Instant$.Therm4}}</div>
        <div><label>Therm 5: </label>{{currentState.Instant$.Therm5}}</div>
        <div><label>Therm 6: </label>{{currentState.Instant$.Therm6}}</div>
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

            session.logOi();
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
            this.currentState.logOi();
        } );
    }

    stopSession(): void {
        this.restService.stopSession().subscribe( message => {
            this.currentSession = undefined;
            this.currentState = undefined;
            this.currentMessage = message;
        } );
    }
}
