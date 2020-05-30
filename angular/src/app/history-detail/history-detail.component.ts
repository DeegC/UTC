import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Session } from '../lod/Session';
import { SafeUrl } from '@angular/platform-browser';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.css']
})
export class HistoryDetailComponent implements OnChanges {
    @Input() sessionOi: Session;
    chartUrl: SafeUrl;

    constructor( private restService: RestService ) { }

    ngOnChanges( changes: SimpleChanges ) {
        this.restService.getChart( this.sessionOi.Session$.Id )
            .subscribe( url => { this.chartUrl = url; } )
    }
}
