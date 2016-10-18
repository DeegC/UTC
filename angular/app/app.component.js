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
var configuration_1 = require('./configuration');
var AppComponent = (function () {
    function AppComponent() {
        this.configurationList = new configuration_1.Configuration([
            {
                Id: 100,
                Description: "Configuration 1",
                TargetTemperature: 225,
                ThermometerCount: 1
            },
            {
                Id: 101,
                Description: "Configuration 2",
                TargetTemperature: 200,
                ThermometerCount: 1
            }
        ]);
    }
    AppComponent.prototype.onSelect = function (config) {
        this.selectedConfigOi = new configuration_1.Configuration({
            Id: config.Id,
            Description: "Test Description",
            TargetTemperature: 160,
            ThermometerCount: 1,
            ThermometerConfig: [
                {
                    Id: 11,
                    Name: 'Pit',
                    AlarmOn: false,
                    fk_id_configuration: 100,
                }
            ],
        });
        var tc = this.selectedConfigOi.Configuration$.ThermometerConfig.create();
        tc.AlarmOn = false;
        tc.Name = "TestName";
        console.log(JSON.stringify(this.selectedConfigOi, null, 2));
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'utc-app',
            template: "\n  <h1>Universal Temperature Controller</h1>\n  <ul class=\"configurations\">\n    <li *ngFor=\"let config of configurationList.Configuration\" \n         [class.selected]=\"selectedConfigOi && selectedConfigOi.Configuration$.Id == config.Id\"\n         (click)=\"onSelect(config)\">\n      <span class=\"badge\">{{config.Id}}</span> {{config.Description}}\n    </li>\n  </ul>\n  <configuration-detail [configuration]=\"selectedConfigOi\"></configuration-detail>\n",
            styleUrls: ['app/configuration.css']
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map