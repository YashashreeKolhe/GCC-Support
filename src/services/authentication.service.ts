import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../login/model';
import { updateShorthandPropertyAssignment } from 'typescript';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('gcc2020monitoring:gcc-2020-monitoring-123')
    })
  };
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  endpoint: string = ' https://gcc-global.herokuapp.com';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  async login(username: string, password: string) {
    var user = await this.authenticate(username, password);
    if (user !== null) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
    return user;
  }

  async authenticate (userame: string, password: string) {
    try {
      var role = await this.http.post<any>(`${this.endpoint}/monitoring/auth/verification`, { username: userame, password: password } , this.httpOptions).toPromise();
      if(role != null) {
        return {
          userame: userame,
          role: role
        } as User;
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}