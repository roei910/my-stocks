import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharePurchase } from 'src/models/shares/share-purchase';
import { ShareSale } from 'src/models/shares/share-sale';
import { StockListDetails } from 'src/models/stocks/stock-list-details';
import { User } from 'src/models/users/user';

@Injectable({
  providedIn: 'root'
})
export class SharesService {
  SHARE_ENDPOINT: string = "Share";

  constructor(private httpClient: HttpClient) { }

  AddUserShare(sharePurchase: SharePurchase): Observable<boolean> {
    var res = this.httpClient
    .post<boolean>(`${environment.server_url}/${this.SHARE_ENDPOINT}`, sharePurchase, {
      observe: 'response'
    })
    .pipe(map(res => res.status == 200));

    return res;
  }

  RemoveUserShare(shareSale: ShareSale): Observable<boolean>{
    return this.httpClient
    .delete<boolean>(`${environment.server_url}/${this.SHARE_ENDPOINT}`, {
      body: shareSale,
      observe: 'response'
    })
    .pipe(map(res => res.status == 200));
  }

  AddWatchingStock(email: string, listName: string, stockSymbol: string): 
    Observable<boolean>{
    var res = this.httpClient
    .post<boolean>(`${environment.server_url}/${this.SHARE_ENDPOINT}/watching-stock`, 
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
    var res = this.httpClient
    .delete<boolean>(`${environment.server_url}/${this.SHARE_ENDPOINT}/watching-stock`,
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
    var res = this.httpClient
    .patch<boolean>(`${environment.server_url}/${this.SHARE_ENDPOINT}/watching-stock-note`,
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
    var res = this.httpClient
    .post<User>(`${environment.server_url}/${this.SHARE_ENDPOINT}/List`,
      stockListDetails
    );

    return res;
  }

  removeUserList(stockListDetails: StockListDetails):Observable<boolean> {
    var res = this.httpClient
    .delete<boolean>(`${environment.server_url}/${this.SHARE_ENDPOINT}/List`,
      {
        body: stockListDetails,
        observe: 'response'
      }
    )
    .pipe(map(res => res.status == 200));

    return res;
  }
}
