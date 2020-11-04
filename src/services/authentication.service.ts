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

  
  roleResponse : string;

  async setRole(err){
    console.log(err);
    this.roleResponse = err;
    console.log(this.roleResponse);
  }

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
      await this.http.post<any>(`${this.endpoint}/monitoring/auth/verification`, { password: password, username: userame } , this.httpOptions).toPromise().then().catch(err => this.setRole(err.error.text));
      if(this.roleResponse != null) {
        return {
          userame: userame,
          role: this.roleResponse
        } as User;
      }
      console.log(this.roleResponse);
    } catch (e) {
      console.log(e);
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