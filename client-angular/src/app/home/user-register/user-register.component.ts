import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

    const user = {
      Name: this.form.value.name,
      Password: this.form.value.password,
      Email: this.form.value.email
    };

    var isCreated = await this.userService.CreateUser(user);

    if(isCreated)
      this.router.navigate(['/login']);
    else
      prompt("couldn't create the user.");
  }
}
