import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participants } from '../models/Participants';
@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  private API_CONTACT = 'http://localhost:8080/api/participants'
  constructor(private http: HttpClient) { }
  addParticipant(userName: string, meetingCode: string) {
    const body = new URLSearchParams();
    body.set('userName', userName);
    body.set('meetingCode', meetingCode);

    return this.http.post('http://localhost:8080/api/participants', body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  getAllByUserId(userId: any, page: number, pageSize: number): Observable<Participants[]> {
    const list = `${this.API_CONTACT}/getAllByUserId?userId=${userId}&page=${page}&size=${pageSize}`;
    return this.http.get<Participants[]>(list)
  }

}
