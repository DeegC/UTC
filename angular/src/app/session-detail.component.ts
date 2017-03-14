import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
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
export class SessionDetailComponent implements OnChanges {
    @Input() sessionOi: Session;
    chartUrl: SafeUrl;

    constructor( private restService: RestService ) { }

    ngOnChanges(changes: SimpleChanges) {
        this.restService.getChart( this.sessionOi.Session$.Id )
                        .subscribe( url => { this.chartUrl = url; } )
    }
}
