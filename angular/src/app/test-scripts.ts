import { ZeidonConfiguration, Position, ActivateLockError } from './zeidon';
import { ZeidonRestValues, RestActivator, RestCommitter, RxHttpWrapper } from './zeidon-rest-client';
import {Configuration} from "./lod/Configuration";
import { Observable } from 'rxjs/Observable';
import {RxHttpRequest} from 'rx-http-request';

const REST_VALUES: ZeidonRestValues = {
    restUrl: `http://localhost:8080/northwind`
  };


let zeidonConfig = new ZeidonConfiguration(
    new RestActivator( REST_VALUES, new RxHttpWrapper() ),
    new RestCommitter( REST_VALUES, new RxHttpWrapper() )
);

let newConfig = new Configuration();
console.log(`config = ${newConfig.Configuration$$.ThermometerConfig$$.AlarmHigh}`)
