import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionStats, RegionStats, LanguageStats, WeeklyStats } from 'src/analytics/model';


@Injectable()
export class AnalyticsService {

  constructor(private http: HttpClient) {}
  endpoint: string = ' https://gcc-global.herokuapp.com';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('gcc2020monitoring:gcc-2020-monitoring-123')
    })
  };

  adminHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('gcc2020admin:gcc-2020-admin-456')
    })
  };

  getAttemptsPerQuestion(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/attemptsPerQuestion`, this.adminHttpOptions);
  }

  getCorrectSubmissionsPerRegion(): Observable<any[]> {
    return this.http.get<any>(`${this.endpoint}/monitoring/correctSubmissionsPerRegion`, this.httpOptions);
  }

  getSuccessfulAttemptsPerQuestion(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/successfulAttemptsPerQuestion`, this.httpOptions);
  }

  getUnsuccessfulAttemptsPerQuestion(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/unsuccessfulAttemptsPerQuestion`, this.httpOptions);
  }

  getNumberOfSubmissionsPerLanguage(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/submissionsPerLanguage`, this.httpOptions)
  } 

  getNumberOfSubmissionsPerWeek(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/submissionsPerWeek`, this.httpOptions);
  }

  getParticipantsPerRegion(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/participantsPerRegion`, this.httpOptions);
  }

  getSuccessfulSubmissionsPerWeek(question: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/submissionsPerWeek/${question}`, this.httpOptions);
  }

  getNoOfSubmissionsPerLanguage(question: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/submissionsPerLanguage/${question}`, this.httpOptions);
  }

  getCorrectSubmissionsPerRegionForQuestion(question: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/correctSubmissionsPerRegion/${question}`, this.httpOptions);
  }
}