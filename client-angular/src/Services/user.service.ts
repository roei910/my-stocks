import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sha256 } from 'js-sha256';
import { Observable, Subject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObjectIdResponse } from 'src/models/object-id-response';
import { StockNotification } from 'src/models/users/stock-notification';
import { User } from 'src/models/users/user';
import { UserCreation } from 'src/models/users/user-creation';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: Subject<User> | undefined;

  constructor(private httpClient: HttpClient, 
    private authenticationService: AuthenticationService
  ) { }

  GetUser(): Observable<User>{
    if(this.userSubject == undefined)
      this.userSubject = new Subject<User>();

    this.UpdateUser();

    return this.userSubject.asObservable();
  }

  UpdateUser(): void{
    if(this.authenticationService.isUserConnected() == false)
      return;
    
    let email = this.authenticationService.GetUserEmail();

    this.httpClient
    .get<User>(`${environment.server_url}/User`,
      {
        params: {
          email
        }
      }
    ).pipe(tap(res => this.userSubject?.next(res)))
    .subscribe(user => user);
  }

  CreateUser(user: UserCreation): Observable<boolean> {
    user.password = sha256(user.password);
    
    let res = this.httpClient
    .post(`${environment.server_url}/User/register`, user,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
    .pipe(map(response => response.status == 200));

    return res;
  }

  AddStockNotification(stockNotification: StockNotification): Observable<ObjectIdResponse>{
    let res = this.httpClient
      .post<ObjectIdResponse>(`${environment.server_url}/User/notification`, 
        stockNotification);

    return res;
  }
}