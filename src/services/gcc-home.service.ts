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
  endpoint: string = ' https://gcc-global.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  adminHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('gcc2020admin:gcc-2020-admin-456')
    })
  };

  getParticipants(): Observable<Participant[]> {
    return this.httpClient.get<Participant[]>(`${this.endpoint}/challenge/getAll`, this.adminHttpOptions);
  }

  
  getTopScorer(): Observable<any> {
    return this.httpClient.get<any>(`${this.endpoint}/leaderboard/GLOBAL?from=0&limit=1`, this.adminHttpOptions);
  }



  getGlobalStats() : Observable<any> {
    return this.httpClient.get(`${this.endpoint}/leaderboard/globalTotals`, this.adminHttpOptions);
  }

  getScores(): Observable<LIST[]> {
    return this.httpClient.get<LIST[]>(`${this.endpoint}/scores/question/all/GLOBAL`, this.adminHttpOptions);
  }

  getBasicDetails() {
    return this.httpClient.get<any>(`${this.endpoint}/facts/quick/GLOBAL`, this.adminHttpOptions);
  }

  getRegionFacts() {
    return this.httpClient.get<any>(`${this.endpoint}/facts/quick/unified`, this.adminHttpOptions);
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
    return this.httpClient.get<string>(`${this.endpoint}/challenge/getStartDate`, this.adminHttpOptions);
  }

  getChallengeEndDate(): Observable<any> {
    return this.httpClient.get(`${this.endpoint}/challenge/getEndDate`, this.adminHttpOptions);
  }
}
