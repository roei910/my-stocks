import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Share } from 'src/models/shares/share';
import { SharePurchase } from 'src/models/shares/share-purchase';
import { ShareSale } from 'src/models/shares/share-sale';
import { WatchingStock } from 'src/models/stocks/watching-stock';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-stock-shares',
  templateUrl: './stock-shares.component.html',
  styleUrls: ['./stock-shares.component.css']
})
export class StockSharesComponent implements OnInit{
  userEmail!: string | null;
  symbol!: string;
  listName!: string;
  watchingStock : WatchingStock | undefined;
  shares!: Share[];

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ){ }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.symbol = params['stockSymbol'];
      this.listName = params['listName'];
    });

    this.userEmail = this.authenticationService.GetUserEmail();

    if(this.userEmail == null)
      return;

    this.userService.GetUserByEmail(this.userEmail).subscribe(user =>{
      this.watchingStock = user.watchingStocksByListName[this.listName][this.symbol];

      this.shares = Object.keys(this.watchingStock!.purchaseGuidToShares)
        .map(purchaseId => this.watchingStock!.purchaseGuidToShares[purchaseId])
    });
  }

  AddShare(symbol: string, listName: string){
    var amount = parseInt(prompt("number of shares") ?? "0");
    var avgPrice = parseFloat(prompt("average price for purchase") ?? "0.0");
    var date = new Date(prompt("enter date", "")?.split(".").join("/") ?? "");
    
    if(this.userEmail == null)
      return;
    
    var sharePurchase: SharePurchase = {
      stockSymbol: symbol,
      amount,
      purchasingPrice: avgPrice,
      userEmail: this.userEmail,
      listName,
      purchaseDate: date
    };

    this.userService.AddUserShare(sharePurchase)
      .subscribe(res => {
        if(res)
          window.location.reload();
        else
          alert("couldnt add share, something went wrong");
      });
  }

  RemoveShare(purchaseId: string, stockSymbol: string){
    if(this.userEmail == null)
      return;

    var shouldContinue = confirm("You are deleting a share, are you sure?");

    if(!shouldContinue)
      return;

    var shareSale: ShareSale = {
      listName: this.listName,
      sharePurchaseGuid: purchaseId,
      stockSymbol: stockSymbol,
      userEmail: this.userEmail
    };

    this.userService.RemoveUserShare(shareSale)
    .subscribe(res => {
      if(res)
        window.location.reload();
      else
        alert("couldnt remove share, something went wrong");
    });
  }

  GetKeys(purchaseGuidToShares: { [purchaseGuid: string ] : Share}){
    return Object.keys(purchaseGuidToShares);
  }
}