import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user-index/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const role = JSON.parse(localStorage.getItem('user') || '{}');
    if(!role.id) {
      this.router.navigate([''])
    }

    this.route.params.subscribe(
      route => {
        // GET DATA IN API
        if(route) {
          this.userService.getUser(route.userId).subscribe(
            (data: User) => {
              console.log(data);
              this.userForm = new FormGroup({
                id: new FormControl(data.id),
                firstName: new FormControl(data.firstName,[Validators.required]),
                lastName: new FormControl(data.lastName,[Validators.required]),
                email: new FormControl(data.email,[Validators.required]),
                password: new FormControl(data.password,[Validators.required]),
                role: new FormControl(data.role,[Validators.required])
              });

            }
          )
        }
      }

    )
  }

  updateUser() {
    console.log(this.userForm.value);
    const form = this.userForm.value;
    const uid = form.id;
    //call api
    this.userService.updateUser(uid, form).subscribe(
      (data) => {
        console.log(data);
        this.openSnackBar(form.firstName + ' ' + form.lastName + ' has been updated.', 'Ok');
        this.router.navigate(['home']);

      },
      (error) => {
        console.log(error);
        this.openSnackBar('Error updating.', 'Ok');
        this.router.navigate(['home']);
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
