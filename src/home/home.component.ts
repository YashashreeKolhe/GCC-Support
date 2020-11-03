import { Component } from '@angular/core';
import { GcchomeService } from 'src/services/gcc-home.service';
import { TicketsService } from 'src/services/tickets.service';
import { Ticket } from 'src/tickets/model';
import { Facts } from 'src/home/facts.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  highestScoreNew: number;
  topScorerNew: string;
  topScorerRegionNew: string;
  totalParticipantsNew: number;

  AMCTopScorer: string;
  EUROPETopScorer: string;
  INDIATopScorer: string;
  ROWTopScorer: string;
  SEATopScorer: string;
  SWISTopScorer: string;
  UKTopScorer: string;

  AMCTopUniv: string;
  EUROPETopUniv: string;
  INDIATopUniv: string;
  ROWTopUniv: string;
  SEATopUniv: string;
  SWISTopUniv: string;
  UKTopUniv: string;

  facts: Facts[];

  openTickets: number;
  inProgressTickets: number;
  closedTickets: number;

  endDate: string = '2020-11-09T13:00:00';

  config: any;

  currentDate: Date;

  tickets: Ticket[];
  pendingTicketsNumber : number = 0;
  pendingTickets: Ticket[]; 
  validTickets: Ticket[];
  pendingTicketsSubmittedBy: String[];
  pendingTicketsSubmittedByShort: String[];
  isTicketPendingHtml: Boolean;

  constructor(private homeService : GcchomeService,
    private ticketService: TicketsService){
  }

  async ngOnInit(){
    this.currentDate = new Date();
    this.tickets = await this.ticketService.getTickets().toPromise();
    this.validTickets = this.tickets.filter(ticket => this.isTicketValid(ticket.timestamp));
    this.pendingTickets = this.validTickets.filter(ticket => ticket.ticketStatus === 'OPEN').filter(ticket => this.isTicketPending(ticket));
    this.pendingTicketsSubmittedBy = this.pendTicketsSubmittedBy();
    this.pendingTicketsSubmittedByShort = this.pendingTicketsSubmittedBy.slice(1,11);
    this.pendingTicketsNumber = this.pendingTickets.length;
    this.openTickets = this.validTickets.filter(ticket => ticket.ticketStatus === 'OPEN').length;
    this.inProgressTickets = this.validTickets.filter(ticket => ticket.ticketStatus === 'IN_PROGRESS').length;  
    this.closedTickets = this.validTickets.filter(ticket => ticket.ticketStatus === 'CLOSED').length;
    this.config = { leftTime: this.calculateDiff(this.endDate), format: 'd : h : m : s' };

    const facts = await this.homeService.getRegionFacts().toPromise() as Facts;

    this.topScorerNew = facts.GLOBAL.leadingIndividual;
    this.highestScoreNew = facts.GLOBAL.highestScore;
    this.totalParticipantsNew = facts.GLOBAL.numberOfContestants;

    this.AMCTopScorer = facts.AMC.leadingIndividual;
    this.EUROPETopScorer = facts.EUROPE.leadingIndividual;
    this.INDIATopScorer = facts.INDIA.leadingIndividual;
    this.ROWTopScorer = facts.ROW.leadingIndividual;
    this.SEATopScorer = facts.SEA.leadingIndividual;
    this.SWISTopScorer = facts.SWIS.leadingIndividual;
    this.UKTopScorer = facts.UK.leadingIndividual;

    this.AMCTopUniv = facts.AMC.leadingTeam;
    this.EUROPETopUniv = facts.EUROPE.leadingTeam;
    this.INDIATopUniv = facts.INDIA.leadingTeam;
    this.ROWTopUniv = facts.ROW.leadingTeam;
    this.SEATopUniv = facts.SEA.leadingTeam;
    this.SWISTopUniv = facts.SWIS.leadingTeam;
    this.UKTopUniv = facts.UK.leadingTeam;   
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

  isTicketPending(ticket : Ticket){
    if(!(ticket.description.includes('university') || ticket.description.includes('University'))){
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

  isTicketValid(dateSent){
    var d1 = new Date();
    d1.setFullYear(2020, 9, 23);
    d1.setHours(0, 0, 0, 0);
    var d2 = new Date(dateSent);
    return d2>=d1;
  }

  pendTicketsSubmittedBy(){
    if(this.pendingTickets.length>0) {
      this.isTicketPendingHtml = true;
      return this.pendingTickets.map(ticket => ticket.submittedBy);      
  }
    return null;
  } 

}
