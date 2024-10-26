import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StockDetails } from 'src/interfaces/stock-details';
import { Stock } from 'src/models/stocks/stock';
import { WatchingStock } from 'src/models/stocks/watching-stock';
import { AuthenticationService } from 'src/services/authentication.service';
import { SharesService } from 'src/services/shares.service';
import { ToastService } from 'src/services/toast.service';

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

  note: string = '';
  symbol: string = '';
  email: string;
  watchingStockLists!: StockDetails[];
  visibleDialog: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private shareService: SharesService,
    private toastService: ToastService
  ) {
    this.email = this.authenticationService.GetUserEmail()!;
  }

  ngOnChanges(): void {
    this.updateWatchingStocks();
  }

  openStockNoteDialog(currentSymbol: string, currentNote: string) {
    this.note = currentNote;
    this.symbol = currentSymbol;
    this.visibleDialog = true;
  }

  async updateStockNote(){
    this.visibleDialog = false;
    
    this.shareService.UpdateWatchingStockNote(this.email, this.listName!, this.symbol, this.note)
      .subscribe(res => {
        if (res) {
          this.watchingStocks[this.symbol].note = this.note!;
          this.updateWatchingStocks();
        }
        else
          this.toastService.addErrorMessage("error while updating note");
      });
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
          this.toastService.addErrorMessage("something went wrong, couldnt remove stock from list")
      });
  }
}