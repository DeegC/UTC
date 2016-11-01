"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var configuration_list_component_1 = require('./configuration-list.component');
var configuration_component_1 = require('./configuration.component');
var rest_service_1 = require('./rest.service');
var session_component_1 = require('./session.component');
var zeidon = require('./zeidon');
var AppModule = (function () {
    function AppModule(zeidonService) {
        this.zeidonService = zeidonService;
        console.log(zeidonService);
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        redirectTo: '/configlist',
                        pathMatch: 'full'
                    },
                    {
                        path: 'configlist',
                        component: configuration_list_component_1.ConfigurationListComponent
                    },
                    {
                        path: 'session',
                        component: session_component_1.SessionComponent
                    }
                ])
            ],
            declarations: [app_component_1.AppComponent,
                configuration_list_component_1.ConfigurationListComponent,
                configuration_component_1.ConfigurationComponent,
                session_component_1.SessionComponent],
            providers: [rest_service_1.RestService,
                //  { provide: zeidon.ZEIDON_CONFIG, useValue: ZEIDON_CONFIG } 
                { provide: zeidon.ZeidonRestUrl, useValue: "http://localhost:8080/utc" },
                { provide: zeidon.ZeidonConfiguration, useClass: zeidon.ZeidonRestConfiguration },
                zeidon.ZeidonService,
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [zeidon.ZeidonService])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map