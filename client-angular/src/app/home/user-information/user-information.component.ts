import { Component, OnInit } from '@angular/core';
import { Share } from 'src/models/share';
import { Stock } from 'src/models/stock';
import { User } from 'src/models/user';
import { UserService } from 'src/Services/user.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit{
  chartData: any;
  user?: User;
  ownedStocks: {[stocksymbol: string] : Share} = {};
  stocksDictionary: {[stockSymbol: string]: Stock} = {};

  constructor(private userService: UserService,
    private authenticationService: AuthenticationService,
    private stockService: StockService
  ) { }

  async ngOnInit(): Promise<void> {
    let userEmail = this.authenticationService.GetUserEmail();

    if(userEmail == undefined)
      return;

    let stocksList = await this.stockService.GetAllStocksAsync()
    
    stocksList.map(stock => this.stocksDictionary[stock.symbol] = stock);
    this.user = await this.userService.GetUserByEmailAsync(userEmail);

    if(this.user == undefined)
      return;

    this.InitializeOwnedStocks();
    this.InitializeChartData();
  }

  InitializeChartData(){
    const ownedStockSymbols = Object.keys(this.ownedStocks);
    const data = ownedStockSymbols.map((symbol: string) => {
      return this.stocksDictionary[symbol].price * this.ownedStocks[symbol].amount;
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
  }

  getRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }
    return colors;
  }

  CountOwnedStocks(){
    return Object.keys(this.ownedStocks).length;
  }

  GetTotalGain(){
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
    Object.keys(this.user!.watchingStocksByListName).forEach((listName: string) => {
      let watchingStocks = this.user!.watchingStocksByListName[listName];

      Object.keys(watchingStocks).forEach((stockSymbol: string) => {
        let sharesDictionary = watchingStocks[stockSymbol].purchaseGuidToShares
        let amount = 0;
        let totalPrice = 0;
        
        Object.keys(sharesDictionary).forEach((purchaseGuid: string) => {
          let share = sharesDictionary[purchaseGuid];
          amount += share.amount;
          totalPrice += share.amount * share.purchasingPrice;
        });
        
        if(stockSymbol in this.ownedStocks){
          let previousAmount = this.ownedStocks[stockSymbol].amount
          amount += previousAmount;
          totalPrice += this.ownedStocks[stockSymbol].purchasingPrice * previousAmount;
        }
  
        if(amount > 0)
          this.ownedStocks[stockSymbol] = {
            amount: amount,
            purchasingPrice: totalPrice / amount,
          };
      })
    });
  }
}