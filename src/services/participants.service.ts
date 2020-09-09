import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from 'src/participants/model';

@Injectable()
export class ParticipantsService {
  endpoint: string = 'https://global-ta-challenge.herokuapp.com';
  
  constructor(private http: HttpClient) { }

  getParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(`${this.endpoint}/challenge/getAll`);
  }
}