import { Injectable } from '@angular/core';
import { CookiesService } from './cookies.service';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private cookieService: CookiesService,
    private router: Router
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
    var isConnected = await axios.get("https://localhost:7173/User?email=" + email)
      .then(res => {
        if (res.status == 200) {
          this.cookieService.setCookie("email", res.data.email, 1);
          this.router.navigate(['/']);

          return true;
        }

        return false;
      });
    // var isConnected = email == "roei910@gmail.com";
    // if(isConnected){
    //   this.cookieService.setCookie("email", "roei910@gmail.com", 1);
    //   this.router.navigate(['/']);
    // }

    return isConnected;
  }

  async CreateUser(user: { Name: string; Password: string; Email: string; }): Promise<boolean> {
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
}