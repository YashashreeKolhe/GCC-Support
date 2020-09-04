import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from 'src/participants/model';
import { LIST } from 'src/score/score-model';

@Injectable({
  providedIn: 'root'
})
export class GcchomeService {
  endpoint: string = 'https://gcc-global-dev.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  getParticipants(): Observable<Participant[]> {
    return this.httpClient.get<Participant[]>(`${this.endpoint}/challenge/getAll`);
  }

  getHighestScore() {
    // ping a get API to get the highest score of the challenge
  }

  getTopScorer(): Observable<any> {
    // ping a get API to get the top scorer of the challenge
    return this.httpClient.get(`${this.endpoint}/facts/quick/GLOBAL`);
  }

  getGlobalStats() : Observable<any> {
    return this.httpClient.get(`${this.endpoint}/leaderboard/globalTotals`);
  }

  getScores(): Observable<LIST[]> {
    return this.httpClient.get<LIST[]>(`${this.endpoint}/scores/question/all/GLOBAL`);
  }

  getTotalParticipants() {
    // ping a get API to get the total number of participants of the challenge
    return this.httpClient.get('facts/quick/GLOBAL');
  }
}
