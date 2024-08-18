import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/Services/user.service';
import { Stock } from 'src/models/stock';
import { StockListDetails } from 'src/models/stock-list-details';
import { User } from 'src/models/user';
import { AuthenticationService } from 'src/services/authentication.service';
import { StockService as StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-stocks-viewer',
  templateUrl: './stocks-viewer.component.html',
  styleUrls: ['./stocks-viewer.component.css']
})
export class StocksViewerComponent implements OnInit{
  User!: User;
  UserEmail?: string | null;
  Stocks: { [stockSymbol: string] : Stock } = {};

  constructor(private stockService: StockService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ){}

  async ngOnInit(): Promise<any> {
    this.UserEmail = this.authenticationService.GetUserEmail();

    if(this.UserEmail === null)
      return;

    this.userService.GetUserByEmailAsync(this.UserEmail).subscribe(user => this.User = user);
    var stocksList = await this.stockService.GetAllStocksAsync();
    
    stocksList.map(stock => this.Stocks[stock.symbol] = stock);
  }

  GetKeys(dictionary: any): string[]{
    if(dictionary == null)
      return [];

    var keys = Object.keys(dictionary);
    
    return keys;
  }

  AddUserList(){
    var listName = prompt("please enter a list name, only 1 word");

    if(listName == null)
      return;

    let stockListDetails: StockListDetails = 
    {
      userEmail: this.UserEmail!,
      listName
    }
    
    this.userService.addUserList(stockListDetails).subscribe(res => window.location.reload());
  }

  RemoveUserList(){
    var listName = prompt("please enter a list name, only 1 word");

    if(listName == null)
      return;

    let stockListDetails: StockListDetails = 
    {
      userEmail: this.UserEmail!,
      listName
    }
    
    this.userService.removeUserList(stockListDetails).subscribe(res => window.location.reload());
  }
}