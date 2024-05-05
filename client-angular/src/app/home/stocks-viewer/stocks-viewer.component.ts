import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/Services/database.service';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-stocks-viewer',
  templateUrl: './stocks-viewer.component.html',
  styleUrls: ['./stocks-viewer.component.css']
})
export class StocksViewerComponent implements OnInit{
  Stocks!: any;
  UserEmail!: any;

  constructor(private db: DatabaseService, private userService: UserService){}

  ngOnInit(): void {
    this.UserEmail = this.userService.GetUser();
    this.Stocks = this.db.GetStocks(this.UserEmail);
  }
}
