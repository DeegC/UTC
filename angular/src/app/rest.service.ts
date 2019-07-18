
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {map} from 'rxjs/operators';
import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer} from '@angular/platform-browser';


import { Configuration, Configuration_Configuration } from './lod/Configuration';
import { Session } from './lod/Session';
import { UtcConfig } from './lod/UtcConfig';
import { Instant } from './lod/Instant';
import { ZeidonRestValues } from './zeidon-rest-client';
import { ObjectInstance, EntityInstance } from './zeidon';

@Injectable()
export class RestService {
    private globalConfig: UtcConfig = undefined;

    constructor( private http: HttpClient,
                 private sanitizer: DomSanitizer,
                 private values: ZeidonRestValues) {

        UtcConfig.activate().then( config => {
            this.globalConfig = config;
        } );
    }

    getCurrentSession( ) {
        let url = `${this.values.restUrl}/getCurrentSession`;
        let session = new Session();
        return this.http.get( url ).pipe(
                map( response => this.parseJsonResponse( session, response ) )) as Observable<Session>;
    }

    getCurrentState( ) {
        let url = `${this.values.restUrl}/getCurrentState`;
        let session = new Instant();
        return this.http.get( url ).pipe(
                map( response => this.parseJsonResponse( session, response ) )) as Observable<Instant>;
    }

    getChart( id ) {
        let url = `${this.values.restUrl}/getChart/${id}`;
        let headers = new HttpHeaders().set( 'Content-Type', 'image/png' );
        return this.http.get( url, { headers: headers,
                                     responseType: 'blob' } ).pipe(
                         map(res => {
                             var urlCreator = window.URL;
                             return  this.sanitizer.bypassSecurityTrustUrl(urlCreator.createObjectURL(res));
                         }))
    }

    startSession( configOi: Configuration ): Observable<Session> {
        let url = `${this.values.restUrl}/startSession/${configOi.Configuration$.Id}`;
        let body = "{}";
        let headers = new HttpHeaders().set( 'Content-Type', 'application/json' );
        let session = new Session();

        return this.http.post( url, body, { headers: headers } ).pipe(
            map(response => this.parseJsonResponse( session, response ) )) as  Observable<Session>;
    }

    stopSession(): Observable<any> {
        let url = `${this.values.restUrl}/stopSession`;
        let body = "{}";
        let headers = new HttpHeaders().set( 'Content-Type', 'application/json' );

        return this.http.post( url, body, { headers: headers } ).pipe(
            map(response => response ));
    }

    shutdown() {
        let url = `${this.values.restUrl}/shutdown`;
        let body = "{}";
        let headers = new HttpHeaders().set( 'Content-Type', 'application/json' );

        return this.http.post( url, body, { headers: headers } )
            .toPromise()
            .then(() => console.log( "Shutdown requested" ) )
            .catch(( error: any ) => observableThrowError( error.json().error || 'Server error' ) );
    }

    parseJsonResponse( oi: ObjectInstance, response ): ObjectInstance {
        if ( response === "{}" || Object.keys( response ).length === 0 )
            return oi;

        return oi.createFromJson( response , { incrementalsSpecified: true} );
    }

    getCachedConfiguration(): UtcConfig {
        return this.globalConfig;
    }
}
