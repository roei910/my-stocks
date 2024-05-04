import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { StocksViewerComponent } from './home/stocks-viewer/stocks-viewer.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { UserLoginComponent } from './home/user-login/user-login.component';
import { UserRegisterComponent } from './home/user-register/user-register.component';
import { UserInformationComponent } from './home/user-information/user-information.component';
import { StocksSearchComponent } from './home/stocks-search/stocks-search.component';

import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    StocksViewerComponent,
    NotFoundComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserInformationComponent,
    StocksSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
