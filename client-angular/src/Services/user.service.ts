import { Injectable } from '@angular/core';
import { CookiesService } from './cookies.service';
import axios from 'axios';
import { User } from 'src/Models/user';

//TODO: create authentication service and move some functions from here to the auth service
@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  isMock: boolean = false;

  constructor(private cookieService: CookiesService,
  ) { }

  GetUserEmail() {
    var user = this.cookieService.getCookie("email");

    return user;
  }

  DisconnectUser() {
    this.cookieService.deleteCookie("email");
  }

  isUserConnected(): boolean {
    var user = this.cookieService.getCookie("email");

    if (!user || user == "")
      return false;

    return true;
  }

  async TryConnect(email: string, password: string): Promise<boolean> {
    if(this.isMock)
      return this.TryConnectMock(email, password);

    var isConnected = await axios.get("https://localhost:7173/User?email=" + email)
      .then(res => {
        if (res.status == 200) {
          this.cookieService.setCookie("email", res.data.email, 1);

          return true;
        }

        return false;
      })
      .catch(err => {
        console.log(err);

        return false;
      });

      return isConnected;
  }

  async CreateUser(user: User): Promise<boolean> {
    if(this.isMock)
      return this.CreateUserMock(user);

    var res = await axios
      .post("https://localhost:7173/User", user)
      .then(res => {
        if(res.status == 201){
          return true;
        }

        return false;
      });

    return res;
  }

  CreateUserMock(user: User): boolean{
    var foundUser = this.users.find((existingUser: User) => existingUser.email == user.email);

    if(!foundUser)
      this.users.push(user);
    
    return true;
  }

  TryConnectMock(email: string, password: string): boolean{
    var foundUser = this.users.find((user: User) => user.email == email);

    if(!foundUser)
      return false;

    var isUserAuthenticated = foundUser.password == password;
    
    if(isUserAuthenticated){
      this.cookieService.setCookie("email", "roei910@gmail.com", 1);

      return true;
    }

    return false;
  }
}