import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtService } from 'src/app/services/jwt.service';
import { MeetingService } from 'src/app/services/meeting.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent {
  meetingCode: string = '';

  constructor(
    private meetingService: MeetingService,
    private router: Router,
    private toastr: ToastrService,
    private jwtService: JwtService
  ) { }

  ngOnInit() {
    this.Load();
  }

  createRoom() {
    this.meetingService.createRoom().subscribe((meeting) => {
      console.log('Meeting created:', meeting);
      this.router.navigate([`pages/components/meeting-room/${meeting.code}`]);
    });
  }

  joinMeeting() {
    try {
      const url = new URL(this.meetingCode.trim());
      window.location.href = url.href;
    } catch (err) {
      this.toastr.error('Đường link phòng không tồn tại!', 'Error');
    }
  }

  Load(){
    if(this.jwtService.verifyToken()){
      this.router.navigateByUrl("/pages/components/home-main");
    }
  }

}
