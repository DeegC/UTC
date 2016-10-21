import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Configuration } from './configuration';

@Injectable()
export class RestService {
    restUrl = 'http://localhost:8080/utc';
    constructor(private http: Http) { }
    
    getConfigurationList(): Promise<Configuration>{
        return this.http.get(`${this.restUrl}/Configuration`)
                .toPromise()
                .then(response => this.parseConfigurationResponse( response ) )
                .catch(this.handleError);
    }

    getConfiguration( id: number ): Promise<Configuration>{
        return this.http.get(`${this.restUrl}/Configuration/${id}`)
                .toPromise()
                .then(response => this.parseConfigurationResponse( response ) )
                .catch(this.handleError);
    }

    parseConfigurationResponse( response ): Configuration {
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
