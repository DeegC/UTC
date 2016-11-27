import { Component, OnInit } from '@angular/core';
import { RestService } from './rest.service';
import { Session } from './Session';

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
    constructor( private restService: RestService ) { }
    
    ngOnInit(): void {
        this.getCurrentSession();
    }    

    getCurrentSession() {
        this.restService.getCurrentSession().subscribe( session => {
            this.currentSession = session;
            session.logOi();
        } );
    }
}
