import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/Services/user.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { StockServiceService as StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-stocks-viewer',
  templateUrl: './stocks-viewer.component.html',
  styleUrls: ['./stocks-viewer.component.css']
})
export class StocksViewerComponent implements OnInit{
  User!: any;
  UserEmail!: any;
  Stocks!: any;

  constructor(private stockService: StockService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ){}

  ngOnInit(): void {
    this.UserEmail = this.authenticationService.GetUserEmail();
    this.User = this.userService.GetUserByEmailAsync(this.UserEmail);
  }

  GetKeys(dictionary: any){
    return Object.keys(dictionary);
  }
}