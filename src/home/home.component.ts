import { Component } from '@angular/core';
import { GcchomeService } from 'src/services/gcc-home.service';
import { TicketsService } from 'src/services/tickets.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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

  endDate: string = '2020-11-04T13:00:00';

  config: any;

  constructor(private homeService : GcchomeService,
    private ticketService: TicketsService){
  }

  async ngOnInit(){
    const scores = await this.homeService.getScores().toPromise();
    this.topScorer = scores[0].name;
    this.highestScore = scores.filter(contestant => contestant.contestantId === scores[0].contestantId).map(x => x.total).reduce((a, b) => a + b);;
    const participants = await this.homeService.getParticipants().toPromise();
    this.totalParticipants = participants.length;
    const tickets = await this.ticketService.getTickets().toPromise();
    this.openTickets = tickets.filter(ticket => ticket.ticketStatus === 'OPEN').length;
    this.inProgressTickets = tickets.filter(ticket => ticket.ticketStatus === 'IN_PROGRESS').length;
    this.escalatedTickets = tickets.filter(ticket => ticket.ticketStatus === 'ESCALATED').length;
    this.closedTickets = tickets.filter(ticket => ticket.ticketStatus === 'CLOSED').length;
    this.config = { leftTime: this.calculateDiff(this.endDate), format: 'd : h : m : s' }
    
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

  calculateDiff(dateSent){
    var t1 = new Date();
    var t2 = new Date(dateSent);
    var dif = t1.getTime() - t2.getTime();

    var Seconds_from_T1_to_T2 = dif / 1000;
    return Math.abs(Seconds_from_T1_to_T2);
  }
}
