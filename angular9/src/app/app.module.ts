import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ZeidonConfiguration } from './zeidon';
import { ZeidonRestValues } from './zeidon-rest-client';
import { ZeidonAngularConfiguration, ZeidonRestService, AttributeContextDirective } from './zeidon-angular';
import { RestService } from './rest.service';
import { HttpClientModule } from '@angular/common/http';

// If we are running under browserSync then we'll set the port number to be 8080.
// This makes it easier to switch back and forth between dev mode and running under Jetty.
let zeidonRestPort = window.location.port;
if ( ( window as any ).___browserSync___ ) {
    console.log( "Running under browserSync" );
    zeidonRestPort = "8080";  // Set port to be jetty running in different process.
}

const REST_VALUES: ZeidonRestValues = {
    restUrl: `http://${window.location.hostname}:${zeidonRestPort}/api/utc`
};

@NgModule( {
    declarations: [
        AppComponent
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
