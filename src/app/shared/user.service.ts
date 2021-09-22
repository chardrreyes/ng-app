import { Injectable } from "@angular/core";
import { User } from "../user-index/user.model";

export interface userId {
    id: number
}

@Injectable({providedIn: 'root'})
export class UserService {
    
    constructor() {}

    getAllUser() {
        console.log('getting user');
    }

    getUser(id: number) {
        console.log('getting user, detailed');
    }

    updateUser(form: User) {
        console.log('update user');
    }

    deleteUser(id: number) {
        console.log('delete user')
    }

    batchDeleteUser(form: userId) {
        console.log('batch delete user')
    }
}