import { Component } from '@angular/core';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
await: any;
  constructor(private userService: UserService){

  }

  async SignIn(event: Event, email: string,password: string) {
    event.preventDefault();
    var isConnected = await this.userService.TryConnect(email, password); 

    if(!isConnected)
      alert("username or password was incorrect");
  }
}
