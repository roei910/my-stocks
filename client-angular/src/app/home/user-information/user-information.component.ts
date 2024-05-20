import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/Services/database.service';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent{
  data: any;
  user: any;

  constructor(private userService: UserService, private database: DatabaseService) {
    let userEmail = this.userService.GetUser();
    this.user = this.database.Stocks.find((user: any) => user.email == userEmail);

    const tempData = [30, 25, 20, 15, 10];

    this.data = {
      labels: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB'],
      datasets: [
        {
          // label: 'Sales',
          data: tempData,
          fill: true,
          backgroundColor: this.getRandomColors(tempData.length),
          borderColor: '#FFFFFF'
        }
      ]
    };
  }

  getRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
    colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }
    return colors;
  }
}
