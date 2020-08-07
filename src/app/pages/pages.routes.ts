import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { LoginComponent } from '../public-components/login/login.component';
import { PatientsComponent } from './medical-records/patients/patients.component';
import { ProcedureTypesComponent } from './catalogs/procedure-types/procedure-types.component';
import { ConsultingRoomsComponent } from './catalogs/consulting-rooms/consulting-rooms.component';
import { WaitiningListComponent } from './schedule/waitining-list/waitining-list.component';
import { AppointmentScheduleComponent } from './schedule/appointment-schedule/appointment-schedule.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    // canActivate: [LoginGuardGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' }
      },
      {
        path: 'agenda-citas',
        component: AppointmentScheduleComponent,
        data: { titulo: 'Agenda de citas' }
      },
      {
        path: 'tipo-procedimientos',
        component: ProcedureTypesComponent,
        data: { titulo: 'Procedimientos' }
      },
      {
        path: 'procedimientos',
        component: ProceduresComponent,
        data: { titulo: 'Procedimientos' }
      },
      {
        path: 'pacientes',
        component: PatientsComponent,
        data: { titulo: 'Pacientes' }
      },
      {
        path: 'consultorios',
        component: ConsultingRoomsComponent,
        data: { titulo: 'Consultorios' }
      },
      {
        path: 'lista-espera',
        component: WaitiningListComponent,
        data: { titulo: 'Lista de espera' }
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
