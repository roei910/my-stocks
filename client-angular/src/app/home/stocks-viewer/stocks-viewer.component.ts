import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/models/stocks/stock';
import { StockListDetails } from 'src/models/stocks/stock-list-details';
import { WatchingStock } from 'src/models/stocks/watching-stock';
import { User } from 'src/models/users/user';
import { AuthenticationService } from 'src/services/authentication.service';
import { SharesService } from 'src/services/shares.service';
import { StockService } from 'src/services/stock.service';
import { UserService } from 'src/services/user.service';

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
    private authenticationService: AuthenticationService,
    private shareService: SharesService
  ){}

  ngOnInit(): void {
    this.UserEmail = this.authenticationService.GetUserEmail();

    if(this.UserEmail === null)
      return;

    this.userService.GetUserByEmail(this.UserEmail!)
      .subscribe(user => this.User = user);

    this.stockService.GetAllStocks().subscribe(stocks => 
      stocks.map(stock => this.Stocks[stock.symbol] = stock));
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
    
    this.shareService.addUserList(stockListDetails)
      .subscribe(res => {
        if(res)
          this.User.watchingStocksByListName[listName!] = {}
        else
          alert("something went wrong, couldnt add list")
      });
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
    
    this.shareService.removeUserList(stockListDetails).subscribe(res => {
      if(res)
        delete(this.User.watchingStocksByListName[listName!]);
      else
        alert("something went wrong, couldnt remove list")
    });
  }

  AddListStock(listName: string) {
    var stockSymbol = prompt("please enter a stock symbol")?.toUpperCase();

    if(stockSymbol == null)
      return;
    
    this.shareService.AddWatchingStock(this.UserEmail!, listName, stockSymbol)
      .subscribe(res => {
        if(res)
        {
          var watchingStock: WatchingStock = {
            purchaseGuidToShares: {},
            note: ""
          };

          this.User.watchingStocksByListName[listName][stockSymbol!] = watchingStock;
        }
        else
          alert("something went wrong, couldnt add stock to list...")
      });
  }
}