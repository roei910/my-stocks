import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/services/toast.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild("connectionForm")
  form!: NgForm;

  constructor(private router: Router,
    private userService: UserService,
    private toastService: ToastService
  ){ }

  signIn() {
    this.userService
    .tryConnect(this.form.value.email, this.form.value.password)
    .subscribe(isConnected => {
      if(!isConnected)
        this.toastService.addErrorMessage("username or password was incorrect");
      else
        this.router.navigate(['user', 'stocks']);
    }); 
  }
}
