import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { DatabaseService } from 'src/Services/database.service';
import { UserService } from 'src/Services/user.service';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-stocks-table',
  templateUrl: './stocks-table.component.html',
  styleUrls: ['./stocks-table.component.css']
})
export class StocksTableComponent {
  @Input('stocksList')
  stocks: any;

  @Input('stocksDictionary')
  stocksDictionary: any;

  @Input('listName')
  listName?: string;

  email: any;

  constructor(private database: DatabaseService, 
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router
  ){
    this.email = this.authenticationService.GetUserEmail();
  }

  async CreateStockNote(symbol: string){
    let note = prompt("please enter a note");

    if(!note)
      return;
    
    await this.database.AddStockNote(this.listName, this.email, symbol, note);
  }

  async DeleteNote(symbol: string){
    let confirmDelete = confirm("You are deleting this note, are you sure?");

    if(confirmDelete)
      await this.database.RemoveStockNote(this.listName, this.email, symbol);
  }

  GetKeys(dictionary: any){
    return Object.keys(dictionary);
  }

  CountShares(sharesList: any){
    var sum = 0;

    sharesList.forEach((share: any) => sum += share.amount);

    return sum
  }

  RedirectToSharesScreen(stockSymbol: string) {
    var confirmRedirect = confirm("redirecting to shares screen, continue?");

    if(confirmRedirect)
      this.router.navigate([this.router.url, 'shares'], 
        { queryParams: { stockSymbol: stockSymbol, listName: this.listName }});
  }
}
