import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = 'http://localhost:8080/api';
  private chatApiUrl = 'http://localhost:8080/api/chat';

  constructor(private http: HttpClient) { }

  createRoom(hostId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/meetings`, { hostId });
  }

  getRoom(roomId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${roomId}`);
  }

  joinRoom(roomId: string, participantId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${roomId}/join`, { userId: participantId }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getChatHistory(roomId: string): Observable<any> {
    return this.http.get(`${this.chatApiUrl}/${roomId}`);
  }
}
