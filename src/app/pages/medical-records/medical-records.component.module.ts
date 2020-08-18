import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PatientsModule } from './patients/patients.component.module';

@NgModule({
    declarations: [

    ],
    entryComponents: [

    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        PatientsModule
    ],
    providers: [],
    bootstrap: []
})
export class MedicalRecordsModule { }
