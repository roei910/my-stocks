import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockNotification } from 'src/models/users/stock-notification';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  notifications?: StockNotification[];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.userService.GetUser()
      .subscribe(user => {
        this.notifications = user.stockNotifications;
      });
  }

  IsConnected(): boolean{
    return this.authenticationService.isUserConnected();
  }

  SignOut(){
    this.authenticationService.DisconnectUser();
    this.router.navigate(['/']);
  }

  NavigateNotifications(){
    this.router.navigate(['/', 'user', 'notifications'])
  }
}