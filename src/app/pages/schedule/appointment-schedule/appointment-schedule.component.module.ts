import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, MatSelectModule, MatGridListModule, MatSidenavModule, MatSlideToggleModule, MatDatepickerModule, MatButtonToggleModule, MatBottomSheetModule, MatListModule, MatCheckboxModule } from '@angular/material';
import { AppointmentScheduleComponent } from './appointment-schedule.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppointmentScheduleDialogComponent } from './appointment-schedule-dialog/appointment-schedule-dialog.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AmazingTimePickerModule } from 'amazing-time-picker';
// import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ContextMenuModule } from 'ngx-contextmenu';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppointmentScheduleBottomSheetComponent } from './appointment-schedule-bottom-sheet/appointment-schedule-bottom-sheet.component';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";

registerLocaleData(localeEs);

@NgModule({
    declarations: [
        AppointmentScheduleComponent,
        AppointmentScheduleDialogComponent,
        AppointmentScheduleBottomSheetComponent
    ],
    entryComponents: [
        AppointmentScheduleComponent,
        AppointmentScheduleDialogComponent,
        AppointmentScheduleBottomSheetComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        MatDividerModule,
        MatTooltipModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule,
        MatGridListModule,
        BrowserAnimationsModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        FlatpickrModule.forRoot(),
        MatSidenavModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        AmazingTimePickerModule,
        // NgxMatDatetimePickerModule,
        // NgxMatTimepickerModule,
        // NgxMatNativeDateModule,
        ContextMenuModule.forRoot(
            { useBootstrap4: true }
        ),
        MatButtonToggleModule,
        DragDropModule,
        MatBottomSheetModule,
        MatListModule,
        MatMomentDateModule,
        MatCheckboxModule
    ],
    providers: [
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
    ],
    bootstrap: []
})
export class AppointmentScheduleModule { }
