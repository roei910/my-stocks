import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Share } from 'src/models/shares/share';
import { SharePurchase } from 'src/models/shares/share-purchase';
import { ShareSale } from 'src/models/shares/share-sale';
import { StockListDetails } from 'src/models/stocks/stock-list-details';

@Injectable({
  providedIn: 'root'
})
export class SharesService {
  SHARE_ENDPOINT: string = "Share";

  constructor(private httpClient: HttpClient) { }

  addUserShare(sharePurchase: SharePurchase): Observable<Share | null> {
    let res = this.httpClient
      .post<Share>(`${environment.server_url}/${this.SHARE_ENDPOINT}`, sharePurchase, {
        observe: 'response'
      })
      .pipe(map(res => res.status == 200 ? res.body : null));

    return res;
  }

  removeUserShare(shareSale: ShareSale): Observable<boolean> {
    return this.httpClient
      .delete<boolean>(`${environment.server_url}/${this.SHARE_ENDPOINT}`, {
        body: shareSale,
        observe: 'response'
      })
      .pipe(map(res => res.status == 200));
  }

  addWatchingStock(email: string, listName: string, stockSymbol: string):
    Observable<boolean> {
    let res = this.httpClient
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

  removeWatchingStock(email: string, listName: string, stockSymbol: string):
    Observable<boolean> {
    let res = this.httpClient
      .delete<boolean>(`${environment.server_url}/${this.SHARE_ENDPOINT}/watching-stock`,
        {
          body: {
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

  updateWatchingStockNote(email: string, listName: string, stockSymbol: string, note: string):
    Observable<boolean> {
    let res = this.httpClient
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

  addUserList(stockListDetails: StockListDetails): Observable<boolean> {
    let res = this.httpClient
      .post<boolean>(`${environment.server_url}/${this.SHARE_ENDPOINT}/List`,
        stockListDetails, {
        observe: 'response'
      }
      )
      .pipe(map(res => res.status == 200));

    return res;
  }

  removeUserList(stockListDetails: StockListDetails): Observable<boolean> {
    let res = this.httpClient
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