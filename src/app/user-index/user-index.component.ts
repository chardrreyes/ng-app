import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})

export class UserIndexComponent implements OnInit {
  users: User[] = [];
  userForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  constructor(private router: Router, private snackBar: MatSnackBar, private userService: UserService) { }

  ngOnInit(): void {
    const role = JSON.parse(localStorage.getItem('user') || '{}');
    if(role.id) {
      if(role.role == 0) {
        // route to own detail page
        this.router.navigate([role.id + '/view'])
      }
    } else {
      this.router.navigate([role.id + '/view'])
    }
    this.userService.getAllUser().subscribe(
      (data: any) => {
        this.users = data;
      }
    );
  }

  addUser() {
    // secondary validation
    if(this.userForm.valid) {
      const user = this.userForm.value;
      user.role = 0;
      this.users.push(user);
      // call api
      this.userService.insertUser(user);
      // clear form
      this.router.navigate(['home']);
    }
  }

  viewUser(index: number) {
    const uid = this.users[index].id;
    this.router.navigate([uid + '/view']);
  }

  removeUser(index: number) {
    const uid = this.users[index].id;
    this.users.splice(index, 1);
    // remove user using api
    this.userService.deleteUser(uid).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  validate(){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      form.classList.add('was-validated');

    } else {
      form.classList.add('was-validated');
      this.addUser();
    }
    
  } 

  checkPass(value: string) {
    const pass = this.userForm.value;
  }

  trackByFunc(index: any, value: any) {
    return value.id;
  }

}
