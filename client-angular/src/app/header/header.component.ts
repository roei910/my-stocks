import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private userService: UserService,
    private router: Router
  ){

  }

  IsConnected(): boolean{
    return this.userService.isUserConnected();
  }

  SignOut(){
    this.userService.DisconnectUser();
    this.router.navigate(['/']);
  }
}