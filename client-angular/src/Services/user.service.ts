import { Injectable } from '@angular/core';
import { CookiesService } from './cookies.service';
import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private cookieService: CookiesService,
    private router: Router
  ) { }

  GetUser() {
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
    var isConnected = await axios.get("https://localhost:7173/User/email?email=" + email)
      .then(res => {
        if (res.status == 200) {
          this.cookieService.setCookie("email", res.data.email, 1);
          this.router.navigate(['/']);

          return true;
        }

        return false;
      });

    return isConnected;
  }
}