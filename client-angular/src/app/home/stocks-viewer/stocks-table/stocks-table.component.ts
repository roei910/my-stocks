import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Stock } from 'src/models/stock';
import { WatchingStock } from 'src/models/watching-stock';
import { AuthenticationService } from 'src/services/authentication.service';
import { StockService as StockService } from 'src/services/stock.service';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.css']
})
export class StocksTableComponent implements OnInit{
  @Input('watchingStocks')
  watchingStocks!: { [stockSymbol: string] : WatchingStock } ;

  @Input('stocksDictionary')
  stocksDictionary!: { [stockSymbol: string] : Stock };

  @Input('listName')
  listName?: string;

  email: any;

  constructor(private stockService: StockService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ){
    this.email = this.authenticationService.GetUserEmail();
  }

  async ngOnInit(): Promise<any> {
  }

  async CreateStockNote(symbol: string){
    let note = prompt("please enter a note");

    if(!note || !this.listName)
      return;
    
    var res = await this.userService.UpdateWatchingStockNote(this.email, this.listName!, symbol, note);

    if(res != 200)
      alert("error updating the note");
    else
        window.location.reload();
  }

  async DeleteNote(symbol: string){
    let confirmDelete = confirm("You are deleting this note, are you sure?");

    if(confirmDelete){
      var res = await this.userService.UpdateWatchingStockNote(this.email, this.listName!, symbol, "");

      if(res != 200)
        alert("error deleting note the note");
      else
        window.location.reload();
    }
  }

  GetKeys(dictionary: any){
    var keys = Object.keys(dictionary);
    
    return keys;
  }

  CountShares(watchingStock: WatchingStock){
    var sum = 0;
    var keys = Object.keys(watchingStock.purchaseGuidToShares);
    
    keys.forEach((purchaseGuid: string) => 
      sum += watchingStock.purchaseGuidToShares[purchaseGuid].amount);

    return sum
  }

  RedirectToSharesScreen(stockSymbol: string) {
    var confirmRedirect = confirm("redirecting to shares screen, continue?");

    if(confirmRedirect)
      this.router.navigate([this.router.url, 'shares'], 
        { queryParams: { stockSymbol: stockSymbol, listName: this.listName }});
  }
}