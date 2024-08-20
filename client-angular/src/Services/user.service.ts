import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { sha256 } from 'js-sha256';
import { UserCreation } from 'src/models/users/user-creation';
import { User } from 'src/models/users/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharePurchase } from 'src/models/shares/share-purchase';
import { ShareSale } from 'src/models/shares/share-sale';
import { StockListDetails } from 'src/models/stocks/stock-list-details';

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

  AddUserShare(sharePurchase: SharePurchase): Observable<HttpResponse<boolean>> {
    var res = this.http
      .post<boolean>(`${environment.server_url}/User/share`, sharePurchase, {
        observe: 'response'
      });

    return res;
  }

  RemoveUserShare(shareSale: ShareSale): Observable<HttpResponse<boolean>>{
    var res = this.http
      .delete<boolean>(`${environment.server_url}/User/share`, {
        body: shareSale,
        observe: 'response'
      });

      return res;
  }

  AddWatchingStock(email: string, listName: string, stockSymbol: string): 
    Observable<HttpResponse<boolean>>{
    var res = this.http.post<boolean>(`${environment.server_url}/User/watching-stock`, 
      {
        email,
        listName,
        stockSymbol
      },
      {
        observe: 'response'
      }
    );

    return res
  }

  RemoveWatchingStock(email: string, listName: string, stockSymbol: string):
    Observable<HttpResponse<boolean>>{
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
      );

    return res;
  }

  UpdateWatchingStockNote(email: string, listName: string, stockSymbol: string, note: string): 
    Observable<HttpResponse<boolean>>{
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
      );

    return res
  }

  addUserList(stockListDetails: StockListDetails):Observable<any> {
    var res = this.http.post<User>(`${environment.server_url}/User/List`,
      stockListDetails
    );

    return res;
  }

  removeUserList(stockListDetails: StockListDetails):Observable<HttpResponse<boolean>> {
    var res = this.http.delete<boolean>(`${environment.server_url}/User/List`,
      {
        body: stockListDetails,
        observe: 'response'
      }
    );

    return res;
  }
}