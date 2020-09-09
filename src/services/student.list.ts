import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LIST } from 'src/score/score-model';
import { Observable } from 'rxjs';



@Injectable()
export class studentlist {
  studentlisturl: string = 'https://global-ta-challenge.herokuapp.com/scores/question/all/GLOBAL';

  constructor(
    private http: HttpClient) { }

  getdata(): Observable<LIST[]> {
    return this.http.get<LIST[]>(this.studentlisturl);
  }
}