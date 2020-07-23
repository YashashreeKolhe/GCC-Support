import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionStats, RegionStats, LanguageStats, WeeklyStats } from 'src/analytics/model';


@Injectable()
export class AnalyticsService {
  getAttemptsPerQuestion(): QuestionStats[] { //Observable<QuestionStats[]> {
    return [
      { Question: 1, Value: 90 },
      { Question: 2, Value: 42 },
      { Question: 3, Value: 34 },
      { Question: 4, Value: 56 },
      { Question: 5, Value: 10 },
      { Question: 6, Value: 10 },
      { Question: 7, Value: 100 },
      { Question: 8, Value: 12 },
      { Question: 9, Value: 45 },
    ];
  }

  getCorrectSubmissionsPerRegion(): RegionStats[] { //Observable<RegionStats[]> {
    return [
      { Region: 'US', Value: 300 },
      { Region: 'EMEA', Value: 250 },
      { Region: 'Switzerland', Value: 105 }
    ];
  }

  getSuccessfulAttemptsPerQuestion(): QuestionStats[] {
    return [
      { Question: 1, Value: 90 },
      { Question: 2, Value: 42 },
      { Question: 3, Value: 34 },
      { Question: 4, Value: 56 },
      { Question: 5, Value: 10 }
    ];
  }

  getUnsuccessfulAttemptsPerQuestion(): QuestionStats[] {
    return [
      { Question: 1, Value: 30 },
      { Question: 2, Value: 34 },
      { Question: 3, Value: 76 },
      { Question: 4, Value: 10 },
      { Question: 5, Value: 56 }
    ];
  }

  getNumberOfSubmissionsPerLanguage(): LanguageStats[] {
    return [
      { Language: 'C', Value: 104 },
      { Language: 'C++', Value: 56 },
      { Language: 'Java', Value: 48 },
      { Language: 'Python', Value: 92 }
    ];
  } 

  getNumberOfSubmissionsPerWeek(): WeeklyStats[] {
    return [
      { Week: 1, Value: 132 },
      { Week: 2, Value: 157 },
      { Week: 3, Value: 176 },
      { Week: 4, Value: 300 },
    ];
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