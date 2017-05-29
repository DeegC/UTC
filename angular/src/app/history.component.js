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
var HistoryComponent = (function () {
    function HistoryComponent(restService) {
        this.restService = restService;
    }
    HistoryComponent.prototype.ngOnInit = function () {
        this.getSessionList();
    };
    HistoryComponent.prototype.getSessionList = function () {
        var _this = this;
        Session_1.Session.activate().subscribe(function (sessionList) {
            _this.sessionList = sessionList;
        });
    };
    HistoryComponent.prototype.onSelect = function (session) {
        var _this = this;
        Session_1.Session.activate({ Id: session.Id }).subscribe(function (sessionOi) {
            _this.selectedSessionOi = sessionOi;
        });
    };
    /**
     * Delete the selected session from the OI list.
     */
    HistoryComponent.prototype.onDelete = function (session) {
        this.restService.deleteRoot(session);
    };
    return HistoryComponent;
}());
HistoryComponent = __decorate([
    core_1.Component({
        selector: 'history',
        template: "\n  <div *ngIf=\"sessionList && sessionList.isEmpty == false\">\n    <ul class=\"configurations\">\n        <li *ngFor=\"let session of sessionList.Session\"\n            [class.selected]=\"selectedSessionOi && selectedSessionOi.Session$.Id == session.Id\">\n            <span (click)=\"onSelect(session)\">\n                <span class=\"badge\">{{session.Id}}</span> {{session.Date | date:'yyyy-MM-dd hh:mm a'}}\n            </span>\n            <img src=\"/img/icons/red-x.png\" (click)=\"onDelete( session )\"/>\n        </li>\n    </ul>\n  </div>\n  <div *ngIf=\"selectedSessionOi\">\n    <session-detail [sessionOi]=\"selectedSessionOi\" >\n    </session-detail>\n  </div>\n",
        styleUrls: ['app/configuration.css'],
        providers: [rest_service_1.RestService]
    }),
    __metadata("design:paramtypes", [rest_service_1.RestService])
], HistoryComponent);
exports.HistoryComponent = HistoryComponent;
//# sourceMappingURL=history.component.js.map