import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationListComponent } from './configuration-list/configuration-list.component';
import { UtcComponent } from './utc/utc.component';
import { HistoryComponent } from './history/history.component';
import { SessionComponent } from './session/session.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'configlist',
        pathMatch: 'full'
    },
    {
        path: 'configlist',
        component: ConfigurationListComponent
    },
    {
        path: 'session',
        component: SessionComponent
    },
    {
        path: 'utc',
        component: UtcComponent
    },
    {
        path: 'history',
        component: HistoryComponent
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
