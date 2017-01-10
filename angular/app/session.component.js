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
var rest_service_1 = require("./rest.service");
var SessionComponent = (function () {
    function SessionComponent(restService) {
        this.restService = restService;
        this.currentMessage = "No session is currently running";
    }
    SessionComponent.prototype.ngOnInit = function () {
        this.getCurrentSession();
        this.getCurrentState();
    };
    SessionComponent.prototype.getCurrentSession = function () {
        var _this = this;
        this.restService.getCurrentSession().subscribe(function (session) {
            _this.currentSession = session;
            if (_this.currentSession.isEmpty)
                _this.currentMessage = "No Session is currently running";
            else
                _this.currentMessage = undefined;
            session.logOi();
        });
    };
    SessionComponent.prototype.getCurrentState = function () {
        var _this = this;
        this.restService.getCurrentState().subscribe(function (instant) {
            _this.currentState = instant;
            instant.logOi();
        });
    };
    SessionComponent.prototype.stopSession = function () {
        var _this = this;
        this.restService.stopSession().subscribe(function (message) {
            _this.currentSession = undefined;
            _this.currentState = undefined;
            _this.currentMessage = message;
        });
    };
    return SessionComponent;
}());
SessionComponent = __decorate([
    core_1.Component({
        selector: 'session',
        template: "\n  <h3>Current Session</h3>\n  <div>\n    {{currentMessage}}\n  </div>\n\n  <div *ngIf=\"currentSession && ! currentSession.isEmpty\" >\n      <div><label>Configuration: </label>{{currentSession.Session$.Configuration$.Description}}</div>\n      <div><label>Started at: </label>{{currentSession.Session$.Date}}</div>\n\n      <button type=\"button\" class=\"btn btn-default\" (click)=\"stopSession()\" >\n            Stop Session\n      </button>\n  </div>\n"
    }),
    __metadata("design:paramtypes", [rest_service_1.RestService])
], SessionComponent);
exports.SessionComponent = SessionComponent;
//# sourceMappingURL=session.component.js.map