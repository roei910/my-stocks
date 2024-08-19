import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/Services/user.service';
import { Share } from 'src/models/share';
import { SharePurchase } from 'src/models/share-purchase';
import { WatchingStock } from 'src/models/watching-stock';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-stock-shares',
  templateUrl: './stock-shares.component.html',
  styleUrls: ['./stock-shares.component.css']
})
export class StockSharesComponent implements OnInit{
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

    let userEmail = this.authenticationService.GetUserEmail();

    if(userEmail == null)
      return;

    this.userService.GetUserByEmailAsync(userEmail).subscribe(user =>{
      this.watchingStock = user.watchingStocksByListName[this.listName][this.symbol];

      this.shares = Object.keys(this.watchingStock.purchaseGuidToShares)
        .map(purchaseId => this.watchingStock!.purchaseGuidToShares[purchaseId])
    });
  }

  AddShare(symbol: string, listName: string){
    var amount = parseInt(prompt("number of shares") ?? "0");
    var avgPrice = parseFloat(prompt("average price for purchase") ?? "0.0");
    var date = new Date(prompt("enter date", "")?.split(".").join("/") ?? "");
    
    var email = this.authenticationService.GetUserEmail();

    if(email == null)
      return;
    
    var sharePurchase: SharePurchase = {
      stockSymbol: symbol,
      amount,
      purchasingPrice: avgPrice,
      userEmail: email,
      listName,
      purchaseDate: date
    };

    this.userService.AddUserShare(sharePurchase)
      .subscribe(res => window.location.reload());
  }
}