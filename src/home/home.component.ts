import { Component } from '@angular/core';
import { GcchomeService } from 'src/services/gcc-home.service';
import { TicketsService } from 'src/services/tickets.service';
import { Ticket } from 'src/tickets/model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  topScorer : string;
  topScorerRegion : string;
  highestScore : number;
  totalParticipants: number;

  openTickets: number;
  inProgressTickets: number;
  escalatedTickets: number;
  closedTickets: number;

  UKScore: number = 0;
  SWISScore: number = 0;
  AMCScore: number = 0;
  ROWScore: number = 0;
  INDIAScore: number = 0;
  SEAScore: number = 0;
  EUROPEScore: number = 0;

  endDate: string = '2020-11-09T13:00:00';

  config: any;

  currentDate: Date;
  pendingTicketsNumber : number = 0;
  pendingTickets: Ticket[];
  pendingTicketsSubmittedBy: String[];

  constructor(private homeService : GcchomeService,
    private ticketService: TicketsService){
  }

  async ngOnInit(){
    this.currentDate = new Date();
    const participants = await this.homeService.getParticipants().toPromise();
    this.totalParticipants = participants.length;
    const tickets = await this.ticketService.getTickets().toPromise();
    this.openTickets = tickets.filter(ticket => ticket.ticketStatus === 'OPEN').length;
    this.inProgressTickets = tickets.filter(ticket => ticket.ticketStatus === 'IN_PROGRESS').length;
    this.escalatedTickets = tickets.filter(ticket => ticket.ticketStatus === 'ESCALATED').length;
    this.closedTickets = tickets.filter(ticket => ticket.ticketStatus === 'CLOSED').length;
    this.config = { leftTime: this.calculateDiff(this.endDate), format: 'd : h : m : s' };
    // this.pendingTickets = tickets.filter(ticket => this.isTicketPending(ticket));
    // this.pendingTicketsNumber = this.pendingTickets.length;
    // this.pendingTicketsSubmittedBy = this.pendTicketsSubmittedBy();
    const scores = await this.homeService.getTopScorer().toPromise();
    if (scores.contestants !== null && scores.contestants.length !== 0) {
      this.topScorer = scores.contestants[0].name;
      this.topScorerRegion = scores.contestants[0].region;
      this.highestScore = scores.contestants[0].total;
    }
    try {
      const globalStats = await this.homeService.getGlobalStats().toPromise();
      Object.keys(globalStats).forEach(region => {
        if (region === 'AMC') {
          this.AMCScore = globalStats[region];
        }
        if (region === 'EUROPE') {
          this.EUROPEScore = globalStats[region];
        }
        if (region === 'INDIA') {
          this.INDIAScore = globalStats[region];
        }
        if (region === 'ROW') {
          this.ROWScore = globalStats[region];
        }
        if (region === 'SEA') {
          this.SEAScore = globalStats[region];
        }
        if (region === 'SWIS') {
          this.SWISScore = globalStats[region];
        }
        if (region === 'UK') {
          this.UKScore = globalStats[region];
        }
      });
    } catch (error) {
      
    }
  }

  calculateDiff(dateSent){
    var t1 = new Date();
    var t2 = new Date(dateSent);
    var dif = t1.getTime() - t2.getTime();

    var Seconds_from_T1_to_T2 = dif / 1000;
    return Math.abs(Seconds_from_T1_to_T2);
  }

  calculateDayDifferenceForOpenTickets(ticket, dateSent){
    if(ticket.ticketStatus === 'OPEN') {
      var t1 = new Date();
      var t2 = new Date(dateSent);
      var timeDiff = Math.abs(t1.getTime() - t2.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return diffDays;
    }
    return 0;
  }

  isTicketPending(ticket){
    if(ticket.ticketStatus === 'OPEN') {
      var t1 = new Date();
      var t2 = new Date(ticket.timestamp);
      var timeDiff = Math.abs(t1.getTime() - t2.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if(diffDays>=2){
        return true;
      }
    }
    return false;
  }

  pendTicketsSubmittedBy(){
    if(this.pendingTickets.length>0) {
      return this.pendingTickets.map(ticket => ticket.submittedBy);      
  }
    return null;
}
}
