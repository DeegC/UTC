import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import './rxjs-extensions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Configuration, Configuration_Configuration } from './Configuration';
import { Session } from './Session';
import { ZeidonRestValues } from './zeidon-rest-client';
import { ObjectInstance } from './zeidon';

@Injectable()
export class RestService {
    constructor(private http: Http, private values: ZeidonRestValues) { }

    handleError( e ) {
        console.log("There was an error: " + e );
    }

    deleteConfiguration( config: Configuration_Configuration ) {
        let lodName = config.oi.getLodDef().name;
        let url = `${this.values.restUrl}/${lodName}/${config.Id}`;
        this.http.delete( url )
            .toPromise()
            .then( () => config.drop() )
            .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
    }

    getCurrentSession( ) {
        let url = `${this.values.restUrl}/getSession`;
        let session = new Session();
        return this.http.get( url )
                .map( response => this.parseCommitResponse( session, response ) ) as Observable<Session>;
    }

    startSession( configOi: Configuration ): Observable<Session> {
        let url = `${this.values.restUrl}/startSession/${configOi.Configuration$.Id}`;
        let body = "{}";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let reqOptions = new RequestOptions({ headers: headers });
        let session = new Session();

        return this.http.post( url, body, reqOptions)
            .map(response => this.parseCommitResponse( session, response ) ) as  Observable<Session>;
    }
    
    parseCommitResponse( oi: ObjectInstance, response ): ObjectInstance {
        if ( response.text() == "{}" )
            return oi;

        let data = response.json();
        return oi.createFromJson( data );
    }
}
