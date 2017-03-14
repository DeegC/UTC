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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Session_1 = require("./Session");
var rest_service_1 = require("./rest.service");
var SessionDetailComponent = (function () {
    function SessionDetailComponent(restService) {
        this.restService = restService;
    }
    SessionDetailComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.restService.getChart(this.sessionOi.Session$.Id)
            .subscribe(function (url) { _this.chartUrl = url; });
    };
    return SessionDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Session_1.Session)
], SessionDetailComponent.prototype, "sessionOi", void 0);
SessionDetailComponent = __decorate([
    core_1.Component({
        selector: 'session-detail',
        template: "\n    <div>\n    =============================================================\n        {{sessionOi.Session$.Date | date:'yyyy-MM-dd hh:mm a'}}\n        <div *ngIf=\"chartUrl\">\n            <img [src]=\"chartUrl\" />\n        </div>\n    </div>\n",
        styleUrls: ['app/configuration.css'],
        providers: [rest_service_1.RestService]
    }),
    __metadata("design:paramtypes", [rest_service_1.RestService])
], SessionDetailComponent);
exports.SessionDetailComponent = SessionDetailComponent;
//# sourceMappingURL=session-detail.component.js.map