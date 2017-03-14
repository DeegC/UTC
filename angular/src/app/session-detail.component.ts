import { Component, Input } from '@angular/core';
import { SafeUrl} from '@angular/platform-browser';
import { OnInit } from '@angular/core';
import { Configuration } from './Configuration';
import { Configuration_Configuration } from './Configuration';
import { Session } from './Session';
import { RestService } from './rest.service';
import * as zeidon from './zeidon';

@Component({
    selector: 'session-detail',
    template: `
    <div>
    =============================================================
        {{sessionOi.Session$.Date | date:'yyyy-MM-dd hh:mm a'}}
        <div *ngIf="chartUrl">
            <img [src]="chartUrl" />
        </div>
    </div>
`,
    styleUrls: ['app/configuration.css'],
    providers: [RestService]
})
export class SessionDetailComponent implements OnInit {
    @Input() sessionOi: Session;
    chartUrl: SafeUrl;

    constructor( private restService: RestService ) { }

    ngOnInit(): void {
        this.restService.getChart( 4 ).subscribe( url => {
            this.chartUrl = url;
            console.log( url );
        })
    }

}
