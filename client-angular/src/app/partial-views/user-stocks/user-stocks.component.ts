import { Component } from '@angular/core';
import { Stock } from 'src/models/stocks/stock';
import { StockListDetails } from 'src/models/stocks/stock-list-details';
import { WatchingStock } from 'src/models/stocks/watching-stock';
import { User } from 'src/models/users/user';
import { SharesService } from 'src/services/shares.service';
import { StockService } from 'src/services/stock.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-stocks',
  templateUrl: './user-stocks.component.html',
  styleUrls: ['./user-stocks.component.css']
})
export class UserStocksComponent {
  user!: User;
  userEmail?: string | null;
  stocks: { [stockSymbol: string] : Stock } = {};

  constructor(private stockService: StockService,
    private userService: UserService,
    private shareService: SharesService
  ){}

  ngOnInit(): void {
    this.userService.GetUser().subscribe(user => this.user = user);
    this.stockService.GetAllStocks().subscribe(stocks => 
      stocks.map(stock => this.stocks[stock.symbol] = stock));
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
      userEmail: this.userEmail!,
      listName
    }
    
    this.shareService.addUserList(stockListDetails)
      .subscribe(res => {
        if(res)
          this.user.watchingStocksByListName[listName!] = {}
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
      userEmail: this.userEmail!,
      listName
    }
    
    this.shareService.removeUserList(stockListDetails).subscribe(res => {
      if(res)
        delete(this.user.watchingStocksByListName[listName!]);
      else
        alert("something went wrong, couldnt remove list")
    });
  }

  AddListStock(listName: string) {
    var stockSymbol = prompt("please enter a stock symbol")?.toUpperCase();

    if(stockSymbol == null)
      return;
    
    this.shareService.AddWatchingStock(this.userEmail!, listName, stockSymbol)
      .subscribe(res => {
        if(res)
        {
          var watchingStock: WatchingStock = {
            purchaseGuidToShares: {},
            note: ""
          };

          this.user.watchingStocksByListName[listName][stockSymbol!] = watchingStock;
        }
        else
          alert("something went wrong, couldnt add stock to list...")
      });
  }
}