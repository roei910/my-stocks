import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { UserLoginComponent } from './home/user-login/user-login.component';
import { UserRegisterComponent } from './home/user-register/user-register.component';
import { UserInformationComponent } from './home/user-information/user-information.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', component: UserInformationComponent},
  { path: 'user', children: [
    { path: 'login', component: UserLoginComponent},
    { path: 'register', component: UserRegisterComponent}
  ] },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
