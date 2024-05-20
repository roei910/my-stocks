import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Share } from 'src/Models/share';
import { User } from 'src/Models/user';
import { DatabaseService } from 'src/Services/database.service';
import { UserService } from 'src/Services/user.service';

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
    private userService: UserService){

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.symbol = params['stockSymbol'];
      this.listName = params['listName'];
    });

    let userEmail = this.userService.GetUserEmail();
    let user = this.database.Users.find((user: User) => user.email == userEmail);

    this.shares = user?.lists[this.listName][this.symbol].shares;
  }

  AddShare(){
    var amount = parseInt(prompt("number of shares") ?? "0");
    var avgPrice = parseFloat(prompt("average price for purchase") ?? "0.0");
    var email = this.userService.GetUserEmail();

    if(email == null)
      return;
    
    this.database.AddShare(email, this.listName, this.symbol, amount, avgPrice);
  }
}
