import { Injectable } from '@angular/core';
import axios from 'axios';
import { Share } from 'src/models/share';
import { environment } from 'src/environments/environment';
import { sha256 } from 'js-sha256';
import { UserCreation } from 'src/models/user-creation';
import { User } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  async AddWatchingStock(email: string, listName: string, stockSymbol: string){
    var res = await axios
      .patch(`${environment.server_url}/User/add-watching-share`,
        {
          email,
          listName,
          stockSymbol
        }
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));

    return res
  }

  async RemoveWatchingStock(email: string, listName: string, stockSymbol: string){
    var res = await axios
      .patch(`${environment.server_url}/User/remove-watching-share`,
        {
          email,
          listName,
          stockSymbol
        }
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));

    return res
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
}