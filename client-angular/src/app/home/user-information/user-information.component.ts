import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { Share } from 'models/shares/share';
import { User } from 'models/users/user';
import { Stock } from 'models/stocks/stock';
import { UserService } from 'services/user.service';
import { AuthenticationService } from 'services/authentication.service';
import { StockService } from 'services/stock.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css'],
  standalone: true,
  imports: [
    AsyncPipe,
    ChartModule
  ]
})
export class UserInformationComponent implements OnInit {
  chartData: any;
  user?: Observable<User>;
  ownedStocks: { [stocksymbol: string]: Share } = {};
  stocksDictionary: { [stockSymbol: string]: Stock } = {};
  ownedStocksSubject: BehaviorSubject<{ [stocksymbol: string]: Share }> =
    new BehaviorSubject<{ [stocksymbol: string]: Share }>({});

  constructor(private userService: UserService,
    private authenticationService: AuthenticationService,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    let userEmail = this.authenticationService.GetUserEmail();

    if (userEmail == undefined)
      return;

    this.stockService.GetAllStocks()
    .subscribe(stocks => 
    {
      stocks.map(stock => this.stocksDictionary[stock.symbol] = stock);
      this.InitializeOwnedStocks();
      this.InitializeChartData();
    });

    this.user = this.userService.GetUserByEmail(userEmail);
  }

  InitializeChartData() {
    this.ownedStocksSubject.asObservable().subscribe(ownedStocks => {
      const ownedStockSymbols = Object.keys(ownedStocks);
      
      const data = ownedStockSymbols.map((symbol: string) => {
        return (this.stocksDictionary[symbol]?.price ?? 0) * ownedStocks[symbol].amount;
      })
      
      this.chartData = {
        labels: ownedStockSymbols,
        datasets: [
          {
            label: 'Stocks',
            data: data,
            fill: true,
            backgroundColor: this.getRandomColors(data.length),
            borderColor: '#FFFFFF'
          }
        ]
      };
    });
  }

  getRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }
    return colors;
  }

  CountOwnedStocks() {
    return Object.keys(this.ownedStocks).length;
  }

  GetTotalGain() {
    let ownedStockSymbols = Object.keys(this.ownedStocks);
    let totalGain = 0;

    ownedStockSymbols.forEach((symbol: string) => {
      let stockValue = this.stocksDictionary[symbol].price * this.ownedStocks[symbol].amount;
      let purchaseValue = this.ownedStocks[symbol].purchasingPrice * this.ownedStocks[symbol].amount;
      totalGain += stockValue - purchaseValue;
    });

    return totalGain;
  }

  InitializeOwnedStocks() {
    this.user?.subscribe(user => {
      Object.keys(user.watchingStocksByListName).forEach((listName: string) => {
        let watchingStocks = user.watchingStocksByListName[listName];

        Object.keys(watchingStocks).forEach((stockSymbol: string) => {
          let sharesDictionary = watchingStocks[stockSymbol].purchaseGuidToShares
          this.UpdateOwnedStocksByStockShares(stockSymbol, sharesDictionary);
        })
      });

      this.ownedStocksSubject.next(this.ownedStocks);
    })
  }

  UpdateOwnedStocksByStockShares(stockSymbol: string,
    shareToPurchaseIdDictionary: { [purchaseGuid: string]: Share }) {
    let amount = 0;
    let equity = 0;

    Object.keys(shareToPurchaseIdDictionary).forEach((purchaseGuid: string) => {
      let share = shareToPurchaseIdDictionary[purchaseGuid];
      amount += share.amount;
      equity += share.amount * share.purchasingPrice;
    });

    if (stockSymbol in this.ownedStocks) {
      let previousAmount = this.ownedStocks[stockSymbol].amount
      amount += previousAmount;
      equity += this.ownedStocks[stockSymbol].purchasingPrice * previousAmount;
    }

    if (amount > 0)
      this.ownedStocks[stockSymbol] = {
        amount: amount,
        purchasingPrice: equity / amount,
      };
  }
}