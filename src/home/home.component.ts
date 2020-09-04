import { Component } from '@angular/core';
import { GcchomeService } from 'src/services/gcc-home.service';
import { TicketsService } from 'src/services/tickets.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  quickfacts;
  topScorer : string;
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

  constructor(private homeService : GcchomeService,
    private ticketService: TicketsService){
  }

  async ngOnInit(){
    this.getQuickFacts();
    const scores = await this.homeService.getScores().toPromise();
    this.topScorer = scores[0].name;
    this.highestScore = scores[0].total;
    const participants = await this.homeService.getParticipants().toPromise();
    this.totalParticipants = participants.length;
    const tickets = await this.ticketService.getTickets().toPromise();
    this.openTickets = tickets.filter(ticket => ticket.ticketStatus === 'OPEN').length;
    this.inProgressTickets = tickets.filter(ticket => ticket.ticketStatus === 'IN_PROGRESS').length;
    this.escalatedTickets = tickets.filter(ticket => ticket.ticketStatus === 'ESCALATED').length;
    this.closedTickets = tickets.filter(ticket => ticket.ticketStatus === 'CLOSED').length;

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
  }

  getQuickFacts(){
    this.homeService.getTopScorer().subscribe((response : any) => {
      console.log(response);
      this.topScorer= response.leadingIndividual;
    });
  }
}
