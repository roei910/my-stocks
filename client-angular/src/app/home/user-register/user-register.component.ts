import { Component } from '@angular/core';
import { User } from '../../../Models/user';
import axios from 'axios';
import { Router } from '@angular/router';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  constructor(private router: Router,
    private userService: UserService
  ){ }

  async CreateUser(event: Event, name: string, email: string, password: string){
    event?.preventDefault();

    const user = {
      Name: name,
      Password: password,
      Email: email
    };

    await this.userService.CreateUser(user);
  }
}
