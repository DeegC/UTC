import { Component } from '@angular/core';
import { RestService } from './rest.service';

@Component({
  selector: 'session',
  template: '<h3>Current Session</h3>'
})
export class SessionComponent { 
    constructor( private restService: RestService ) { }
    
}
