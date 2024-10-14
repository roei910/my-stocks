import { Injectable } from '@angular/core';
import { CookiesService } from './cookies.service';
import { environment } from '../environments/environment';
import { sha256 } from 'js-sha256';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isUserConnectedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private cookieService: CookiesService,
    private httpClient: HttpClient) { }

  GetUserEmail(): string {
    var email = this.cookieService.getCookie("email");

    return email!;
  }

  DisconnectUser() {
    this.cookieService.deleteCookie("email");
    this.isUserConnectedSubject.next(false);
  }

  isUserConnected(): Observable<boolean> {
    var user = this.cookieService.getCookie("email");

    this.isUserConnectedSubject.next(user != null && user != "");

    return this.isUserConnectedSubject.asObservable();
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
          if (res) {
            this.cookieService.setCookie("email", email, 1);
            this.isUserConnectedSubject.next(true);
          }
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