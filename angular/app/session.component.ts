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
      <div><label>Configuration: </label>{{currentSession.Session$.Configuration$.Description}}</div>
      <div><label>Started at: </label>{{currentSession.Session$.Date}}</div>

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
        this.getCurrentState();
    }

    getCurrentSession() {
        this.restService.getCurrentSession().subscribe( session => {
            this.currentSession = session;
            if ( this.currentSession.isEmpty )
                this.currentMessage = "No Session is currently running";
            else
                this.currentMessage = undefined;

            session.logOi();
        } );
    }

    getCurrentState() {
        this.restService.getCurrentState().subscribe( instant => {
            this.currentState = instant;
            instant.logOi();
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
