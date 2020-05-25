import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ZeidonConfiguration } from './zeidon';
import { ZeidonRestValues } from './zeidon-rest-client';
import { ZeidonAngularConfiguration, ZeidonRestService, AttributeContextDirective } from './zeidon-angular';
import { RestService } from './rest.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfigurationListComponent } from './configuration-list/configuration-list.component';
import { ConfigurationComponent } from './configuration/configuration.component';

var restUrl = '';
if ( document.URL.startsWith( 'http://localhost:4200' ) )                           // Angular test server
    restUrl = `http://localhost:8080/api/utc`;                                      // Local jetty
else
if ( document.URL.startsWith( 'http://localhost' ) )                                // Served from jetty
    restUrl = `${document.baseURI}api/CheeseWiz`;

console.log( `restUrl = ${restUrl}` );

const REST_VALUES: ZeidonRestValues = {
    restUrl: restUrl
};

@NgModule( {
    declarations: [
        AppComponent,
        ConfigurationListComponent,
        ConfigurationComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        RestService,
        ZeidonRestService,
        { provide: ZeidonRestValues, useValue: REST_VALUES },
        { provide: ZeidonConfiguration, useClass: ZeidonAngularConfiguration },
    ],
    bootstrap: [ AppComponent ]
} )
export class AppModule {
    // This constructor is required to force Angular injector to load the ZeidonConfiguration.
    constructor( private zeidonConfig: ZeidonConfiguration ) { }
}
