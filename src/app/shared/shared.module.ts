import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SnackBarModule } from './snackbar/snackbar.module';

@NgModule({
  declarations: [],
  entryComponents: [],
  // exports: [FlexLayoutModule],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SnackBarModule
  ],
  providers: []
})

export class SharedModule { }
