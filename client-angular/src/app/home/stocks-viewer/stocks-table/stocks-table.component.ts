import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from 'src/models/stock';
import { WatchingStock } from 'src/models/watching-stock';
import { AuthenticationService } from 'src/services/authentication.service';
import { StockServiceService as StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.css']
})
export class StocksTableComponent implements OnInit{
  @Input('stockSymbols')
  stockSymbols!: { [stockSymbol: string] : WatchingStock } ;

  @Input('stocksDictionary')
  stocksDictionary: any;

  @Input('listName')
  listName?: string;

  stocks!: {
      [stockSymbol: string] : Stock;
  };
  email: any;

  constructor(private stockService: StockService,
    private authenticationService: AuthenticationService,
    private router: Router
  ){
    this.email = this.authenticationService.GetUserEmail();
  }

  async ngOnInit(): Promise<any> {
    var allStocks = await this.stockService.GetAllStocksAsync()
    this.stocks = {};

    var filter = allStocks.filter(stock => Object.keys(this.stockSymbols).includes(stock.symbol));
    
    filter.forEach(stock => {
        this.stocks[stock.symbol] = stock;
      });
  }

  async CreateStockNote(symbol: string){
    let note = prompt("please enter a note");

    if(!note)
      return;
    
    // await this.database.AddStockNote(this.listName, this.email, symbol, note);
  }

  async DeleteNote(symbol: string){
    let confirmDelete = confirm("You are deleting this note, are you sure?");

    // if(confirmDelete)
    //   await this.database.RemoveStockNote(this.listName, this.email, symbol);
  }

  GetKeys(dictionary: any){
    var keys = Object.keys(dictionary);
    
    return keys;
  }

  CountShares(sharesList: any){
    var sum = 0;

    sharesList.forEach((share: any) => sum += share.amount);

    return sum
  }

  RedirectToSharesScreen(stockSymbol: string) {
    var confirmRedirect = confirm("redirecting to shares screen, continue?");

    if(confirmRedirect)
      this.router.navigate([this.router.url, 'shares'], 
        { queryParams: { stockSymbol: stockSymbol, listName: this.listName }});
  }
}