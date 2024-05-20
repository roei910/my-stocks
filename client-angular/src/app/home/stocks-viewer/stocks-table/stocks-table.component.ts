import { Component, Input, ViewChild } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { DatabaseService } from 'src/Services/database.service';
import { UserService } from 'src/Services/user.service';

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

  @Input('typeOfStocks')
  stocksType?: string;

  email: any;

  constructor(private database: DatabaseService, private userService: UserService){
    this.email = this.userService.GetUser();
  }

  async CreateStockNote(symbol: string){
    let note = prompt("please enter a note");

    if(!note)
      return;
    
    await this.database.AddStockNote(this.stocksType, this.email, symbol, note);
  }

  async DeleteNote(symbol: string){
    let confirmDelete = confirm("You are deleting this note, are you sure?");

    if(confirmDelete)
      await this.database.RemoveStockNote(this.stocksType, this.email, symbol);
  }

  GetKeys(dictionary: any){
    return Object.keys(dictionary);
  }

  CountShares(sharesList: any){
    var sum = 0;

    sharesList.forEach((share: any) => sum += share.amount);

    return sum
  }
}
