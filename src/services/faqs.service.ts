import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FAQ, Name } from 'src/faqs/model';

@Injectable()
export class FaqsService {
  //endpoint: string = 'http://localhost:8080';
  
  faqsList: FAQ[] = [
    { 'Id': 1, 'Question': 'Who is eligible to register? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Answer': '', 'Category': 'Registration', 'AnsweredBy': 'Yashashree' },
    { 'Id': 2, 'Question': 'How will be the difficulty level of the questions?', 'Answer': '', 'Category': 'Questions', 'AnsweredBy': 'Yashashree' },
    { 'Id': 3, 'Question': 'How will the scores be calculated? What all parameters will be taken into consideration?', 'Answer': '', 'Category': 'Scores/Evaluation', 'AnsweredBy': 'Yashashree' },
    { 'Id': 4, 'Question': 'Shuld we use our own github repo or will it be assigned to us?', 'Answer': '', 'Category': 'Others', 'AnsweredBy': 'Yashashree' },
  ];

  constructor(private http: HttpClient) { }

  getFaqs(): FAQ[] {//Observable<FAQ[]> {
    return this.faqsList;
    // return this.http.get<FAQ[]>(`${this.endpoint}/faqs`);
  }

  loadCategories() {
    return [
        'Questions',
        'Scores/Evaluation',
        'Registration',
        'Others'
    ];
  }

  loadNames(): Name[] {
    return [
      { Category: 'Questions', 'Name': 'Yashashree' },
      { Category: 'Questions', 'Name': 'Kunal' },
      { Category: 'Others', 'Name': 'Himani' },
      { Category: 'Others', 'Name': 'Yllnore' },
      { Category: 'Others', 'Name': 'Sai' }
    ];
  }

  saveFaq(faq: FAQ): boolean { // Observable<boolean> {
    // return this.http.post<boolean>(`${this.endpoint}/faqs`, faq);
    const newId = this.faqsList[this.faqsList.length - 1].Id + 1;
    if (faq.Id === -1) {
      faq.Id = newId;
      this.faqsList.push(faq);
    } else {
      this.faqsList[this.faqsList.findIndex(oldFaq => oldFaq.Id === faq.Id)] = faq;
    }
    return true;
  }
}