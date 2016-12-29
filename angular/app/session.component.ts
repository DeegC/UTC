import { Component, OnInit } from '@angular/core';
import { RestService } from './rest.service';
import { Session } from './Session';
import { Instant } from './Instant';

@Component({
  selector: 'session',
  template: `
  <h3>Current Session</h3>
  <div *ngIf="currentSession == undefined || currentSession.isEmpty" >
    No session is currently running
  </div>

  <div *ngIf="currentSession && ! currentSession.isEmpty" >
      <div><label>Configuration: </label>{{currentSession.Session$.Configuration$.Description}}</div>
      <div><label>Started at: </label>{{currentSession.Session$.Date}}</div>
  </div>
`
})
export class SessionComponent implements OnInit {
    currentSession: Session;
    currentState:   Instant;

    constructor( private restService: RestService ) { }

    ngOnInit(): void {
        this.getCurrentSession();
        this.getCurrentState();
    }

    getCurrentSession() {
        this.restService.getCurrentSession().subscribe( session => {
            this.currentSession = session;
            session.logOi();
        } );
    }

    getCurrentState() {
        this.restService.getCurrentState().subscribe( instant => {
            this.currentState = instant;
            instant.logOi();
        } );
    }
}
