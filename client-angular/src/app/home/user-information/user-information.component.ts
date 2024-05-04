import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit, AfterViewInit{
  data: any;

  constructor(private userService: UserService) {
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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  GetUser() {
    return this.userService.GetUser();
  }

  getRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
    colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }
    return colors;
  }
}
