import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/Services/user.service';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private userService: UserService,
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