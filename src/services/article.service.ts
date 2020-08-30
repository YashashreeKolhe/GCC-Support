import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ARTICLE } from 'src/news/article-model';

@Injectable()
export class ArticleService {
  endpoint: string = 'https://gcc-global-dev.herokuapp.com';
  
  constructor(private http: HttpClient) { }

  savearticle(article: ARTICLE): Observable<boolean> {
    return this.http.post<boolean>(`${this.endpoint}/news/addstory`, article);
  }

}

