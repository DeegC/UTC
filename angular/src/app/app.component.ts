import { Component } from '@angular/core';
@Component({
  selector: 'utc-app',
  styleUrls: ['app/app.component.css'],
  template: `
    <h1>{{title}}</h1>
    <nav>
        <a routerLink="/configlist" routerLinkActive="active">Configurations</a>
        <a routerLink="/session" routerLinkActive="active">Session</a>
        <a routerLink="/history" routerLinkActive="active">History</a>
    </nav>
    <router-outlet></router-outlet>
`
})
export class AppComponent {
  title = 'Universal Temperature Controller';
}
