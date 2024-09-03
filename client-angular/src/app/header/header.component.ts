import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ){

  }

  IsConnected(): boolean{
    return this.authenticationService.isUserConnected();
  }

  SignOut(){
    this.authenticationService.DisconnectUser();
    this.router.navigate(['/']);
  }
}