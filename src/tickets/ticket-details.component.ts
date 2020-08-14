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
  categories: string[] = [ 'Questions', 'Registrations', 'Scores', 'Unassigned' ];
  statusValues: string[] = [ 'Unassigned', 'Pending', 'Resolved', 'Escalated', 'Rejected' ];

  addNoteFlag: number = 0;
  newNote: string = '';

  constructor(
    private ticketService: TicketsService,
    private toastr: ToastrService,) {}

  ngOnInit() {
    if (this.ticket === null) {
      this.ticket = this.initializeTicket();
    } else {
      this.ticket.CategoryString = Category[this.ticket.Category];
      this.ticket.StatusString = Status[this.ticket.Status];
    }
    this.categories = this.ticketService.loadCategories();
    this.names = this.ticketService.loadNames();
  }

  initializeTicket(): Ticket {
    return {
      TicketId: -1,
      Subject: '',
      Description: '',
      Answer: '',
      Category: Category.Unassigned,
      CategoryString: Category[Category.Unassigned],
      SubmittedBy: 'Dummy',
      SubmittedDate: new Date(),
      EscalatedTo: '',
      AssignedTo: '',
      Status: Status.Unassigned,
      StatusString: Status[Status.Unassigned]
    }
  }

  onSaveTicket() {
    if (this.validateTicket()) {
      const result = this.ticketService.saveTicket(this.ticket);
      if (this.newNote.trim() !== '') {
        this.ticketService.saveTicketNotes(this.newNote);
      }
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
