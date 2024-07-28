import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/Services/user.service';
import { User } from 'src/models/user';
import { AuthenticationService } from 'src/services/authentication.service';
import { StockServiceService as StockService } from 'src/services/stock.service';

@Component({
  selector: 'app-stocks-viewer',
  templateUrl: './stocks-viewer.component.html',
  styleUrls: ['./stocks-viewer.component.css']
})
export class StocksViewerComponent implements OnInit{
  User!: User;
  UserEmail?: string | null;
  Stocks!: any;

  constructor(private stockService: StockService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ){}

  async ngOnInit(): Promise<any> {
    this.UserEmail = this.authenticationService.GetUserEmail();

    if(this.UserEmail === null)
      return;

    this.User = await this.userService.GetUserByEmailAsync(this.UserEmail);
  }

  GetKeys(dictionary: any){
    var keys = Object.keys(dictionary);
    
    return keys;
  }
}