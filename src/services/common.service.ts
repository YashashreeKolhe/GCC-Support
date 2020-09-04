import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from 'src/participants/model';
import { Name } from 'src/faqs/model';

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
      'GLOBAL'
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

  loadNames(): Name[] {
    return [
      { Category: 'Others', 'Name': 'Yashashree Kolhe' },
      { Category: 'Others', 'Name': 'Himani Mody' },
      { Category: 'Others', 'Name': 'Yllnore Shehi' },
      { Category: 'Others', 'Name': 'Sai Paila' },
      { Category: 'Others', 'Name': 'Thomas Josephson' },
      { Category: 'Others', 'Name': 'Raluca Lusca' },
      { Category: 'Others', 'Name': 'Mathusha Mohan' },
      { Category: 'Questions', 'Name': 'Snehal Ingle' },
      { Category: 'Questions', 'Name': 'Irmak Goksu' },
      { Category: 'Questions', 'Name': 'Dave Or' },
      { Category: 'Questions', 'Name': 'Zuzanna Deutschman' },
      { Category: 'Scores/Evaluation', 'Name': 'Neha Jeevan' },
      { Category: 'Scores/Evaluation', 'Name': 'Abhishek Kuvalekar' },
      { Category: 'Scores/Evaluation', 'Name': 'Shweta Zawar' },
      { Category: 'Scores/Evaluation', 'Name': 'Shreyansh Sancheti' },
      { Category: 'Scores/Evaluation', 'Name': 'Tanuj Kadiyala' },
      { Category: 'Scores/Evaluation', 'Name': 'Jahnavi Sistla' },
      { Category: 'Scores/Evaluation', 'Name': 'Heran Zhang' },
      { Category: 'Registration', 'Name': 'Dragos Popa' },
      { Category: 'Registration', 'Name': 'Jordan Angeline' },
      { Category: 'Registration', 'Name': 'Deepthi Rao' },
      { Category: 'Registration', 'Name': 'Jack Redpath' },
      { Category: 'Registration', 'Name': 'Reis Gardner' },
      { Category: 'Registration', 'Name': 'Ryan Regal' },
      { Category: 'Registration', 'Name': 'Florian Lehmann' },
    ];
  }
}