import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/Services/user.service';
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
  watchingSymbols: { [stockSymbol: string] : WatchingStock } | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ){ }

  async ngOnInit(): Promise<any> {
    this.activatedRoute.queryParams.subscribe(params => {
      this.symbol = params['stockSymbol'];
      this.listName = params['listName'];
    });

    let userEmail = this.authenticationService.GetUserEmail();

    if(userEmail == null)
      return;

    let user = await this.userService.GetUserByEmailAsync(userEmail);

    this.watchingSymbols = user.watchingStocksByListName[this.listName];
  }

  AddShare(){
    var amount = parseInt(prompt("number of shares") ?? "0");
    var avgPrice = parseFloat(prompt("average price for purchase") ?? "0.0");
    var email = this.authenticationService.GetUserEmail();

    if(email == null)
      return;
    
    // this.database.AddShare(email, this.listName, this.symbol, amount, avgPrice);
  }
}