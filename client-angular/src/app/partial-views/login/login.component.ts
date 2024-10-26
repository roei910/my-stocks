import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild("connectionForm")
  form!: NgForm;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private toastService: ToastService
  ){ }

  SignIn() {
    this.authenticationService
    .TryConnect(this.form.value.email, this.form.value.password)
    .subscribe(isConnected => {
      if(!isConnected)
        this.toastService.addErrorMessage("username or password was incorrect");
      else
        this.router.navigate(['user', 'stocks']);
    }); 
  }
}
