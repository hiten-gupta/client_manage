import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { DashboardComponent } from './layout/dashboard.component';
import { ClientsListComponent } from './client-portal/clients-list.component';
import { ClientFormComponent } from './client-portal/client-form/client-form.component';
import { MeetingsListComponent } from './meeting-portal/meetings-list.component';
import { MeetingFormComponent } from './meeting-portal/meeting-form.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'clients', pathMatch: 'full' },
      { path: 'clients', component: ClientsListComponent },
      { path: 'clients/new', component: ClientFormComponent },
      { path: 'clients/:id/edit', component: ClientFormComponent },
      { path: 'meetings', component: MeetingsListComponent },
      { path: 'meetings/new', component: MeetingFormComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
