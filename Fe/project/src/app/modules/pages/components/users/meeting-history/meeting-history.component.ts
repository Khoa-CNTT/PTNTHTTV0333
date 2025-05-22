import { Component, OnInit } from '@angular/core';
import { ParticipantsService } from 'src/app/services/participants.service';
import { UserService } from '../../../../../services/user.service';

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

  constructor(
    private service: ParticipantsService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getByUserName().subscribe(data => {
      this.userId = data;
      this.loadData(this.currentPage);
    });
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

