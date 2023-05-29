import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../guards/auth.guard";

import { AccountSettings } from "./account-settings/account-settings.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graph1Component } from "./graph1/graph1.component";
import { PagesComponent } from "./pages.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromisesComponent } from "./promises/promises.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./maintenances/users/users.component";


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
      { path: 'graph1', component: Graph1Component, data: { title: 'Graph #1' } },
      { path: 'account-settings', component: AccountSettings, data: { title: 'Account settings' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'My profile'} },

      //Maintenances
      { path: 'users', component: UsersComponent, data: { title: 'Users' } }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule {}
