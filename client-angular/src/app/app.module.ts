import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
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
import { FilterPaginationTableComponent } from './components/filter-pagination-table/filter-pagination-table.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StocksFilterPaginationTableComponent } from './partial-views/stocks-filter-pagination-table/stocks-filter-pagination-table.component';
import { NotificationCenterComponent } from './partial-views/notification-center/notification-center.component';
import { MarketTrendsComponent } from './partial-views/market-trends/market-trends.component';
import { interceptConnection } from 'src/interceptors/connection.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

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
    StockSharesComponent,
    FilterPaginationTableComponent,
    StocksFilterPaginationTableComponent,
    NotificationCenterComponent,
    MarketTrendsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    FormsModule,
    AsyncPipe,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([interceptConnection])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }