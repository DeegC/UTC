import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Session } from './Session';
import { Session_Session } from './Session';
import { RestService } from './rest.service';
import * as zeidon from './zeidon';

@Component({
    selector: 'history',
    template: `
  <div *ngIf="sessionList && sessionList.isEmpty == false">
    <ul class="configurations">
        <li *ngFor="let session of sessionList.Session"
            [class.selected]="selectedSessionOi && selectedSessionOi.Session$.Id == session.Id">
            <span (click)="onSelect(session)">
                <span class="badge">{{session.Id}}</span> {{session.Date}}
            </span>
            <img src="/img/icons/red-x.png" (click)="onDelete( session )"/>
        </li>
    </ul>
  </div>
`,
    styleUrls: ['app/configuration.css'],
    providers: [RestService]
})
export class SessionListComponent implements OnInit {
    selectedSessionOi: Session;
    sessionList: Session;

    constructor( private restService: RestService ) { }

    ngOnInit(): void {
        this.getSessionList();
    }

    getSessionList(): void {
        Session.activate().subscribe( sessionList => {
            this.sessionList = sessionList;
        } );
    }

    onSelect(session: Session_Session): void {
        Session.activate( { Id: session.Id } ).subscribe( sessionOi => {
            this.selectedSessionOi = sessionOi;
        } );
    }

    /**
     * Delete the selected session from the OI list.
     */
    onDelete( session: Session_Session ): void {
        this.restService.deleteOi( session.oi );
    }
}
