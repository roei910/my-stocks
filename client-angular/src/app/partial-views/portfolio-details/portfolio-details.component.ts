import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StockDetails } from 'src/interfaces/stock-details';
import { Stock } from 'src/models/stocks/stock';
import { WatchingStock } from 'src/models/stocks/watching-stock';
import { AuthenticationService } from 'src/services/authentication.service';
import { SharesService } from 'src/services/shares.service';

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.css']
})
export class PortfolioDetailsComponent {
  @Input('watchingStocks')
  watchingStocks!: { [stockSymbol: string]: WatchingStock };

  @Input('stocksDictionary')
  stocksDictionary!: { [stockSymbol: string]: Stock };

  @Input('listName')
  listName?: string;

  email: any;
  watchingStockLists!: StockDetails[];
  visible: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private shareService: SharesService
  ) {
    this.email = this.authenticationService.GetUserEmail();
  }

  ngOnChanges(): void {
    this.updateWatchingStocks();
  }

  async CreateStockNote(symbol: string) {
    let note = prompt("please enter a note");

    if (!note || !this.listName)
      return;

    this.shareService.UpdateWatchingStockNote(this.email, this.listName!, symbol, note)
      .subscribe(res => {
        if (res) {
          this.watchingStocks[symbol].note = note!;
          this.updateWatchingStocks();
        }
        else
          alert("error updating the note");
      });
  }

  async DeleteNote(symbol: string) {
    let confirmDelete = confirm("You are deleting this note, are you sure?");

    if (confirmDelete) {
      this.shareService.UpdateWatchingStockNote(this.email, this.listName!, symbol, "")
        .subscribe(res => {
          if (res) {
            this.watchingStocks[symbol].note = "";
            this.updateWatchingStocks();
          }
          else
            alert("error updating the note");
        });
    }
  }

  GetKeys(dictionary: any) {
    let keys = Object.keys(dictionary);

    return keys;
  }

  CountShares(watchingStock: WatchingStock) {
    let sum = 0;
    let keys = Object.keys(watchingStock.purchaseGuidToShares);

    keys.forEach((purchaseGuid: string) =>
      sum += watchingStock.purchaseGuidToShares[purchaseGuid].amount);

    return sum
  }

  RedirectToSharesScreen(stockSymbol: string) {
    let confirmRedirect = confirm("redirecting to shares screen, continue?");

    if (confirmRedirect)
      this.router.navigate([this.router.url, 'shares'],
        { queryParams: { stockSymbol: stockSymbol, listName: this.listName } });
  }

  mapWatchingStock(stockSymbol: string, watchingStock: WatchingStock): StockDetails {
    let stock = this.stocksDictionary[stockSymbol];

    return {
      symbol: stockSymbol,
      name: stock.name,
      lastUpdate: stock.updatedTime,
      note: watchingStock.note,
      prediction: stock.analysis?.targetMeanPrice ?? 0,
      price: stock.price,
      shares: this.CountShares(watchingStock)
    };
  }

  updateWatchingStocks(): void {
    this.watchingStockLists = Object.keys(this.watchingStocks)
      .map(stockSymbol => this.mapWatchingStock(stockSymbol, this.watchingStocks[stockSymbol]));
  }

  RemoveListStock(stockSymbol: string): void {
    let confirmRedirect = confirm("removing stock from portfolio, are you sure?");
    
    if(!confirmRedirect)
      return;

    this.shareService.RemoveWatchingStock(this.email, this.listName!, stockSymbol)
      .subscribe(res => {
        if (res) {
          delete this.watchingStocks[stockSymbol!];
          this.updateWatchingStocks();
        }
        else
          alert("something went wrong, couldnt remove stock from list...")
      });
  }
}