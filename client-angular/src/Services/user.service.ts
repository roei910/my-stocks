import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: string = "roei daniel";

  constructor() { }

  GetUser(){
    return this.user;
  }
  
}
