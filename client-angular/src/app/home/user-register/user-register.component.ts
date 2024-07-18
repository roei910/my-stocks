import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  @ViewChild("registrationForm")
  form!: NgForm;

  constructor(private router: Router,
    private userService: UserService
  ){ }

  async CreateUser(){
    if(this.form.invalid){
      alert("Please finish the form");

      return;
    }

    const user: User = {
      firstName: this.form.value.name,
      lastName: "",
      password: this.form.value.password,
      email: this.form.value.email,
      lists: {}
    };

    var isCreated = await this.userService.CreateUser(user);

    if(isCreated)
      this.router.navigate(['/login']);
    else
      prompt("couldn't create the user.");
  }
}
