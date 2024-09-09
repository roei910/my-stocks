import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sha256 } from 'js-sha256';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/models/users/user';
import { UserCreation } from 'src/models/users/user-creation';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  GetUserByEmail(email: string): Observable<User>{
    var res = this.http
    .get<User>(`${environment.server_url}/User`,
      {
        params: {
          email
        }
      }
    );

    return res;
  }

  CreateUser(user: UserCreation): Observable<boolean> {
    user.password = sha256(user.password);
    
    var res = this.http
    .post(`${environment.server_url}/User/register`, user,
      {
        observe: 'response',
        responseType: 'text'
      }
    )
    .pipe(map(response => response.status == 200));

    return res;
  }
}