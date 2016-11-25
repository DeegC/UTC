import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';
import './rxjs-extensions';

import { AppComponent }   from './app.component';
import { ConfigurationListComponent }   from './configuration-list.component';
import { AttributeValidatorDirective }   from './zeidon-angular2';
import { ConfigurationComponent }   from './configuration.component';
import { RestService }   from './rest.service';
import { SessionComponent }   from './session.component';

import { ZeidonConfiguration } from './zeidon';
import { ZeidonRestValues } from './zeidon-rest-client';
import { ZeidonRestConfiguration } from './zeidon-rest-client';

const REST_VALUES: ZeidonRestValues = {
  restUrl: "http://localhost:8080/utc"
};

@NgModule({
  imports:      [ BrowserModule, 
                  FormsModule,
                  HttpModule,
                  RouterModule.forRoot([
                    {
                      path: '',
                      redirectTo: '/configlist',
                      pathMatch: 'full'
                    },
                    {
                      path: 'configlist',
                      component: ConfigurationListComponent
                    },
                    {
                      path: 'session',
                      component: SessionComponent
                    }
                  ])
   ],
  declarations: [ AppComponent, 
                  ConfigurationListComponent, 
                  ConfigurationComponent,
                  AttributeValidatorDirective,
                  SessionComponent ],
  providers: [ RestService,
               { provide: ZeidonRestValues, useValue: REST_VALUES },
               { provide: ZeidonConfiguration, useClass: ZeidonRestConfiguration },
             ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 
  // This constructor is required to force Angular injector to load the ZeidonConfiguration.
  constructor( private zeidonConfig: ZeidonConfiguration ) {}
}
