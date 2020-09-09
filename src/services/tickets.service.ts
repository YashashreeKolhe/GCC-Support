import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Name } from 'src/faqs/model';
import { Ticket, Category, Status } from 'src/tickets/model';

@Injectable()
export class TicketsService {
  endpoint: string = 'https://global-ta-challenge.herokuapp.com';

  notes: string[] = [
    "Note 1",
    "Note 2",
    "Note 3"
  ];

  // ticketsList: Ticket[] = [
  //   { 'TicketId': 1, 'Subject': 'Subject 1', 'SubmittedBy': 'Yllnore', 'Description': 'Who is eligible to register? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Answer': '', 'Category': Category.Questions, AssignedTo: 'Yllnore', Status: Status.Escalated, 'EscalatedTo': 'Himani', Notes: this.notes },
  //   { 'TicketId': 2, 'Subject': 'Subject 2', 'SubmittedBy': 'Yllnore Shehi', 'Description': 'How will be the difficulty level of the questions?', 'Answer': '', 'Category': Category.Registrations, AssignedTo: 'Kunal', Status: Status.Pending, Notes: this.notes },
  //   { 'TicketId': 3, 'Subject': 'Subject 3', 'SubmittedBy': 'Yllnore Shehi', 'Description': 'How will the scores be calculated? What all parameters will be taken into consideration?', 'Answer': '', 'Category': Category.Scores, AssignedTo: 'Yashashree', Status: Status.Resolved, Notes: this.notes },
  //   { 'TicketId': 4, 'Subject': 'Subject 4', 'SubmittedBy': 'Yllnore Shehi', 'Description': 'Shuld we use our own github repo or will it be assigned to us?', 'Answer': '', 'Category': Category.Unassigned, 'Status': Status.Unassigned, Notes: this.notes },
  // ];

  constructor(private http: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.endpoint}/tickets`);
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

  saveTicket(ticket: Ticket): Observable<boolean> {
    return this.http.post<boolean>(`${this.endpoint}/ticket/update`, ticket);
  }

  saveTicketNotes(ticketNotes: any) {
    this.notes.push(ticketNotes);
  }
}