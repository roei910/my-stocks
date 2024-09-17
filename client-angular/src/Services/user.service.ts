import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sha256 } from 'js-sha256';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObjectIdResponse } from 'src/models/object-id-response';
import { StockNotification } from 'src/models/users/stock-notification';
import { User } from 'src/models/users/user';
import { UserCreation } from 'src/models/users/user-creation';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: Subject<User> | undefined;

  constructor(private httpClient: HttpClient) { }

  GetUser(email: string): Observable<User>{
    if(this.user == undefined){
      this.user = new Subject<User>();
      this.GetUserByEmail(email).subscribe(res => res);
      
      return this.user;
    }

    return this.user.asObservable();
  }

  GetUserByEmail(email: string): Observable<User>{
    var res = this.httpClient
    .get<User>(`${environment.server_url}/User`,
      {
        params: {
          email
        }
      }
    ).pipe(tap(res => this.user?.next(res)));

    return res;
  }

  CreateUser(user: UserCreation): Observable<boolean> {
    user.password = sha256(user.password);
    
    var res = this.httpClient
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
    var res = this.httpClient
      .post<ObjectIdResponse>(`${environment.server_url}/User/notification`, 
        stockNotification);

    return res;
  }
}