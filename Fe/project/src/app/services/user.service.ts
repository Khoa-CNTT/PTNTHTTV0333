import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:8080/api/user/';

  constructor(private http: HttpClient) { }

  getMonthlyUserRegistrations(year: number): Observable<any> {
    return this.http.get(this.API_URL+ 'monthly-registrations/' + year);
  }
}
