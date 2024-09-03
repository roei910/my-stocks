import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { UserLoginComponent } from './home/user-login/user-login.component';
import { UserRegisterComponent } from './home/user-register/user-register.component';
import { UserInformationComponent } from './home/user-information/user-information.component';
import { StocksViewerComponent } from './home/stocks-viewer/stocks-viewer.component';
import { StocksSearchComponent } from './home/stocks-search/stocks-search.component';
import { StockInformationComponent } from './home/stock-information/stock-information.component';
import { StockSharesComponent } from './home/stock-shares/stock-shares.component';
import { connectedUserGuard } from 'src/routeGuards/connected-user.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  {
    path: 'stocks',
    children: [
      { path: 'search', component: StocksSearchComponent },
      { path: 'information', component: StockInformationComponent }
    ],
  },
  {
    path: 'user',
    children: [
      { path: 'stocks', component: StocksViewerComponent },
      { path: 'stocks', children: [
        { path: 'shares', component: StockSharesComponent}
      ]},
      { path: 'information', component: UserInformationComponent },
    ],
    canActivateChild: [connectedUserGuard]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }