import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from 'src/participants/model';

@Injectable()
export class CommonService {
  endpoint: string = 'https://gcc-global-dev.herokuapp.com';

  constructor(private http: HttpClient) { }

  // getFaqs(): Observable<FAQ[]> {
  //   return this.http.get<FAQ[]>(`${this.endpoint}/faqs`);
  // }

  loadBadges() {
    return [
      'Java Pro',
      'Best in Python',
      'Multi Language Coder'
    ];
  }

  loadUniversities(region: string): Observable<string[]> {
    return this.http.get<string[]>(`https://gcc-global-dev.herokuapp.com/universitylist/${region}`);
  }

  loadRegions(): string[] {
    return [
      'US',
      'AMC',
      'INDIA',
      'EUROPE',
      'SEA',
      'SWIS',
      'ROW',
    ];
  }

  loadLanguages() : string[] {
    return [
      'CPLUSPLUS',
      'JAVA',
      'CSHARP',
      'PYTHON',
      'JAVASCRIPT'
    ]
  }
}