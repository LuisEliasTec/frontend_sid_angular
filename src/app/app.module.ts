import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { PageModule } from './pages/pages.component.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
    // PagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PageModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
