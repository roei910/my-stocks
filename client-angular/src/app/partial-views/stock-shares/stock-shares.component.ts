import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Share } from 'src/models/shares/share';
import { SharePurchase } from 'src/models/shares/share-purchase';
import { ShareSale } from 'src/models/shares/share-sale';
import { WatchingStock } from 'src/models/stocks/watching-stock';
import { AuthenticationService } from 'src/services/authentication.service';
import { SharesService } from 'src/services/shares.service';
import { ToastService } from 'src/services/toast.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-stock-shares',
  templateUrl: './stock-shares.component.html',
  styleUrls: ['./stock-shares.component.css']
})
export class StockSharesComponent {
  userEmail!: string | null;
  symbol!: string;
  listName!: string;
  watchingStock : WatchingStock | undefined;
  visibleAddShareDialog : boolean = false;
  purchaseDate: Date | undefined;
  numberOfShares: number | undefined;
  stockPrice: number | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private shareService: SharesService,
    private toastService: ToastService
  ){ }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.symbol = params['stockSymbol'];
      this.listName = params['listName'];
    });

    this.userEmail = this.authenticationService.GetUserEmail()!;

    this.userService.GetUser().subscribe(user =>{
      this.watchingStock = user.watchingStocksByListName[this.listName][this.symbol];
    });
  }

  addShare() {
    if(this.purchaseDate == undefined)
      this.purchaseDate = new Date();

    if(this.numberOfShares == undefined || this.stockPrice == undefined){
      return;
    }

    let sharePurchase: SharePurchase = {
      stockSymbol: this.symbol,
      amount: this.numberOfShares,
      purchasingPrice: this.stockPrice,
      userEmail: this.userEmail!,
      listName: this.listName!,
      purchaseDate: this.purchaseDate
    };

    console.log(sharePurchase);
    
    this.shareService.AddUserShare(sharePurchase)
      .subscribe(res => {
        if(res)
          this.watchingStock!.purchaseGuidToShares[res.Id!] = res
        else
          this.toastService.addErrorMessage("couldnt add share, something went wrong");
      });
  }

  RemoveShare(purchaseId: string, stockSymbol: string){
    if(this.userEmail == null)
      return;

    let shouldContinue = confirm("You are deleting a share, are you sure?");

    if(!shouldContinue)
      return;

    let shareSale: ShareSale = {
      listName: this.listName,
      sharePurchaseGuid: purchaseId,
      stockSymbol: stockSymbol,
      userEmail: this.userEmail
    };

    this.shareService.RemoveUserShare(shareSale)
    .subscribe(res => {
      if(res)
        delete(this.watchingStock?.purchaseGuidToShares[purchaseId]);
      else
        this.toastService.addErrorMessage("couldnt remove share, something went wrong");
    });
  }

  GetKeys(purchaseGuidToShares: { [purchaseGuid: string ] : Share}){
    return Object.keys(purchaseGuidToShares);
  }
}