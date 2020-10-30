import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alert } from 'src/alerts/alert-model';

@Injectable()
export class AlertsService {
  endpoint: string = 'https://gcc-global-dev.herokuapp.com';
  
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('gcc2020monitoring:gcc-2020-monitoring-123')
    })
  };

  adminHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('gcc2020admin:gcc-2020-admin-456')
    })
  };


  setAlert(alert: Alert): Observable<Alert> {
    return this.http.post<Alert>(`${this.endpoint}/challenge/setAlert`, alert, this.httpOptions);
  }

  updateAlert(alert: Alert): Observable<Alert> {
    return this.http.post<Alert>(`${this.endpoint}/challenge/setAlert`, alert, this.httpOptions);
  }

  getAlertsForWebapp(): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.endpoint}/challenge/getAlert/webapp`, this.httpOptions);
  }

  getAlertsForMobile(): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.endpoint}/challenge/getAlert/mobile`, this.httpOptions);
  }

  turnOffActiveAlerts(): Observable<boolean> {
    return this.http.get<boolean>(`${this.endpoint}/challenge/turnActiveAlertOff`, this.httpOptions);
  }

  turnOffActiveAlert(client: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.endpoint}/challenge/turnActiveAlertOff/{client}?client=${client}`, this.httpOptions);
  }

  setUniversityForContestant(contestantId: string, universityName: string) {
    return this.http.get<boolean>(`${this.endpoint}/updateContestant/${contestantId}/${universityName}`, this.adminHttpOptions);
  }

  setUniversityForRegion(universityName: string, region: string) {
    return this.http.post<any>(`${this.endpoint}/team/${region}/add`, [universityName], this.adminHttpOptions);
  }

  setRegionForContestant(contestantId: string, region: string) {
    return this.http.get<boolean>(`${this.endpoint}/contestant/editRegion/${contestantId}/${region}`, this.adminHttpOptions);
  }

  getContestantDetails(id: string) {
    return this.http.get(`${this.endpoint}/contestant/${id}`, this.adminHttpOptions);
  }
}

