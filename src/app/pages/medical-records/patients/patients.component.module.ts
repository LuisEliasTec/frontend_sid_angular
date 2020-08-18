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
import { MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatSelectModule, MatGridListModule, MatTabsModule } from '@angular/material';
import { PatientsComponent } from "./patients.component";
import { PatientsDialogComponent } from './patients-dialog/patients-dialog.component';

@NgModule({
    declarations: [
        PatientsComponent,
        PatientsDialogComponent
    ],
    entryComponents: [
        PatientsComponent,
        PatientsDialogComponent
    ],
    imports: [
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
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatGridListModule,
        MatTabsModule
    ],
    providers: [
        {provide: MAT_DATE_LOCALE, useValue: 'es'}
    ],
    bootstrap: []
})
export class PatientsModule { }
