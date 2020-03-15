import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: []
})
export class DashboardModule { }
