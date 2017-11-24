import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import { DomSanitizer} from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Configuration, Configuration_Configuration } from './lod/Configuration';
import { Session } from './lod/Session';
import { Instant } from './lod/Instant';
import { ZeidonRestValues } from './zeidon-rest-client';
import { ObjectInstance, EntityInstance } from './zeidon';

@Injectable()
export class RestService {
    constructor( private http: Http,
                 private sanitizer: DomSanitizer,
                 private values: ZeidonRestValues) { }

    getCurrentSession( ) {
        let url = `${this.values.restUrl}/getCurrentSession`;
        let session = new Session();
        return this.http.get( url )
                .map( response => this.parseJsonResponse( session, response ) ) as Observable<Session>;
    }

    getCurrentState( ) {
        let url = `${this.values.restUrl}/getCurrentState`;
        let session = new Instant();
        return this.http.get( url )
                .map( response => this.parseJsonResponse( session, response ) ) as Observable<Instant>;
    }

    getChart( id ) {
        let url = `${this.values.restUrl}/getChart/${id}`;
        let headers = new Headers({ 'Content-Type': 'image/png' });
        return this.http.get( url, { headers: headers,
                                     responseType: ResponseContentType.Blob } )
                         .map(res => {
                             var urlCreator = window.URL;
                             return  this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(res.blob()));
                         })
    }

    startSession( configOi: Configuration ): Observable<Session> {
        let url = `${this.values.restUrl}/startSession/${configOi.Configuration$.Id}`;
        let body = "{}";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let reqOptions = new RequestOptions({ headers: headers });
        let session = new Session();

        return this.http.post( url, body, reqOptions)
            .map(response => this.parseJsonResponse( session, response ) ) as  Observable<Session>;
    }

    stopSession(): Observable<string> {
        let url = `${this.values.restUrl}/stopSession`;
        let body = "{}";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let reqOptions = new RequestOptions({ headers: headers });

        return this.http.post( url, body, reqOptions)
            .map(response => response.text() ) as  Observable<string>;
    }

    shutdown() {
        let url = `${this.values.restUrl}/shutdown`;
        let body = "{}";
        let headers = new Headers( { 'Content-Type': 'application/json' } );
        let reqOptions = new RequestOptions( { headers: headers } );

        return this.http.post( url, body, reqOptions )
            .toPromise()
            .then(() => console.log( "Shutdown requested" ) )
            .catch(( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    parseJsonResponse( oi: ObjectInstance, response ): ObjectInstance {
        if ( response.text() === "{}" )
            return oi;

        let data = response.json();
        return oi.createFromJson( data , { incrementalsSpecified: true} );
    }
}
