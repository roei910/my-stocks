import { Injectable } from '@angular/core';
import { CookiesService } from './cookies.service';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { sha256 } from 'js-sha256';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private cookieService: CookiesService) { }

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
    var passwordHash = sha256(password);
    
    var isConnected = await axios.post(`${environment.server_url}/User/connect-user`,
      { email: email, password: passwordHash })
      .then(res => {
        if (res.status == 200) {
          this.cookieService.setCookie("email", email, 1);

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

  //TODO: change from any
  async AuthenticateToken(connectionToken: string): Promise<any> {
    var isAuthenticated = await axios.post(`${environment.server_url}/User/authenticate-token`,
      { params: {
        connectionToken
      }}
    )
    .then(res => console.log(res.data))
    .catch(err => console.log(err));

    return isAuthenticated;
  }
}