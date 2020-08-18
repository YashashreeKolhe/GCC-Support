import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ticket, Category, Status } from './model';
import { ToastrService } from 'ngx-toastr';
import { Name } from 'src/faqs/model';
import { TicketsService } from 'src/services/tickets.service';

@Component({
  selector: 'ticket-details',
  templateUrl: './ticket-details.component.html',
})
export class  TicketDetailsComponent {
  @Input() ticket: Ticket;
  @Input() mode: number;
  @Output() exit: EventEmitter<void> = new EventEmitter<void>();
  @Output() save: EventEmitter<void> = new EventEmitter<void>();

  names: Name[];
  nameStore: Name[];
  categories: string[] = [ 'Questions', 'Registration', 'Scores/Evaluation', 'Unassigned' ];
  statusValues: string[] = [ 'OPEN', 'IN_PROGRESS', 'ESCALATED', 'RESOLVED' ];

  addNoteFlag: number = 0;
  newNote: string = '';

  constructor(
    private ticketService: TicketsService,
    private toastr: ToastrService,) {}

  ngOnInit() {
    if (this.ticket === null) {
      this.ticket = this.initializeTicket();
    }
    this.categories = this.ticketService.loadCategories();
    this.names = this.ticketService.loadNames();
  }

  initializeTicket(): Ticket {
    return {
      subject: '',
      description: '',
      answer: '',
      category: 'Unassigned',
      submittedBy: 'Dummy',
      submittedDate: new Date(),
      escalatedTo: '',
      assignee: '',
      ticketStatus: 'OPEN',
      notes: []
    }
  }

  async onSaveTicket() {
    if (this.validateTicket()) {
      const result = await this.ticketService.saveTicket(this.ticket).toPromise();
      this.toastr.success('Ticket saved successfully', 'Success');
      this.save.emit();
    } else {
      this.toastr.error('Please fill all the fields!', 'Error');
    }
  }

  validateTicket() {
    return true;
  }
}
