import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule, Http }    from '@angular/http';

import { AppComponent }   from './app.component';
import { ConfigurationListComponent }   from './configuration-list.component';
import { ConfigurationComponent }   from './configuration.component';
import { RestService }   from './rest.service';
import { SessionComponent }   from './session.component';
import * as zeidon from './zeidon';

const REST_VALUES: zeidon.ZeidonRestValues = {
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
                  SessionComponent ],
  providers: [ RestService,
               { provide: zeidon.ZeidonRestValues, useValue: REST_VALUES },
               { provide: zeidon.ZeidonConfiguration, useClass: zeidon.ZeidonRestConfiguration },
             ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 
  // This constructor is required to force Angular injector to load the ZeidonConfiguration.
  constructor( private zeidonConfig: zeidon.ZeidonConfiguration ) {}
}
