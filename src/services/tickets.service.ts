import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Name } from 'src/faqs/model';
import { Ticket, Category, Status } from 'src/tickets/model';

@Injectable()
export class TicketsService {
  endpoint: string = 'https://gcc-global-dev.herokuapp.com';

  notes: string[] = [
    "Note 1",
    "Note 2",
    "Note 3"
  ];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('gcc2020monitoring:gcc-2020-monitoring-123')
    })
  };

  constructor(private http: HttpClient) { }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.endpoint}/tickets`, this.httpOptions);
  }

  loadCategories() {
    return [
      'Questions',
      'Scores/Evaluation',
      'Submissions',
      'Registrations',
      'Others'
    ];
  }

  saveTicket(ticket: Ticket): Observable<boolean> {
    return this.http.post<boolean>(`${this.endpoint}/ticket/update`, ticket, this.httpOptions);
  }

  updateTicketStatus(ticketId: number, ticketStatus: string): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.endpoint}/ticket/updateStatus/${ticketId}/${ticketStatus}`, { id: ticketId, note: "", status: ticketStatus }, this.httpOptions);
  }
}