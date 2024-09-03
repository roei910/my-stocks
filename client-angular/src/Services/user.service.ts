import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sha256 } from 'js-sha256';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { SharePurchase } from 'src/models/shares/share-purchase';
import { ShareSale } from 'src/models/shares/share-sale';
import { StockListDetails } from 'src/models/stocks/stock-list-details';
import { User } from 'src/models/users/user';
import { UserCreation } from 'src/models/users/user-creation';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  GetUserByEmail(email: string): Observable<User>{
    var res = this.http
    .get<User>(`${environment.server_url}/User`,
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
    
    var res = this.http
    .post(`${environment.server_url}/User/register`, user,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
    .pipe(map(response => response.status == 200));

    return res;
  }

  AddUserShare(sharePurchase: SharePurchase): Observable<boolean> {
    var res = this.http
    .post<boolean>(`${environment.server_url}/User/share`, sharePurchase, {
      observe: 'response'
    })
    .pipe(map(res => res.status == 200));

    return res;
  }

  RemoveUserShare(shareSale: ShareSale): Observable<boolean>{
    return this.http
    .delete<boolean>(`${environment.server_url}/User/share`, {
      body: shareSale,
      observe: 'response'
    })
    .pipe(map(res => res.status == 200));
  }

  AddWatchingStock(email: string, listName: string, stockSymbol: string): 
    Observable<boolean>{
    var res = this.http
    .post<boolean>(`${environment.server_url}/User/watching-stock`, 
      {
        email,
        listName,
        stockSymbol
      },
      {
        observe: 'response'
      }
    )
    .pipe(map(res => res.status == 200));

    return res
  }

  RemoveWatchingStock(email: string, listName: string, stockSymbol: string):
    Observable<boolean>{
    var res = this.http
    .delete<boolean>(`${environment.server_url}/User/watching-stock`,
      {
        body:{
          email,
          listName,
          stockSymbol
        },
        observe: 'response'
      }
    )
    .pipe(map(res => res.status == 200));

    return res;
  }

  UpdateWatchingStockNote(email: string, listName: string, stockSymbol: string, note: string): 
    Observable<boolean>{
    var res = this.http
    .patch<boolean>(`${environment.server_url}/User/watching-stock-note`,
      {
        email,
        listName,
        stockSymbol,
        note
      },
      {
        observe: 'response'
      }
    )
    .pipe(map(res => res.status == 200));

    return res
  }

  addUserList(stockListDetails: StockListDetails):Observable<any> {
    var res = this.http
    .post<User>(`${environment.server_url}/User/List`,
      stockListDetails
    );

    return res;
  }

  removeUserList(stockListDetails: StockListDetails):Observable<boolean> {
    var res = this.http
    .delete<boolean>(`${environment.server_url}/User/List`,
      {
        body: stockListDetails,
        observe: 'response'
      }
    )
    .pipe(map(res => res.status == 200));

    return res;
  }
}