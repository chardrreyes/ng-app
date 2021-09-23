import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'ng-app';
  isLoggedIn = false;

  constructor(private userService: UserService) {}

  ngOnInit() {

  }

  ngDoCheck() {
    if(localStorage.getItem('user')) {
      this.isLoggedIn = true;
    }
  }


  logout() {
    this.userService.logout();
  }
}
