import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.component.module';
import * as Service from '../services/services.index';
import { ProceduresModule } from './procedures/procedures.component.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from '../shared/shared.module';
import { MedicalRecordsModule } from "./medical-records/medical-records.component.module";
import { CatalogsModule } from './catalogs/catalogs.component.module';
import { ScheduleModule } from './schedule/schedule.component.module';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    PAGES_ROUTES,
    DashboardModule,
    ProceduresModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    MatSnackBarModule,
    SharedModule,
    MedicalRecordsModule,
    CatalogsModule,
    ScheduleModule
  ],
  providers: [
    Service.ApiService,
    Service.CrudService,
    Service.SessionService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  bootstrap: []
})
export class PageModule { }
