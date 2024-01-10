import { Component } from '@angular/core';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent {

  constructor(private userService: UserService) {}

  GetUser(){
    return this.userService.GetUser();
  }
}
