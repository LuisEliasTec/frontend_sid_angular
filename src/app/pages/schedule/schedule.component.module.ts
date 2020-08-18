import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from '../pages.routes';
import * as Service from '../../services/services.index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScheduleComponent } from './schedule.component';
import { WaitingListModule } from './waitining-list/waitining-list.component.module';
import { AppointmentScheduleModule } from './appointment-schedule/appointment-schedule.component.module';

@NgModule({
    declarations: [
        ScheduleComponent,
    ],
    entryComponents: [
        ScheduleComponent
    ],
    imports: [
        BrowserModule,
        PAGES_ROUTES,
        BrowserAnimationsModule,
        HttpClientModule,
        CommonModule,
        MatSnackBarModule,
        WaitingListModule,
        AppointmentScheduleModule
    ],
    providers: [],
    bootstrap: []
})
export class ScheduleModule { }
