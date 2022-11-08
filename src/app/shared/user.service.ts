import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from "../user-index/user.model";
import { catchError, map, take } from 'rxjs/operators';
import { throwError } from "rxjs";
// import {}


export interface userId {
    id: number
}

@Injectable({providedIn: 'root'})
export class UserService {

    // change this to your own baseUrl
    //.NET Backend
    // baseUrl = 'https://localhost:44325/api/Users'; //
    baseUrl = 'https://pokeapi.co/api/v2/pokemon/ditto/';
    
    constructor(private httpClient: HttpClient) {}

    getAllUser() {
        const urlRoute = this.baseUrl;
        console.log(urlRoute)
        return this.httpClient
        .get<User[]>(urlRoute)
        .pipe(
            map(users => {
                users.forEach((element, index) => {
                    if(element.id == 1) {
                        users.splice(index, 1);
                    }
                });
                return users;
            })
        )
    }

    getUser(id: number) {
        console.log('getting user, detailed');
        const urlRoute = this.baseUrl + '/' + id;
        console.log(urlRoute)
        return this.httpClient
        .get<User>(urlRoute)
        .pipe(
            map(users => {
                return users;
            })
        )
    }

    insertUser(form: User) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        const body = JSON.stringify(form);
        console.log(body);
        const urlRoute = this.baseUrl + '/add';
        return this.httpClient.post(urlRoute, body, httpOptions).subscribe(
            data => {
                console.log(data);
            }
        )
    }

    updateUser(id: number, form: User) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        const urlRoute = this.baseUrl + '/' + id;
        const body = JSON.stringify(form);
        console.log(body);
        return this.httpClient.put(urlRoute, body, httpOptions).pipe(
            map(data => {
                console.log(data);
            })
        )
    }

    deleteUser(id: number) {
        const urlRoute = this.baseUrl + '/' + id;
        return this.httpClient.delete(urlRoute).pipe(
            map(
                data => {
                    return data;
                }
            )
        )
    }

    authUser(form: any) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        // const body = JSON.stringify(form);
        // const urlRoute = this.baseUrl + '/auth';
        // console.log(urlRoute)
        // return this.httpClient.post(urlRoute, body, httpOptions).pipe(
        //     catchError(this.handle),
        //     map(
        //         data => {
        //             console.log(data)
        //             return data;
        //         }
        //     )
        // );

        
        // Uncomment if the backend is up and running
        const urlRoute = this.baseUrl;
        console.log(urlRoute)
        return this.httpClient.get(urlRoute, httpOptions).pipe(
            catchError(this.handle),
            map(
                data => {
                    console.log(data)
                    return data;
                }
            )
        );
    }

    logout() {
        localStorage.removeItem('user');
    }

    handle(error: HttpErrorResponse) {
        return throwError( error.message);
    }
}