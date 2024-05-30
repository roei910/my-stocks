import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  @ViewChild("connectionForm")
  form!: NgForm;

  constructor(private userService: UserService,
    private router: Router
  ){ }

  async SignIn() {
    var isConnected = await this.userService.TryConnect(this.form.value.email, this.form.value.password); 

    if(!isConnected)
      alert("username or password was incorrect");
    else
      this.router.navigate(['/']);
  }
}