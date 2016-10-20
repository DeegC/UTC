import { Injectable } from '@angular/core';
import { Configuration } from './configuration';

@Injectable()
export class RestService {
    getConfigurationList(): Promise<Configuration>{
        return Promise.resolve( new Configuration( [
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
        ]) );
    }
}
