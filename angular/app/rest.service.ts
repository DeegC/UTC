import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Configuration } from './Configuration';
import * as zeidon from './zeidon';

@Injectable()
export class RestService {
    restUrl = 'http://localhost:8080/utc';
    constructor(private http: Http) { }
    baseOptions = new zeidon.ActivateOptions( { 
        restUrl: this.restUrl,
        http: this.http,
        errorHandler: this.handleError, 
    });

    getConfigurationList(): Promise<Configuration>{
        return Configuration.activate( );
    }

    getConfiguration( id : number ): Promise<Configuration>{
        let options = this.baseOptions.clone();
        options.id = id;
        return Configuration.activate( options );
    }

    saveConfiguration( configOi: Configuration ): Promise<Configuration> {
        return configOi.commit( this.baseOptions );
    }

    handleError( e ) {
        console.log("There was an error: " + e );
    }
}
