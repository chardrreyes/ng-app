import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../user-index/user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [Storage]
})
export class LoginPageComponent implements OnInit {

  isLogin = true;
  isLoggingIn = false;
  loginLabel = 'LOGIN'
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  constructor(private router: Router, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')) {
      this.router.navigate(['home']);
    }
  }

  login() {
    this.loginLabel = 'LOGGING IN'
    this.isLoggingIn = !this.isLoggingIn
    if(this.loginForm.valid) {
      const form = this.loginForm.value;
      this.userService.authUser(form).subscribe(
        (data: any) => {
          this.store(data);
          const fullName = data.firstName + ' ' + data.lastName;
          this.openSnackBar('Welcome ' + fullName, 'Ok');
          this.router.navigate(['home']);
        },
        (error: any) => {
          console.log(error);
          this.loginLabel = 'LOGIN'
          this.isLoggingIn = !this.isLoggingIn;
          this.openSnackBar('Incorrect username or password.', "Ok");
        }
      )
    } else {
      this.isLoggingIn = !this.isLoggingIn;
      this.loginLabel = 'LOGIN'
      this.openSnackBar('Email and password are required fields.', 'Ok');
    }
  }

  store(data: User) {
    const keyObject = {
      id: data.id,
      email: data.email,
      firstName: data.firstName, 
      lastName: data.lastName,
      role: data.role
    }
    const jsonData = JSON.stringify(keyObject)
    localStorage.setItem('user', jsonData);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
