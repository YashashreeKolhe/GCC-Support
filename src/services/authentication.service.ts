import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../login/model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  credentials: User[] = [
    { username: 'gcc-2020-campus', password: 'gcc-2020-campus-456', role: 'cs-internal' },
    { username: 'gcc-2020-support', password: 'gcc-2020-support-456', role: 'admin' }
  ]

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    var user = this.authenticate(username, password);
    if (user !== null) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
    return user;
  }

  authenticate (userame: string, password: string) {
    var user = this.credentials.find(i => i.username === userame && i.password === password);
    if(user != null) {
      return user;
    }
    return null;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}