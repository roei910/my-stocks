import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Share } from 'src/models/share';
import { User } from 'src/models/user';
import { DatabaseService } from 'src/Services/database.service';
import { UserService } from 'src/Services/user.service';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-stock-shares',
  templateUrl: './stock-shares.component.html',
  styleUrls: ['./stock-shares.component.css']
})
export class StockSharesComponent implements OnInit{
  symbol!: string;
  listName!: string;
  shares: Share[] | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private database: DatabaseService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ){

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.symbol = params['stockSymbol'];
      this.listName = params['listName'];
    });

    let userEmail = this.authenticationService.GetUserEmail();
    let user = this.database.Users.find((user: User) => user.email == userEmail);

    this.shares = user?.lists[this.listName][this.symbol].shares;
  }

  AddShare(){
    var amount = parseInt(prompt("number of shares") ?? "0");
    var avgPrice = parseFloat(prompt("average price for purchase") ?? "0.0");
    var email = this.authenticationService.GetUserEmail();

    if(email == null)
      return;
    
    this.database.AddShare(email, this.listName, this.symbol, amount, avgPrice);
  }
}