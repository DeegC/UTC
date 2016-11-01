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
             //  { provide: zeidon.ZEIDON_CONFIG, useValue: ZEIDON_CONFIG } 
               { provide: zeidon.ZeidonRestUrl, useValue: "http://localhost:8080/utc" },
               { provide: zeidon.ZeidonConfiguration, useClass: zeidon.ZeidonRestConfiguration },
               zeidon.ZeidonService,
             ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 
  constructor( private zeidonService: zeidon.ZeidonService ) {
    console.log( zeidonService );
  }

}
