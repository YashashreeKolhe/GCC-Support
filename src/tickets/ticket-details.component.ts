import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ticket, Category, Status } from './model';
import { ToastrService } from 'ngx-toastr';
import { Name } from 'src/faqs/model';
import { TicketsService } from 'src/services/tickets.service';
import { CommonService } from 'src/services/common.service';

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
  statusValues: string[] = [ 'OPEN', 'IN_PROGRESS', 'ESCALATED', 'CLOSED' ];

  addNoteFlag: number = 0;
  newNote: string = '';

  constructor(
    private ticketService: TicketsService,
    private toastr: ToastrService,
    private commonService: CommonService) {}

  ngOnInit() {
    if (this.ticket === null) {
      this.ticket = this.initializeTicket();
    }
    this.categories = this.ticketService.loadCategories();
    this.names = this.commonService.loadNames();
  }

  initializeTicket(): Ticket {
    return {
      subject: '',
      description: '',
      answer: '',
      category: 'Others',
      submittedBy: 'Dummy',
      submittedDate: new Date(),
      escalatedTo: '',
      assignee: '',
      ticketStatus: 'OPEN',
      notes: []
    }
  }

  // onCategoryChanged() {
  //   this.names = this.commonService.loadNames().filter(name => name.Category === this.ticket.category);
  // }

  async onSaveTicket() {
    if (this.validateTicket()) {
      const result = await this.ticketService.saveTicket(this.ticket).toPromise();
      if (this.ticket.ticketStatus === 'CLOSED') {
        const result = await this.ticketService.updateTicketStatus(this.ticket.id, this.ticket.ticketStatus).toPromise();
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
