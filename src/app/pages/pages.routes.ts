import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { LoginComponent } from '../public-components/login/login.component';

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
        path: 'procedimientos',
        component: ProceduresComponent,
        data: { titulo: 'Procedimientos' }
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
