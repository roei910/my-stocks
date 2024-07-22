import { Injectable } from '@angular/core';
import axios from 'axios';
import { Share } from 'src/models/share';
import { environment } from 'src/environments/environment';
import { sha256 } from 'js-sha256';
import { UserCreation } from 'src/models/user-creation';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async GetUserByEmailAsync(email: string): Promise<User>{
    var res = await axios
      .get(`${environment.server_url}/User/by-email`,
        {
          params:{
            email
          }
        }
      )
      .then(res => {
        console.log(res);

        return res.data;
      })
      .catch(err => console.log(err));

    return res;
  }

  async CreateUser(user: UserCreation): Promise<boolean> {
    user.password = sha256(user.password);

    var res = await axios
      .post(`${environment.server_url}/User/register`, user)
      .then(res => {
        if (res.status == 200) {
          return true;
        }

        return false;
      })
      .catch(err => {
        console.log(err);

        return false;
      });

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

    return res
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
          params:{
            email,
            listName,
            stockSymbol
          }
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
          params:{
            email,
            listName,
            stockSymbol
          }
        }
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));

    return res
  }
}