import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.component.module';
// import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    PagesComponent,
    // DashboardComponent
  ],
  entryComponents: [
    // DashboardComponent
  ],
  imports: [
    BrowserModule,
    PAGES_ROUTES,
    DashboardModule
  ],
  providers: [],
  bootstrap: []
})
export class PageModule { }
