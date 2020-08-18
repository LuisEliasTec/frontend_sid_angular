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
import { MatPaginatorModule, MatSelectModule, MatGridListModule } from '@angular/material';
import { WaitiningListComponent } from './waitining-list.component';
import { WaitiningListDialogComponent } from './waitining-list-dialog/waitining-list-dialog.component';

@NgModule({
    declarations: [
        WaitiningListComponent,
        WaitiningListDialogComponent
    ],
    entryComponents: [
        WaitiningListComponent,
        WaitiningListDialogComponent
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
        MatSelectModule,
        MatGridListModule
    ],
    providers: [],
    bootstrap: []
})
export class WaitingListModule { }
