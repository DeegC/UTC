import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationListComponent } from './configuration-list/configuration-list.component';
import { UtcComponent } from './utc/utc.component';

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
        path: 'utc',
        component: UtcComponent
    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
