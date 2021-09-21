import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  isLogin = true;
  isLoggingIn = false;
  loginLabel = 'LOGIN'

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.isLogin)
      console.log('logged in');
      // route to user
  }

  login() {
    this.loginLabel = 'LOGGING IN'
    this.isLoggingIn = !this.isLoggingIn
    var login = this;
    setTimeout(function() {

      login.isLoggingIn = !login.isLoggingIn;
      login.router.navigate(['home']);
    },1500);
    
  }

}
