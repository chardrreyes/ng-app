import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {

  users: User[] = [];

  constructor() { }

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

  trackByFunc(index: any, value: any) {
    return value.id;
  }

}
