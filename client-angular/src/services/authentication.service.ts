import { Injectable } from '@angular/core';
import { CookiesService } from './cookies.service';
import { environment } from '../environments/environment';
import { sha256 } from 'js-sha256';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private cookieService: CookiesService,
    private httpClient: HttpClient) { }

  GetUserEmail() {
    var email = this.cookieService.getCookie("email");

    return email;
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

  TryConnect(email: string, password: string): Observable<boolean> {
    var passwordHash = sha256(password);

    return this.httpClient
    .post<boolean>(`${environment.server_url}/User/connect-user`,
      {
        email: email,
        password: passwordHash
      },
      {
        observe: 'response'
      }
    )
    .pipe(
      map(response => response.status == 200),
      tap(res => {
        if (res)
          this.cookieService.setCookie("email", email, 1);
      })
    );
  }

  AuthenticateToken(connectionToken: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${environment.server_url}/User/authenticate-token`,
      null, {
      params: {
        connectionToken
      },
      observe: 'response'
    }).pipe(
      map(response => response.status === 200)
    );
  }
}