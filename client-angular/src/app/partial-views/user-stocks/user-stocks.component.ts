import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NotFoundError } from 'rxjs';
import { MessageFactory } from 'src/factories/message-factory';
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
  stocks: { [stockSymbol: string]: Stock } = {};
  listNames: string[] = [];
  selectedPortfolio: {
    [stockSymbol: string]: WatchingStock
  } | undefined;
  selectedPortfolioName: string | undefined;
  visible: boolean = true;

  constructor(private stockService: StockService,
    private userService: UserService,
    private shareService: SharesService,
    private messageService: MessageService,
    private messageFactory: MessageFactory
  ) { }

  ngOnInit(): void {
    this.userService.GetUser().subscribe(user => {
      this.user = user;
      this.listNames = Object.keys(user.watchingStocksByListName);
    });
    this.stockService.GetAllStocks().subscribe(stocks =>
      stocks.map(stock => this.stocks[stock.symbol] = stock));
  }

  GetKeys(dictionary: any): string[] {
    if (dictionary == null)
      return [];

    let keys = Object.keys(dictionary);

    return keys;
  }

  AddUserList() {
    let listName = prompt("please enter a list name, only 1 word");

    if (listName == null)
      return;

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
          alert("something went wrong, couldnt add list")
      });
  }

  RemoveUserList() {
    let listName = prompt("please enter a list name, only 1 word");

    if (listName == null)
      return;

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
        alert("something went wrong, couldnt remove list")
    });
  }

  AddListStock(listName: string) {
    //TODO: move to the portfolio
    let stockSymbol = prompt("please enter a stock symbol")?.toUpperCase();

    if (stockSymbol == null)
      return;

    let foundStock = Object.keys(this.user.watchingStocksByListName[listName])
      .find(currectStockSymbol => currectStockSymbol == stockSymbol)

    if (foundStock) {
      let message = this.messageFactory.createErrorMessage("stock is already at the current portfolio.")
      this.messageService.add(message);

      return;
    }

    this.shareService.AddWatchingStock(this.user.email!, listName, stockSymbol)
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
          alert("something went wrong, couldnt add stock to list...")
      });
  }

  RemoveListStock(listName: string) {
    //TODO: move to the portfolio
    let stockSymbol = prompt("please enter a stock symbol")?.toUpperCase();

    if (stockSymbol == null)
      return;

    let foundStock = Object.keys(this.user.watchingStocksByListName[listName])
      .find(currectStockSymbol => currectStockSymbol == stockSymbol)

    if (foundStock == undefined) {
      let message = this.messageFactory.createErrorMessage("stock was not found at the current portfolio.")
      this.messageService.add(message);

      return;
    }

    this.shareService.RemoveWatchingStock(this.user.email!, listName, stockSymbol)
      .subscribe(res => {
        if (res) {
          delete this.user.watchingStocksByListName[listName][stockSymbol!];
          this.updatePortfolio();
        }
        else
          alert("something went wrong, couldnt remove stock from list...")
      });
  }

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