import { Injectable } from '@angular/core';
import { CookiesService } from './cookies.service';
import { environment } from '../environments/environment';
import { sha256 } from 'js-sha256';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isUserConnectedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private cookieService: CookiesService,
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  getUserEmail(): string | null {
    let email = this.cookieService.getCookie("email");

    return email;
  }

  disconnectUser() {
    this.cookieService.deleteCookie("email");
    this.isUserConnectedSubject.next(false);
  }

  userConnection(): Observable<boolean>{
    this.isUserConnected();

    return this.isUserConnectedSubject.asObservable();
  }
  
  isUserConnected(): boolean {
    let user = this.cookieService.getCookie("email");
    let isUserConnected = user != null && user != "";

    this.isUserConnectedSubject.next(isUserConnected);

    return isUserConnected;
  }

  tryConnect(email: string, password: string): Observable<boolean> {
    let passwordHash = sha256(password);

    return this.userService
      .connectUser(email, passwordHash)
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

  //TODO: not being used
  authenticateToken(connectionToken: string): Observable<boolean> {
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