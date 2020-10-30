import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from 'src/participants/model';
import { LIST } from 'src/score/score-model';
import * as moment from 'moment';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GcchomeService {
  endpoint: string = ' https://gcc-global-dev.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  getParticipants(): Observable<Participant[]> {
    return this.httpClient.get<Participant[]>(`${this.endpoint}/challenge/getAll`);
  }

   // ping a get API to get the highest score of the challenge

  getHighestScore() {
  }

  // ping a get API to get the top scorer of the challenge
  
  getTopScorer(): Observable<any> {
    return this.httpClient.get<any>(`${this.endpoint}/leaderboard/GLOBAL?from=0&limit=1`);
  }

  getGlobalStats() : Observable<any> {
    return this.httpClient.get(`${this.endpoint}/leaderboard/globalTotals`);
  }

  getScores(): Observable<LIST[]> {
    return this.httpClient.get<LIST[]>(`${this.endpoint}/scores/question/all/GLOBAL`);
  }

  timeLeftDays : number = 0;
  timeLeftHours: number = 0;
  timeLeftMinutes : number = 0;

  endDay : number = 14;
  presentDay : string ;
  endHrs : number = 13;
  presentHrs : string;
  endMinutes : number = 60;
  presentMinutes : string;

  today = new Date();
  todaysDataTime : String;

  getChallengeTimerMinutes(){
    this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy HH:mm:ss', 'en-US', 'GMT');
    this.presentMinutes = this.todaysDataTime.slice(14,16);
    this.timeLeftMinutes = this.endMinutes - parseInt(this.presentMinutes);
    return Math.abs(this.timeLeftMinutes);
  }

  getChallengeTimerHrs(){
     if(this.timeLeftMinutes>0){
      this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy HH:mm:ss ', 'en-US', 'GMT');
      this.presentHrs = this.todaysDataTime.slice(11,13);
      if(parseInt(this.presentHrs)<this.endHrs){
      this.timeLeftHours = this.endHrs - parseInt(this.presentHrs) - 1;  
      }
      else{
      this.timeLeftHours = 24 - this.endHrs - parseInt(this.presentHrs) - 1;  
      }

     }
     else{
      this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy HH:mm:ss ', 'en-US', 'GMT');
      this.presentHrs = this.todaysDataTime.slice(11,13);
      if(parseInt(this.presentHrs)<this.endHrs){
        this.timeLeftHours = this.endHrs - parseInt(this.presentHrs);  
        }
        else{
        this.timeLeftHours = 24 - this.endHrs - parseInt(this.presentHrs);  
        }
     }   
    return Math.abs(this.timeLeftHours);

  }

  getChallengeTimerDays(){
    
      this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy HH:mm:ss ', 'en-US', 'GMT');
      this.presentDay = this.todaysDataTime.slice(0,2);
      if(parseInt(this.presentHrs)>=14){
        this.timeLeftDays = this.endDay - parseInt(this.presentDay) - 1;     
      }
      else{
        this.timeLeftDays = this.endDay - parseInt(this.presentDay) ;     
      }
    return Math.abs(this.timeLeftDays);

  }

  getChallengeStartDate() {
    return this.httpClient.get<string>(`${this.endpoint}/challenge/getStartDate`);
  }

  getChallengeEndDate(): Observable<any> {
    return this.httpClient.get(`${this.endpoint}/challenge/getEndDate`);
  }
}
