import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private userAuthService: UserAuthService){}

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }
}
