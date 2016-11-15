import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import './rxjs-extensions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Configuration_Configuration } from './Configuration';
import * as zeidon from './zeidon';

@Injectable()
export class RestService {
    constructor(private http: Http, private values: zeidon.ZeidonRestValues) { }

    handleError( e ) {
        console.log("There was an error: " + e );
    }

<<<<<<< HEAD
    deleteConfigurationFromList( config: Configuration_Configuration ) {
        let lodName = config.oi.getLodDef().name;
        let url = `${this.values.restUrl}/${lodName}/${config.Id}`;
        this.http.delete( url )
            .map(response => config.drop() );
        
=======
    deleteConfiguration( config: Configuration_Configuration ) {
        let lodName = config.oi.getLodDef().name;
        let url = `${this.values.restUrl}/${lodName}/${config.Id}`;
        this.http.delete( url )
            .toPromise()
            .then( () => config.drop() )
            .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
>>>>>>> f56c4994e2d654ac8279771015149f54a8e92ebd
    }
}
