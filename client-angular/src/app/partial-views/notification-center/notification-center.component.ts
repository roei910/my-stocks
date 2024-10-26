import { Component } from '@angular/core';
import { StockNotification } from 'src/models/users/stock-notification';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.css']
})
export class NotificationCenterComponent {
  stockNotifications?: StockNotification[];

  constructor(private userService: UserService
  ){}

  ngOnInit(): void {
    this.userService.getUser()
      .subscribe(user => this.stockNotifications = user.stockNotifications);
  }
}
