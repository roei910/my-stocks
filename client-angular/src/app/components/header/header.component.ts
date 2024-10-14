import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        routerLink: ['']
      },
      {
        label: 'Search',
        routerLink: ['stocks', 'search']
      },
      {
        label: 'Stocks',
        routerLink: ['stocks', 'all']
      },
      {
        label: 'Login',
        visible: false,
        command: () => this.router.navigate(['/login']),
      },
      {
        label: 'User',
        visible: false,
        items: [
          { label: 'My Stocks', routerLink: ['user', 'stocks'] },
          { label: 'Information', routerLink: ['user', 'information'] },
          { label: 'Notifications', routerLink: ['user', 'notifications']},
          { label: 'Sign Out', icon: 'pi pi-fw pi-trash', command: () => this.SignOut() },
        ]
      }
    ];

    this.authenticationService.isUserConnected()
      .subscribe(isUserConnected => {
        let loginItemIndex = this.items
          .findIndex(item => item.label == 'Login')

        this.items[loginItemIndex].visible = !isUserConnected;

        let userItemIndex = this.items
          .findIndex(item => item.label == 'User')

        this.items[userItemIndex].visible = isUserConnected;
      });
  }

  SignOut() {
    this.authenticationService.DisconnectUser();
    this.router.navigate(['/']);
  }
}