import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ScheduleDto } from 'src/app/models/DTO/ScheduleDto';
import { JwtService } from 'src/app/services/jwt.service';
import { MeetingService } from 'src/app/services/meeting.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent {
  meetingCode: string = '';
  hostId: any
  scheduleForm: FormGroup;
  creatingForm: FormGroup
  scheduleDto: ScheduleDto = null;
  constructor(
    private meetingService: MeetingService,
    private router: Router,
    private toastr: ToastrService,
    private userSer: UserService,
    private jwtService: JwtService,
    private scheduleService: ScheduleService
  ) {
    this.scheduleForm = new FormGroup({
      title: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      createAt: new FormControl('',[Validators.required])
    })
   }

   validation_messages = {
    title:[
      { type: 'required', message: 'Vui lòng nhập tiều đề cuộc họp.' }
    ],
    email: [
      { type: 'required', message: 'Vui lòng nhập email.' }
    ],
    createAt:[
      { type: 'required', message: 'Vui lòng chọn ngày tháng.' }
    ] 
  }

  ngOnInit() {
    this.Load();

    this.creatingForm = new FormGroup({
      title: new FormControl('', Validators.required),
    })
  }

  createRoom() {
  this.userSer.getByUserName().subscribe((user) => {
    this.hostId = user.id;
    const title = this.creatingForm.get('title')?.value;

    this.meetingService.createRoom(this.hostId, title).subscribe((meeting) => {
      this.router.navigate([`pages/components/meeting-room/${meeting.code}`]);
    }, (error) => {
      this.toastr.error('Không thể tạo phòng họp!', 'Error');
    });
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

  Load() {
    if (this.jwtService.verifyToken()) {
      this.router.navigateByUrl("/pages/components/home-main");
    }
  }

  submitSchedule(){
    this.scheduleDto = this.scheduleForm.value;
    this.scheduleDto.userName = localStorage.getItem("Name_key") || '';
    this.scheduleService.submit(this.scheduleDto).subscribe(
      next => {
        this.toastr.success(next.message);
        this.scheduleForm.reset();
      }
    )
  }

}
