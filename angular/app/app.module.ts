import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { ConfigurationListComponent }   from './configuration-list.component';
import { ConfigurationComponent }   from './configuration.component';
import { RestService }   from './rest.service';
import { SessionComponent }   from './session.component';
import { RouterModule }   from '@angular/router';

@NgModule({
  imports:      [ BrowserModule, FormsModule,
                  RouterModule.forRoot([
                    {
                      path: '',
                      redirectTo: '/dashboard',
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
  providers: [ RestService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
