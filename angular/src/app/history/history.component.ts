import { Component, OnInit } from '@angular/core';
import { Session, Session_Session } from '../lod/Session';
import { ZeidonRestService } from '../zeidon-angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    selectedSessionOi: Session;
    sessionList: Session;

    constructor( private zeidonRestService: ZeidonRestService ) { }

    ngOnInit(): void {
        this.getSessionList();
    }

    getSessionList(): void {
        Session.activate().then( sessionList => {
            this.sessionList = sessionList;
        } );
    }

    onSelect( session: Session_Session ): void {
        Session.activate( { Id: session.Id } ).then( sessionOi => {
            this.selectedSessionOi = sessionOi;
        } );
    }

    /**
     * Delete the selected session from the OI list.
     */
    onDelete( session: Session_Session ): void {
        this.zeidonRestService.deleteRoot( session );
    }
}
