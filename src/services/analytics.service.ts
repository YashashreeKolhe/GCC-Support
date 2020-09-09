import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionStats, RegionStats, LanguageStats, WeeklyStats } from 'src/analytics/model';


@Injectable()
export class AnalyticsService {

  constructor(private http: HttpClient) {}
  endpoint: string = 'https://global-ta-challenge.herokuapp.com';

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

  getParticipantsPerRegion(): RegionStats[] {
    return [
      { Region: 'US', Value: 400 },
      { Region: 'EMEA', Value: 506 },
      { Region: 'Switzerland', Value: 312 }
    ];
  }

  getSuccessfulSubmissionsPerWeek(question: string): WeeklyStats[] {
    return [
      { Week: 1, Value: 132 },
      { Week: 2, Value: 157 },
      { Week: 3, Value: 176 },
      { Week: 4, Value: 300 },
    ];
  }

  getNoOfSubmissionsPerLanguage(question: string): LanguageStats[] {
    return [
      { Language: 'C', Value: 104 },
      { Language: 'C++', Value: 56 },
      { Language: 'Java', Value: 48 },
      { Language: 'Python', Value: 92 }
    ];
  }

  getCorrectSubmissionsPerRegionForQuestion(question: string): RegionStats[] {
    return [
      { Region: 'US', Value: 400 },
      { Region: 'EMEA', Value: 506 },
      { Region: 'Switzerland', Value: 312 }
    ];
  }
}