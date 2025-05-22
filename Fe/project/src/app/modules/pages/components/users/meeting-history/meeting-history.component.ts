import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from 'src/app/services/participants.service';
import { UserService } from '../../../../../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MeetingRecordService } from 'src/app/services/meeting-record.service';
import { ToastrService } from 'ngx-toastr';
import * as RecordRTC from 'recordrtc';
import { Meeting } from '../../../../../models/Meeting';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-meeting-history',
  templateUrl: './meeting-history.component.html',
  styleUrls: ['./meeting-history.component.css']
})
export class MeetingHistoryComponent implements OnInit {
  currentPage = 0;
  totalPages = 0; totalElements = 0;
  pageSize = 5;
  noRecord: any;
  userId: any
  lists: any[] = [];
  pageRange: number[] = [];
  date: string;
  name: string;
  firstTimeSearch = false;
  pages: boolean = false;
  form: FormGroup;
  formRecord: FormGroup;
  recordUpdate: any;
  selectedFile: File | null = null;
  meetId: any;
  meetFile: any=null;
  private recorder: RecordRTC | null = null;



  constructor(
    private recordSer: MeetingRecordService,
    private service: ParticipantsService,
    private toast: ToastrService,
    private userService: UserService,
  ) {
    this.form = new FormGroup({
      joinAt: new FormControl(''),
      leftAt: new FormControl(''),
      meeting: new FormControl(''),
    })

    this.formRecord = new FormGroup({
      recordUrl: new FormControl(''),
      meetingId: new FormControl(''),
    })


  }

  ngOnInit(): void {
    this.userService.getByUserName().subscribe(data => {
      this.userId = data;
      this.loadData(this.currentPage);
    });


  }

  getIdBlog(item) {
    this.recordUpdate = item
    this.meetId = item.meeting.id;
    this.meetFile = null;
    this.form.patchValue({
      joinAt: this.recordUpdate.joinAt,
      leftAt: this.recordUpdate.leftAt,
      meeting: this.recordUpdate.meeting,
    })
    this.formRecord.patchValue({
      meetingId: this.recordUpdate.meeting.id,
    })
    this.recordSer.findByMeetingId(this.meetId).subscribe((data: any) => {
      if (data.recordUrl != null) {
        this.meetFile = data.recordUrl;
      }
    })
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.meetFile = file.name;
    }
  }

  onSubmit(): void {
    console.log("RECORD:" + this.formRecord.value.recordUrl, this.formRecord.value.meetingId);
    this.recordSer.addNewRecord(this.formRecord.value).subscribe((data: any) => {
      this.toast.success("Đã up file record thành công");
      window.location.reload();

    })


  }


  downloadFile() {
    if (this.meetFile) {
      const link = document.createElement('a');
      link.href = this.meetFile;
      link.download = ''; // Tên file sẽ được lấy từ URL hoặc bạn có thể chỉ định tên
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('Không có file để tải');
    }
  }


  summarizeByAI(): void {

  }




  loadData(page: number): void {
    this.service.getAllByUserId(this.userId.id, page, this.pageSize).subscribe((response: any) => {
      this.lists = response.content;
      this.currentPage = response.pageable.pageNumber;
      this.totalPages = response.totalPages;
      this.pages = this.totalPages > 1;
      this.countPageCanShow();
      this.noRecord = this.lists.length === 0;
    }, error => {
      this.noRecord = error.status === 404;
      this.lists = [];
      this.pageRange = [];
    });
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.loadData(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadData(this.currentPage + 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadData(page);
    }
  }

  countPageCanShow(): void {
    const rangeStart = Math.max(0, this.currentPage - 2);
    const rangeEnd = Math.min(this.totalPages - 1, this.currentPage + 2);
    this.pageRange = Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => i + rangeStart);
  }
}

