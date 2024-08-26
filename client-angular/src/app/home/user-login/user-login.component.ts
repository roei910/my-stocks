import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  @ViewChild("connectionForm")
  form!: NgForm;

  constructor(private router: Router,
    private authenticationService: AuthenticationService
  ){ }

  SignIn() {
    this.authenticationService
    .TryConnect(this.form.value.email, this.form.value.password)
    .subscribe(isConnected => {
      if(!isConnected)
        alert("username or password was incorrect");
      else
        this.router.navigate(['/']);
    }); 
  }
}