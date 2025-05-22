import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private API_URL = 'http://localhost:8080/api/schedule/';
  private httpOptions: any;
    constructor(private httpClient: HttpClient, private router: Router) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        'Access-Control-Allow-Origin': 'http://localhost:4200/',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
      };
    }

  submit(schedule: any, email:string): Observable<any> {
      return this.httpClient.post<any>(this.API_URL + "submit/" + email, schedule, this.httpOptions);
  }
}
