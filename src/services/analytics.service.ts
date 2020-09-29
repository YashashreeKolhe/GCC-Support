import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionStats, RegionStats, LanguageStats, WeeklyStats } from 'src/analytics/model';


@Injectable()
export class AnalyticsService {

  constructor(private http: HttpClient) {}
  endpoint: string = ' https://gcc-global-dev.herokuapp.com';

  getAttemptsPerQuestion(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/attemptsPerQuestion`);
  }

  getCorrectSubmissionsPerRegion(): Observable<any[]> {
    return this.http.get<any>(`${this.endpoint}/monitoring/correctSubmissionsPerRegion`);
  }

  getSuccessfulAttemptsPerQuestion(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/successfulAttemptsPerQuestion`);
  }

  getUnsuccessfulAttemptsPerQuestion(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/unsuccessfulAttemptsPerQuestion`);
  }

  getNumberOfSubmissionsPerLanguage(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/submissionsPerLanguage`)
  } 

  getNumberOfSubmissionsPerWeek(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/submissionsPerWeek`);
  }

  getParticipantsPerRegion(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/participantsPerRegion`);
  }

  getSuccessfulSubmissionsPerWeek(question: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/submissionsPerWeek/${question}`);
  }

  getNoOfSubmissionsPerLanguage(question: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/submissionsPerLanguage/${question}`);
  }

  getCorrectSubmissionsPerRegionForQuestion(question: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/monitoring/correctSubmissionsPerRegion/${question}`);
  }
}