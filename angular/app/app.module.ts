import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { ConfigurationComponent }   from './configuration.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, ConfigurationComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
