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
var core_1 = require("@angular/core");
var Configuration_1 = require("./Configuration");
var rest_service_1 = require("./rest.service");
var ConfigurationListComponent = (function () {
    function ConfigurationListComponent(restService) {
        this.restService = restService;
    }
    ConfigurationListComponent.prototype.ngOnInit = function () {
        this.getConfigurationList();
    };
    ConfigurationListComponent.prototype.getConfigurationList = function () {
        var _this = this;
        Configuration_1.Configuration.activate().subscribe(function (configList) {
            _this.configurationList = configList;
        });
    };
    ConfigurationListComponent.prototype.onSelect = function (config) {
        var _this = this;
        Configuration_1.Configuration.activate({ Id: config.Id }).subscribe(function (configOi) {
            _this.selectedConfigOi = configOi;
        });
    };
    /**
     * Delete the selected configuration from the OI list.
     */
    ConfigurationListComponent.prototype.onDelete = function (config) {
        this.restService.deleteConfiguration(config);
    };
    ConfigurationListComponent.prototype.newConfiguration = function () {
        // Instantiate a new Configuration with a single ThermometerConfig.
        this.selectedConfigOi = new Configuration_1.Configuration({ ThermometerConfig: {} });
    };
    ConfigurationListComponent.prototype.onSessionStarted = function (sessionOi) {
        console.log("onSessionStarted");
        sessionOi.logOi();
        this.sessionOi = sessionOi;
    };
    return ConfigurationListComponent;
}());
ConfigurationListComponent = __decorate([
    core_1.Component({
        selector: 'configuration-list',
        template: "\n  <div *ngIf=\"sessionOi && sessionOi.isEmpty == false\" class=\"alert alert-danger\">\n    Session is running!\n  </div>\n  <div *ngIf=\"configurationList && configurationList.isEmpty == false\">\n    <ul class=\"configurations\">\n        <li *ngFor=\"let config of configurationList.Configuration\"\n            [class.selected]=\"selectedConfigOi && selectedConfigOi.Configuration$.Id == config.Id\">\n            <span (click)=\"onSelect(config)\">\n                <span class=\"badge\">{{config.Id}}</span> {{config.Description}}\n            </span>\n            <img src=\"/img/icons/red-x.png\" (click)=\"onDelete( config )\"/>\n        </li>\n    </ul>\n  </div>\n  <button type=\"button\" class=\"btn btn-default\" (click)=\"newConfiguration()\">\n        New Configuration\n  </button>\n  <div *ngIf=\"selectedConfigOi\">\n    <configuration-detail [configOi]=\"selectedConfigOi\" [configurationList]=\"configurationList\"\n        (onSessionStarted)=\"onSessionStarted($event)\" >\n    </configuration-detail>\n  </div>\n",
        styleUrls: ['app/configuration.css'],
        providers: [rest_service_1.RestService]
    }),
    __metadata("design:paramtypes", [rest_service_1.RestService])
], ConfigurationListComponent);
exports.ConfigurationListComponent = ConfigurationListComponent;
//# sourceMappingURL=configuration-list.component.js.map