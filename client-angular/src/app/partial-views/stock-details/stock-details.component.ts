import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stock } from 'src/models/stocks/stock';
import { StockNotification } from 'src/models/users/stock-notification';
import { AuthenticationService } from 'src/services/authentication.service';
import { SharesService } from 'src/services/shares.service';
import { StockService } from 'src/services/stock.service';
import { ToastService } from 'src/services/toast.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent {
  symbol?: string | undefined;
  stock?: Stock;
  data?: any;
  visibleAddNotificationDialog: boolean = false;
  visibleAddStockToListDialog: boolean = false;
  listName: string = '';
  targetPrice: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private stockService: StockService,
    private shareService: SharesService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private toastService: ToastService
  ) {
    const tempData = [30, 25, 20, 15, 10];

    this.data = {
      labels: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB'],
      datasets: [
        {
          label: 'Stock Price History',
          data: tempData,
          fill: true,
          borderColor: '#FFFFFF'
        }
      ]
    };
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.symbol = params['stockSymbol'];
    });

    if (!this.symbol)
      return;

    this.stockService.GetStockBySymbol(this.symbol)
      .subscribe(stock => this.stock = stock);
  }

  addStockToList(listName: string) {
    this.visibleAddStockToListDialog = false;
    let email = this.authenticationService.GetUserEmail();

    if (email == null) {
      alert("Please login to your account first");
      return;
    }

    this.shareService.AddWatchingStock(email, listName, this.symbol!)
      .subscribe(res => {
        if (!res)
          alert("something went wrong");
      });
  }

  addNotification() {
    this.visibleAddNotificationDialog = false;
    let email = this.authenticationService.GetUserEmail()!;

    let stockNotification: StockNotification = {
      userEmail: email,
      stockSymbol: this.symbol!,
      targetPrice: this.targetPrice,
      isBiggerThanOrEqual: true
    }

    this.userService.AddStockNotification(stockNotification)
      .subscribe(() => {
        this.toastService.addSuccessMessage("Notification added successfully");
      });
  }
}