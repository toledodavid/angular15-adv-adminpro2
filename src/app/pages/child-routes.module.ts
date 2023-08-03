import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from "../guards/admin.guard";

import { AccountSettings } from "./account-settings/account-settings.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Graph1Component } from "./graph1/graph1.component";
import { ProgressComponent } from "./progress/progress.component";
import { PromisesComponent } from "./promises/promises.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./maintenances/users/users.component";
import { HospitalsComponent } from "./maintenances/hospitals/hospitals.component";
import { DoctorsComponent } from "./maintenances/doctors/doctors.component";
import { DoctorComponent } from "./maintenances/doctors/doctor.component";
import { SearchComponent } from "./search/search.component";



const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
  { path: 'graph1', component: Graph1Component, data: { title: 'Graph #1' } },
  { path: 'account-settings', component: AccountSettings, data: { title: 'Account settings' } },
  { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'My profile'} },
  { path: 'search/:term', component: SearchComponent, data: { title: 'Searches'} },

  //Maintenances
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals' } },
  { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors' } },
  { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Doctor' } },

  // Admin routes
  { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Users' } },
];

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
