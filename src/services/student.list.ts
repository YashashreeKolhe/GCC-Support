
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LIST, Name, Score } from 'src/score/score-model';
import { Observable } from 'rxjs';



@Injectable()
export class studentlist {
  studentlisturl: string = 'https://gcc-global-dev.herokuapp.com/scores/question/all/GLOBAL';

  /*'https://gcc-global-dev.herokuapp.com/leaderboard/*/

  constructor(
    private http: HttpClient
  ) { }

  getdata(): Observable<LIST[]> {
    return this.http.get<LIST[]>(this.studentlisturl)
  }
  data_name: Name[] = [{ Contestant: 'Himani', University: 'Imperial', Region: 'UK' }, { Contestant: 'Yashashree', University: 'Imperial', Region: 'UK' }, { Contestant: 'Rahul', University: 'Imperial', Region: 'UK' }, { Contestant: 'Yllnore', University: 'Imperial', Region: 'UK' }, { Contestant: 'Sai', University: 'Imperial', Region: 'UK' }]
  data_q1: Score[] = [{ Contestant: 'Himani', Score: 60 }, { Contestant: 'Yashashree', Score: 50 }, { Contestant: 'Rahul', Score: 100 }, { Contestant: 'Sai', Score: 200 }]


  getname(): Name[] {
    return this.data_name
  }

  getscore(): Score[] {
    return this.data_q1
  }

  loadCategories() {
    return [,
      'Question1',
      'Question2',
      'Question3',
      'Question4',
      'Question5',
      'Question6',
      'Global'
    ]
  }
}