import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stock } from 'src/models/stocks/stock';
import { StockNotification } from 'src/models/users/stock-notification';
import { AuthenticationService } from 'src/services/authentication.service';
import { SharesService } from 'src/services/shares.service';
import { StockService } from 'src/services/stock.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent {
  symbol?: string | null;
  stock?: Stock;
  data?: any;

  constructor(private activatedRoute: ActivatedRoute,
    private stockService: StockService,
    private shareService: SharesService,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { 
      const tempData = [30, 25, 20, 15, 10];

      this.data = {
        labels: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB'],
        datasets: [
          {
            // label: 'Sales',
            data: tempData,
            fill: true,
            borderColor: '#FFFFFF'
          }
        ]
      };
    }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.symbol = params['stockSymbol'];
    });

    if(!this.symbol)
      return;

    this.stockService.GetStockBySymbol(this.symbol)
      .subscribe(stock => this.stock = stock);
  }

  AddToList(){
    var email = this.authenticationService.GetUserEmail();

    if(email == null || this.symbol == null)
      return;

    var listName: string = prompt("please enter the list name") ?? "";

    this.shareService.AddWatchingStock(email, listName, this.symbol);
  }

  AddNotification(){
    var email = this.authenticationService.GetUserEmail();

    if(email == null || this.symbol == null)
      return;

    var targetPrice: number = parseInt(prompt("please enter a target price") ?? "0");

    if(targetPrice == null || targetPrice == 0)
      return;

    var biggerThanOrEqual: string = prompt("should the stock price be higher than or equal to the target price") ?? "true";

    let stockNotification: StockNotification = {
      userEmail: email,
      stockSymbol: this.symbol,
      targetPrice: targetPrice,
      isBiggerThanOrEqual: biggerThanOrEqual.toLowerCase() == "true"
    }
    
    //TODO: i think this is not finished

    this.userService.AddStockNotification(stockNotification)
      .subscribe(notificationId => console.log(notificationId));
  }
}