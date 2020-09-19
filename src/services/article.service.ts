import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from 'src/news/article-model';

@Injectable()
export class ArticleService {
  endpoint: string = 'https://gcc-backend-dev-temp.herokuapp.com';
  
  constructor(private http: HttpClient) { }

  savearticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.endpoint}/news/addstory`, article);
  }

  getImageForArticle(article: Article) : Observable<Blob> {
    return this.http.post<Blob>(`${this.endpoint}/news/getArticle/image`, article.imageUrl);
  }

  getAllArticleHeadlines(region: string): Observable<any> {
    // return {headlines: [
    //   {
    //     title: 'Article 1',
    //     subHeading: 'Sub heading article 1',
    //     paragraphs: [
    //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //       'Paragraph 2 article 1'
    //     ]
    //   },
    //   {
    //     title: 'Article 2',
    //     subHeading: 'Sub heading article 2',
    //     paragraphs: [
    //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    //       'Paragraph 2 article 2'
    //     ]
    //   }
    // ]}
    return this.http.get<any>(`${this.endpoint}/news/headlines/${region}?from=0&limit=20`);
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
}

