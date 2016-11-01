import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Configuration } from './Configuration';
import * as zeidon from './zeidon';

@Injectable()
export class RestService {
    constructor(private http: Http, private values: zeidon.ZeidonRestValues) { }

    handleError( e ) {
        console.log("There was an error: " + e );
    }
}
