import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/Services/database.service';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-stocks-viewer',
  templateUrl: './stocks-viewer.component.html',
  styleUrls: ['./stocks-viewer.component.css']
})
export class StocksViewerComponent implements OnInit{
  User!: any;
  UserEmail!: any;
  StocksDictionary!: any;

  constructor(private db: DatabaseService, private userService: UserService){}

  ngOnInit(): void {
    this.UserEmail = this.userService.GetUserEmail();
    this.User = this.db.GetUser(this.UserEmail);
    this.StocksDictionary = this.db.stocksDictionary;
  }

  GetKeys(dictionary: any){
    return Object.keys(dictionary);
  }
}
