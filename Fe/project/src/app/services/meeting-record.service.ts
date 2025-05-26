import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeetingRecordService {
  private API_MEETING_RECORD = 'http://localhost:8080/api/meetingRecord/';

  constructor(private http: HttpClient) { }

  findByMeetingId(meetingId: any) {
    console.log(this.API_MEETING_RECORD + meetingId);
    return this.http.get(this.API_MEETING_RECORD + meetingId);
  }

  addNewRecord(record: any) {
    return this.http.post(this.API_MEETING_RECORD, record);
  }
}
