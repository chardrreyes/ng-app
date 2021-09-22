import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.users.push(
      {
        id: 1,  
        firstName: 'Gheorge',
        lastName: 'Strega',
        email: 'gstreg@email.com',
        password: 'qweasdzxc',
        image: '../../assets/cat1.jpg'
      },
      {
        id: 2,  
        firstName: 'Aqua',  
        lastName: 'Reyes',  
        email: 'areyes@email.com',  
        password: 'qweasdzxc',
        image: '../../assets/cat2.jpg'
      },
      {
        id: 3,  
        firstName: 'Mimi',  
        lastName: 'Santos',  
        email: 'mimisantos@email.com',  
        password: 'qweasdzxc',
        image: '../../assets/cat3.jpg'
      },
      {
        id: 4,  
        firstName: 'Comet',  
        lastName: 'Delosantos',  
        email: 'cdelosantos@email.com',  
        password: 'qweasdzxc',
        image: '../../assets/cat4.jpg'
      }
    )
  }

  addUser() {
    // secondary validation
    if(this.userForm.valid) {
      console.warn(this.userForm.value);
      const user = this.userForm.value;
      this.users.push(user);
      //clear form
      this.userForm.reset();
    } else {
      console.log('not valid')
      this.openSnackBar('Please fill up the required field.', 'Ok');
    }
  }

  removeUser(id: number) {
    this.users.splice(id, 1);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  validate(){
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      this.addUser()
    } else {
      form.classList.add('was-validated');
    }
    
  } 

  checkPass(value: string) {
    const pass = this.userForm.value;
  }

  trackByFunc(index: any, value: any) {
    return value.id;
  }

}
