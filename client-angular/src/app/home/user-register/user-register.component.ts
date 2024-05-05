import { Component } from '@angular/core';
import { User } from '../../../Models/user';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  user?: User;
  
  constructor(private router: Router){ }

  CreateUser(event: Event, name: string, email: string, password: string){
    event?.preventDefault();

    this.user = {
      Name: name,
      Password: password,
      Email: email
    };

    axios
    .post("https://localhost:7173/User", this.user)
    .then(res => {
      if(res.status == 201){
        this.router.navigate(['/']);
      }
    });
  }
}
