import { Headers, Http, RequestOptions } from '@angular/http';
import { OpaqueToken } from '@angular/core';
import { Injectable, Inject }    from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { ObjectInstance } from './zeidon';
import { ZeidonConfiguration } from './zeidon';
import { Committer, CommitOptions } from './zeidon';

@Injectable()
export class RestActivator {
    constructor( private values: ZeidonRestValues, private http: Http ) {}

    activateOi<T extends ObjectInstance>( oi: T, qual?: any ): Observable<T> {
        if ( qual == undefined )
            qual = { rootOnly: true };

        let lodName = oi.getLodDef().name;
        let errorHandler = oi.handleActivateError;
        let url = `${this.values.restUrl}/${lodName}?qual=${encodeURIComponent(JSON.stringify(qual))}`;
        return this.http.get( url )
                .map( response => oi.createFromJson( response.json(), { incrementalsSpecified: true } ) as T );
    }
}

/**
 * These are the values for configuring Zeidon to use a REST server for activate/commits.
 */
@Injectable()
export class ZeidonRestValues {
    restUrl: string;
}

@Injectable()
export class ZeidonRestConfiguration extends ZeidonConfiguration {
    constructor( private values: ZeidonRestValues, private http: Http ) {
        super( new RestActivator( values, http ),
               new RestCommitter( values, http ) );
        console.log("--- ZeidonRestConfiguration --- " + values.restUrl );
    }
}

@Injectable()
export class RestCommitter implements Committer {
    constructor( private values: ZeidonRestValues, private http: Http ) {}

    commitOi( oi: ObjectInstance, options?: CommitOptions ): Observable<ObjectInstance> {
        let lodName = oi.getLodDef().name;
        let body = JSON.stringify( oi.toZeidonMeta() );
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let reqOptions = new RequestOptions({ headers: headers });
        let errorHandler = oi.handleActivateError ;
        let url = `${this.values.restUrl}/${lodName}`;

        return this.http.post( url, body, reqOptions)
            .map(response => this.parseCommitResponse( oi, response ) );
    }

    parseCommitResponse( oi: ObjectInstance, response ): ObjectInstance {
        if ( response.text() == "{}" )
            return oi.createFromJson( undefined );

        let data = response.json();
        return oi.createFromJson( data, { incrementalsSpecified: true} );
    }

}
