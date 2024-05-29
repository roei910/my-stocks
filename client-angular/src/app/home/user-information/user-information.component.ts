import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Share } from 'src/Models/share';
import { Stock } from 'src/Models/stock';
import { User } from 'src/Models/user';
import { DatabaseService } from 'src/Services/database.service';
import { UserService } from 'src/Services/user.service';

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

  constructor(private userService: UserService, private database: DatabaseService) {
    let userEmail = this.userService.GetUserEmail();
    this.stocksDictionary = this.database.stocksDictionary;

    this.user = this.database.Users.find((user: User) => user.email == userEmail);

    if(this.user == undefined)
      return;

    this.InitializeOwnedStocks();
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

  GetTotalGain(){
    let ownedStockSymbols = Object.keys(this.ownedStocks);
    let totalGain = 0;

    ownedStockSymbols.forEach((symbol: string) => {
      let stockValue = this.stocksDictionary[symbol].price * this.ownedStocks[symbol].amount;
      let purchaseValue = this.ownedStocks[symbol].averagePrice * this.ownedStocks[symbol].amount;
      totalGain += stockValue - purchaseValue;
    });

    return totalGain;
  }

  InitializeOwnedStocks() {
    Object.keys(this.user!.lists).forEach((listKey: string) => {
      let stockSymbols = Object.keys(this.user!.lists[listKey]);
  
      stockSymbols.forEach((stockKey: string) => {
        let shares = this.user!.lists[listKey][stockKey].shares;
        let amount = 0;
        let totalPrice = 0;
  
        shares.forEach((share: Share) => {
          amount += share.amount;
          totalPrice += share.amount * share.averagePrice;
        });
  
        if(stockKey in this.ownedStocks){
          let previousAmount = this.ownedStocks[stockKey].amount
          amount += previousAmount;
          totalPrice += this.ownedStocks[stockKey].averagePrice * previousAmount;
        }
  
        if(amount > 0)
          this.ownedStocks[stockKey] = {
            amount: amount,
            averagePrice: totalPrice / amount
          };
      })
    });
  }
}