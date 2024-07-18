import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from 'src/Models/user';
import { Share } from 'src/Models/share';
import { environment } from 'src/environments/environment';

//TODO: create authentication service and move some functions from here to the auth service
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async GetUserByEmailAsync(email: string){
    var res = await axios
      .get(`${environment.server_url}/User/by-email`,
        {
          params:{
            email
          }
        }
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));

    return res;
  }

  async CreateUser(user: User): Promise<boolean> {
    var res = await axios
      .post(`${environment.server_url}/User/register`, user)
      .then(res => {
        if (res.status == 201) {
          return true;
        }

        return false;
      });

    return res;
  }

  async AddUserShare(email: string, sharePurchase: Share): Promise<boolean> {
    var res = await axios
      .patch(`${environment.server_url}/User/add-share`, sharePurchase)
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