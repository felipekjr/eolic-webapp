import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../_models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    baseUrl: string = 'https://eolic-api.herokuapp.com/api/login';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }    

    login(user: User) {
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            console.log(JSON.parse(localStorage.getItem('currentUser')));
        }
        return localStorage.getItem('currentUser');
    }
    
    logout() {
        // remove o usuário do local storage
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
