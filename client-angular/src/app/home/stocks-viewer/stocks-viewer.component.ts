import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/Services/database.service';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-stocks-viewer',
  templateUrl: './stocks-viewer.component.html',
  styleUrls: ['./stocks-viewer.component.css']
})
export class StocksViewerComponent implements OnInit{
  IsConnected : boolean = true;
  Stocks!: any;
  User!: any;
  UserStocks = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 125.75,
        prediction: '+10%'
    },
    {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 2325.12,
        prediction: '+15%'
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 285.45,
        prediction: '+8%'
    },
    {
        symbol: 'AMZN',
        name: 'Amazon.com, Inc.',
        price: 3275.89,
        prediction: '+12%'
    }
];

  constructor(private db: DatabaseService, private userService: UserService){}

  ngOnInit(): void {
    this.User = this.userService.GetUser();
    this.Stocks = this.db.GetStocks(this.User.email);
    // console.log(this.Stocks);
  }
}
