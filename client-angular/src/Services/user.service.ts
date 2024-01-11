import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  User: any = {
    name: "roei daniel",
    email: "roei910@gmail.com"
  }

  constructor() { }

  GetUser(){
    return this.User;
  }
  
}
