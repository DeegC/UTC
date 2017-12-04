import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import './rxjs-extensions';

import { AppComponent }   from './app.component';
import { ConfigurationListComponent }   from './configuration-list.component';
import { UtcComponent } from './utc.component';
import { ErrorElementDirective }   from './zeidon-angular';
import { ConfigurationComponent }   from './configuration.component';
import { RestService }   from './rest.service';
import { SessionComponent }   from './session.component';
import { HistoryComponent }   from './history.component';
import { HistoryDetailComponent }   from './history-detail.component';

import { ZeidonConfiguration } from './zeidon';
import { ZeidonRestValues } from './zeidon-rest-client';
import { ZeidonAngularConfiguration, ZeidonRestService } from './zeidon-angular';

// If we are running under browserSync then we'll set the port number to be 8080.
// This makes it easier to switch back and forth between dev mode and running under Jetty.
let zeidonRestPort = window.location.port;
if ( (window as any).___browserSync___ ) {
  console.log("Running under browserSync");
  zeidonRestPort = "8080";  // Set port to be jetty running in different process.
}

const REST_VALUES: ZeidonRestValues = {
  restUrl: `http://${window.location.hostname}:${zeidonRestPort}/api/utc`
};

@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  ReactiveFormsModule,
                  HttpClientModule,
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
                    },
                    {
                      path: 'history',
                      component: HistoryComponent
                    },
                    {
                      path: 'utc',
                      component: UtcComponent
                    }
                    ], { useHash: true } /* required for use with Jetty */ )
   ],
  declarations: [ AppComponent,
                  ConfigurationListComponent,
                  ConfigurationComponent,
                  ErrorElementDirective,
                  HistoryComponent,
                  HistoryDetailComponent,
                  UtcComponent,
                  SessionComponent ],
  providers: [ RestService,
               ZeidonRestService,
               { provide: ZeidonRestValues, useValue: REST_VALUES },
               { provide: ZeidonConfiguration, useClass: ZeidonAngularConfiguration },
             ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  // This constructor is required to force Angular injector to load the ZeidonConfiguration.
  constructor( private zeidonConfig: ZeidonConfiguration ) { }
}
