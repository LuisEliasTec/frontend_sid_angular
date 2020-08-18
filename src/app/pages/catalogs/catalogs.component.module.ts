import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from '../pages.routes';
import * as Service from '../../services/services.index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CatalogsComponent } from './catalogs.component';
import { ProcedureTypesModule } from './procedure-types/procedure-types.component.module';
import { ConsultingRoomsModule } from './consulting-rooms/consulting-rooms.component.module';

@NgModule({
    declarations: [
        CatalogsComponent,
    ],
    entryComponents: [
        CatalogsComponent
    ],
    imports: [
        BrowserModule,
        PAGES_ROUTES,
        BrowserAnimationsModule,
        HttpClientModule,
        CommonModule,
        MatSnackBarModule,
        ProcedureTypesModule,
        ConsultingRoomsModule
    ],
    providers: [
        Service.ApiService,
        Service.CrudService,
        Service.SessionService,
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
    ],
    bootstrap: []
})
export class CatalogsModule { }
