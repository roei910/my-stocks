import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { StocksViewerComponent } from './home/stocks-viewer/stocks-viewer.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { UserLoginComponent } from './home/user-login/user-login.component';
import { UserRegisterComponent } from './home/user-register/user-register.component';
import { StocksSearchComponent } from './home/stocks-search/stocks-search.component';
import { StockInformationComponent } from './home/stock-information/stock-information.component';
import { StocksTableComponent } from './home/stocks-viewer/stocks-table/stocks-table.component';
import { StockSharesComponent } from './home/stock-shares/stock-shares.component';
import { AsyncPipe } from '@angular/common';

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
    StocksSearchComponent,
    StockInformationComponent,
    StocksTableComponent,
    StockSharesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    FormsModule,
    AsyncPipe
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
