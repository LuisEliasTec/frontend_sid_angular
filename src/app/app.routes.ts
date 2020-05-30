import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public-components/login/login.component';

const appRoutes: Routes = [

    // { path: 'portal', component: PortalComponent },
    { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    // { path: '**', component: NopagefoundComponent },
    // { path: '', redirectTo: 'portal', pathMatch: 'full' }
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes, {
    useHash: true,
    anchorScrolling: 'enabled',

});
