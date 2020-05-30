import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, 
  MatInputModule, MatTooltipModule, MatFormFieldModule
} from '@angular/material';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  entryComponents: [],
  // exports: [FlexLayoutModule],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatFormFieldModule,
    // FlexLayoutModule,
    MatCardModule
  ],
  providers: []
})

export class PublicComponentModule { }
