import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/Services/database.service';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-stocks-viewer',
  templateUrl: './stocks-viewer.component.html',
  styleUrls: ['./stocks-viewer.component.css']
})
export class StocksViewerComponent implements OnInit{
  IsConnected : boolean = true;
  Stocks!: any;
  User!: any;

  constructor(private db: DatabaseService, private userService: UserService){}

  ngOnInit(): void {
    this.User = this.userService.GetUser();
    this.Stocks = this.db.GetStocks(this.User.email);
    // console.log(this.Stocks);
  }
}
