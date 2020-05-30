import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core';
import { ProceduresComponent } from './procedures.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProcedureDialogComponent } from './procedure-dialog/procedure-dialog/procedure-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material';

@NgModule({
  declarations: [
    ProceduresComponent,
    ProcedureDialogComponent
  ],
  entryComponents: [
    ProcedureDialogComponent
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
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: []
})
export class ProceduresModule { }
