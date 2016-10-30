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
        return Configuration.activate( this.baseOptions );
    }

    getConfiguration( id : number ): Promise<Configuration>{
        let options = this.baseOptions.clone();
        options.id = id;
        return Configuration.activate( options );
    }

    saveConfiguration( configOi: Configuration ): Promise<Configuration> {
        return configOi.commit( this.baseOptions );
        // let body = JSON.stringify( configOi.toZeidonMeta() );
        // let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
        // return this.http.post(`${this.restUrl}/Configuration`, body, options)
        //     .toPromise()
        //     .then(response => this.parseConfigurationResponse( response ) )
        //     .catch(this.handleError);
    }

    parseConfigurationResponse( response ): Configuration {
        if ( response == "{}" )
            return new Configuration(); // Return an empty config.

        let data = response.json();
        return new Configuration( data );
/*                
        return new Configuration( [
            {
                Id: 100,
                Description: "Configuration 1",
                TargetTemperature: 225,
                ThermometerCount: 1
            },
            {
                Id: 101,
                Description: "Configuration 2",
                TargetTemperature: 200,
                ThermometerCount: 1
            }
        ]);
*/        
    }

    handleError( e ) {
        console.log("There was an error: " + e );
    }
}
