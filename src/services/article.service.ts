import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/news/article-model';

@Injectable()
export class ArticleService {
  endpoint: string = 'https://gcc-global-dev.herokuapp.com/';
  
  constructor(private http: HttpClient) { }

  savearticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.endpoint}/news/addstory`, article);
  }

  getImageForArticle(article: Article) : Observable<Blob> {
    return this.http.post<Blob>(`${this.endpoint}/news/getArticle/image`, article.imageUrl);
  }

  getAllArticleHeadlines(region: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/news/headlines/${region}?from=0&limit=30`);
  }

  getArticle(id: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/news/${id}`);
  }

  saveImage(file: File): Observable<string> {
    return this.http.post<string>(`${this.endpoint}/news/uploadImage`, file);
  }

  getImagesList(): Observable<string> {
    return this.http.get('assets/imageUrls.txt', {responseType: 'text'});
  }

  deleteArticle(articleId: string) {
    //return this.http.get(`${this.endpoint}/news/delete/${articleId}`);
    return null;
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.endpoint}/news/update/${article.id}`, article);
  }
}

