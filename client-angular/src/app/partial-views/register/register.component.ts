import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCreation } from 'src/models/users/user-creation';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild("registrationForm")
  form!: NgForm;

  constructor(private router: Router,
    private userService: UserService
  ){ }

  CreateUser(){
    if(this.form.invalid){
      alert("Please finish the form");

      return;
    }

    const user: UserCreation = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      password: this.form.value.password,
      email: this.form.value.email,
    };
    
    this.userService.CreateUser(user)
    .subscribe(isCreated => {
      if(isCreated)
        this.router.navigate(['/login']);
      else
        alert("couldn't create the user.");
    });
  }
}