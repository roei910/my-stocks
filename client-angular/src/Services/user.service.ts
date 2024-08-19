import { Injectable } from '@angular/core';
import axios from 'axios';
import { Share } from 'src/models/share';
import { environment } from 'src/environments/environment';
import { sha256 } from 'js-sha256';
import { UserCreation } from 'src/models/user-creation';
import { User } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockListDetails } from 'src/models/stock-list-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  GetUserByEmailAsync(email: string): Observable<User>{
    var res = this.http.get<User>(`${environment.server_url}/User`,
      {
        params: {
          email
        }
      }
    );

    return res;
  }

  CreateUser(user: UserCreation): Observable<boolean> {
    user.password = sha256(user.password);
    
    var res = this.http.post<boolean>(`${environment.server_url}/User/register`, user)

    return res;
  }

  async AddUserShare(email: string, sharePurchase: Share): Promise<boolean> {
    var res = await axios
      .patch(`${environment.server_url}/User/add-share`, {
        params:{
          email
        },
        body: sharePurchase
      })
      .then(res => res.status == 200);

    return res;
  }

  async RemoveUserShare(email: string, purchaseId: string){
    var res = await axios
      .patch(`${environment.server_url}/User/remove-share`, {
        params: {
          email: email
        },
        body: purchaseId
      })
      .then(res => res.status == 200);

      return res;
  }

  AddWatchingStock(email: string, listName: string, stockSymbol: string): 
    Observable<any>{
    var res = this.http.post(`${environment.server_url}/User/watching-stock`, 
      {
        email,
        listName,
        stockSymbol
      }
    );

    return res
  }

  RemoveWatchingStock(email: string, listName: string, stockSymbol: string):
    Observable<any>{
    var res = this.http
      .delete(`${environment.server_url}/User/watching-stock`,
        {
          body:{
            email,
            listName,
            stockSymbol
          }
        }
      );

    return res;
  }

  async UpdateWatchingStockNote(email: string, listName: string, stockSymbol: string, note: string): Promise<number>{
    var res = await axios
      .patch(`${environment.server_url}/User/watching-stock-note`,
        {
          email,
          listName,
          stockSymbol,
          note
        }
      )
      .then(res => res.status)
      .catch(err => {
        console.log(err);

        return 500;
      });

    return res
  }

  addUserList(stockListDetails: StockListDetails):Observable<any> {
    var res = this.http.post<User>(`${environment.server_url}/User/List`,
      stockListDetails
    );

    return res;
  }

  removeUserList(stockListDetails: StockListDetails):Observable<any> {
    var res = this.http.delete<User>(`${environment.server_url}/User/List`,
      {
        body: stockListDetails
      }
    );

    return res;
  }
}