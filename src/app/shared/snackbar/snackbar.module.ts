import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    SnackbarComponent
  ],
  entryComponents: [
    SnackbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  exports: [SnackbarComponent],
  providers: [],
  bootstrap: []
})
export class SnackBarModule { }
