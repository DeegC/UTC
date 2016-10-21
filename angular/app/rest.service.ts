import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Configuration } from './configuration';

@Injectable()
export class RestService {

    constructor(private http: Http) { }
    
    getConfigurationList(): Promise<Configuration>{
        return this.http.get('http://localhost:8080/utc/Configuration')
                .toPromise()
                .then(response => this.parseResponse( response ) )
                .catch(this.handleError);
    }

    parseResponse( response ): Configuration {
        let data = response.json().OIs;
        let conf = new Configuration( data );        
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
    }

    handleError() {
        console.log("There was an error" );
    }
}
