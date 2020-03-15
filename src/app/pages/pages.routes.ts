import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
