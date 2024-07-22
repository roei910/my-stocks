import { Component } from '@angular/core';
import { Share } from 'src/models/share';
import { Stock } from 'src/models/stock';
import { User } from 'src/models/user';
import { DatabaseService } from 'src/services/database.service';
import { UserService } from 'src/Services/user.service';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent{
  data: any;
  user?: User;
  ownedStocks: {[stocksymbol: string] : Share} = {};
  stocksDictionary!: {[stockSymbol: string]: Stock};

  constructor(private userService: UserService, private database: DatabaseService,
    private authenticationService: AuthenticationService
  ) {
    let userEmail = this.authenticationService.GetUserEmail();
    this.stocksDictionary = this.database.stocksDictionary;

    this.user = this.database.Users.find((user: User) => user.email == userEmail);

    if(this.user == undefined)
      return;

    // this.InitializeOwnedStocks();
    // console.log(this.ownedStocks);
    this.InitializeChartData();
  }

  InitializeChartData(){
    const ownedStockSymbols = Object.keys(this.ownedStocks);
    const tempData = ownedStockSymbols.map((symbol: string) => {
      return this.stocksDictionary[symbol].price * this.ownedStocks[symbol].amount;
    })
    // const tempData = [30, 25, 20, 15, 10];

    this.data = {
      // labels: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB'],
      labels: ownedStockSymbols,
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

  CountOwnedStocks(){
    return Object.keys(this.ownedStocks).length;
  }

  // GetTotalGain(){
  //   let ownedStockSymbols = Object.keys(this.ownedStocks);
  //   let totalGain = 0;

  //   ownedStockSymbols.forEach((symbol: string) => {
  //     let stockValue = this.stocksDictionary[symbol].price * this.ownedStocks[symbol].amount;
  //     let purchaseValue = this.ownedStocks[symbol].averagePrice * this.ownedStocks[symbol].amount;
  //     totalGain += stockValue - purchaseValue;
  //   });

  //   return totalGain;
  // }

  // InitializeOwnedStocks() {
  //   Object.keys(this.user!.watchingSymbols).forEach((listKey: string) => {
  //     let stockSymbols = Object.keys(this.user!.watchingSymbols[listKey]);
  
  //     stockSymbols.forEach((stockKey: string) => {
  //       let shares = this.user!.watchingSymbols[listKey][stockKey].shares;
  //       let amount = 0;
  //       let totalPrice = 0;
  
  //       shares.forEach((share: Share) => {
  //         amount += share.amount;
  //         totalPrice += share.amount * share.averagePrice;
  //       });
  
  //       if(stockKey in this.ownedStocks){
  //         let previousAmount = this.ownedStocks[stockKey].amount
  //         amount += previousAmount;
  //         totalPrice += this.ownedStocks[stockKey].averagePrice * previousAmount;
  //       }
  
  //       if(amount > 0)
  //         this.ownedStocks[stockKey] = {
  //           amount: amount,
  //           price: totalPrice / amount
  //         };
  //     })
  //   });
  // }
}