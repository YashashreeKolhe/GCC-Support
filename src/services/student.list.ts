import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LIST } from 'src/score/score-model';
import { Observable } from 'rxjs';

@Injectable()
export class studentlist {
  studentlisturl: string = ' https://gcc-global-dev.herokuapp.com';

  constructor(
    private http: HttpClient) { }


 
  getdata(numberOfContestants: number): Observable<any> {
    return this.http.get<any>(`${this.studentlisturl}/leaderboard/GLOBAL?from=0&limit=${numberOfContestants}`);
  }  
  
  getNoOfParticipants(): Observable<any> {
    return this.http.get<any>(`${this.studentlisturl}/facts/quick/GLOBAL`);
  }  
}


