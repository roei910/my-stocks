import { Component } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private userService: UserService,
    private authenticationService: AuthenticationService
  ){}

  ngOnInit(): void {
    var email = this.authenticationService.GetUserEmail();

    if(email == null)
      return;

    this.userService.GetUser().subscribe(user => user);
  }
}
