import { Component, OnInit } from '@angular/core';
import { Session } from '../lod/Session';
import { Instant } from '../lod/Instant';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
    currentSession: Session;
    currentState: Instant;
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
