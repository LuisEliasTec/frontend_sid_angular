import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { PageModule } from './pages/pages.component.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { SnackBarModule } from './shared/snackbar/snackbar.module';
import { PublicComponentModule } from './public-components/public-components.module';
import { APP_ROUTES } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');
import 'moment/locale/es'

@NgModule({
  declarations: [
    AppComponent,
    // NavbarComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    PageModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    SnackBarModule,
    PublicComponentModule,
    APP_ROUTES
  ],
  exports: [
    // NavbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
