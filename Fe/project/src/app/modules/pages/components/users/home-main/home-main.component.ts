import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent{

  constructor(private meetingService: MeetingService, private router: Router) {}

  createRoom() {
    this.meetingService.createRoom().subscribe((meeting) => {
      console.log('Meeting created:', meeting);
      this.router.navigate([`pages/components/meeting-room/${meeting.code}`]);
    });
  }

  

}
