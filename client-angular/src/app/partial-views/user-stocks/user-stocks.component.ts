import { Component } from '@angular/core';
import { Stock } from 'src/models/stocks/stock';
import { StockListDetails } from 'src/models/stocks/stock-list-details';
import { WatchingStock } from 'src/models/stocks/watching-stock';
import { User } from 'src/models/users/user';
import { SharesService } from 'src/services/shares.service';
import { StockService } from 'src/services/stock.service';
import { ToastService } from 'src/services/toast.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-stocks',
  templateUrl: './user-stocks.component.html',
  styleUrls: ['./user-stocks.component.css']
})
export class UserStocksComponent {
  user!: User;
  stocks: { [stockSymbol: string]: Stock } = {};
  listNames: string[] = [];
  selectedPortfolio: {
    [stockSymbol: string]: WatchingStock
  } | undefined;
  selectedPortfolioName: string | undefined;
  visible: boolean = true;
  visibleAddStockToListDialog: boolean = false;
  visibleAddUserListDialog: boolean = false;
  stockSymbolToAdd: string = '';
  listNameToAdd: string = '';

  constructor(private stockService: StockService,
    private userService: UserService,
    private shareService: SharesService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.listNames = Object.keys(user.watchingStocksByListName);
    });
    this.stockService.getAllStocks().subscribe(stocks =>
      stocks.map(stock => this.stocks[stock.symbol] = stock));
  }

  addUserList(listName: string): void {
    this.visibleAddUserListDialog = false;
    
    let stockListDetails: StockListDetails =
    {
      userEmail: this.user.email!,
      listName
    }

    this.shareService.addUserList(stockListDetails)
      .subscribe(res => {
        if (res) {
          this.user.watchingStocksByListName[listName!] = {}
          this.updateListBox();
        } else
          this.toastService.addErrorMessage("something went wrong, couldnt add list");
      });
  }

  removeUserList(listName: string) {
    let stockListDetails: StockListDetails =
    {
      userEmail: this.user.email!,
      listName
    }

    this.shareService.removeUserList(stockListDetails).subscribe(res => {
      if (res) {
        delete (this.user.watchingStocksByListName[listName!]);
        this.updateListBox();

        if(listName == this.selectedPortfolioName)
          this.selectedPortfolioName = undefined;
      }
      else
        this.toastService.addErrorMessage("something went wrong, couldnt remove list");
    });
  }

  addStockToList(stockSymbol: string){
    stockSymbol = stockSymbol.toUpperCase();

    this.visibleAddStockToListDialog = false;

    let listName = this.selectedPortfolioName!;
    let foundStock = Object.keys(this.user.watchingStocksByListName[listName])
      .find(currectStockSymbol => currectStockSymbol == stockSymbol)

    if (foundStock) {
      this.toastService.addErrorMessage("stock is already at the current portfolio.");

      return;
    }

    this.shareService.addWatchingStock(this.user.email!, listName, stockSymbol)
      .subscribe(res => {
        if (res) {
          let watchingStock: WatchingStock = {
            purchaseGuidToShares: {},
            note: ""
          };

          this.user.watchingStocksByListName[listName][stockSymbol!] = watchingStock;
          this.updatePortfolio();
        }
        else
          this.toastService.addErrorMessage("something went wrong, couldnt add stock to list...");
      });
  };

  onSelectedPortfolio(event: any) {
    const { option, value } = event;

    if (option != undefined)
      this.selectedPortfolio = this.user.watchingStocksByListName[option];
  }

  updateListBox(): void {
    this.listNames = Object.keys(this.user.watchingStocksByListName);
  }

  updatePortfolio(): void {
    this.visible = false;
    setTimeout(() => this.visible = true, 0);
  }
}