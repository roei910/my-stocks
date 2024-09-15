import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sha256 } from 'js-sha256';
import { Observable, Subject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObjectIdResponse } from 'src/models/object-id-response';
import { StockNotification } from 'src/models/users/stock-notification';
import { User } from 'src/models/users/user';
import { UserCreation } from 'src/models/users/user-creation';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Subject<User> = new Subject<User>();

  constructor(private httpClient: HttpClient) { }

  GetUser(): Observable<User>{
    return this.user.asObservable();
  }

  UpdateUser(user: User){
    return this.user.next(user);
  }

  GetUserByEmail(email: string): Observable<User>{
    var res = this.httpClient
    .get<User>(`${environment.server_url}/User`,
      {
        params: {
          email
        }
      }
    ).pipe(tap(res => this.user.next(res)));

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
    return this.httpClient
      .post<ObjectIdResponse>(`${environment.server_url}/User/notification`, 
        stockNotification);
  }
}