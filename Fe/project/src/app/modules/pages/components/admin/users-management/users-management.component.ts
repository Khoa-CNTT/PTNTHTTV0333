import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {
    users: User[] = [];
    currentPage: number = 0;
    totalPages: number = 0;
    pageSize: number = 10;
    pages: boolean = false;
    pageRange: number[] = [];
    noRecord: number;
    filterStatus: string = 'all';
    contactUpdate: any;
    contactUpdateForm: FormGroup;

  constructor(
    private userService: UserService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
  this.applyFilter(this.currentPage)
  }
  applyFilter(page: number): void {
    if (this.filterStatus === 'all') {
      this.userService.getAllUser(page, this.pageSize).subscribe(
        (response: any) => {
          console.log(response);
          this.users = response.content;
          this.currentPage = response.pageable.pageNumber;
          this.totalPages = response.totalPages;
          this.pages = this.totalPages > 1;
          this.countPageCanShow();
          this.noRecord = this.users.length
        },
        (error) => console.error('Error loading Users:', error)
      );
    } else if (this.filterStatus === 'Active') {
      this.userService.getUserStatusTrue(page, this.pageSize).subscribe(
        (response: any) => {
          this.users = response.content;
          this.currentPage = response.pageable.pageNumber;
          this.totalPages = response.totalPages;
          this.pages = this.totalPages > 1;
          this.countPageCanShow();
          this.noRecord = this.users.length
        },
        (error) => console.error('Error loading Users:', error)
      );
    } else if (this.filterStatus === 'Banned') {
      this.userService.getUserStatusFalse(page, this.pageSize).subscribe(
        (response: any) => {
          this.users = response.content;
          this.currentPage = response.pageable.pageNumber;
          this.totalPages = response.totalPages;
          this.pages = this.totalPages > 1;
          this.countPageCanShow();
          this.noRecord = this.users.length
        },
        (error) => console.error('Error loading Users:', error)
      );
    }

  }
  countPageCanShow() {
    const rangeStart = Math.max(0, this.currentPage - 2);
    const rangeEnd = Math.min(this.totalPages - 1, this.currentPage + 2);
    this.pageRange = Array(rangeEnd - rangeStart + 1).fill(0).map((x, i) => i + rangeStart);
  }
  nFilterChange(status: string): void {
    this.filterStatus = status;
    this.applyFilter(this.currentPage); // Cập nhật danh sách bài viết hiển thị
  }


  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.applyFilter(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.applyFilter(this.currentPage);
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.applyFilter(this.currentPage);

    }
  }

  FormatStatusColor(status: number): string {
    if (status == 1) {
      return 'green';
    } else if (status == 0) {
      return 'red';
    } else {
      return 'red';
    }
  }
  
  FormatIsVipColor(isVip: number): string {
    if (isVip == 0) {
      return 'black';
    } else if (isVip == 1) {
      return 'red';
    } 
  }

  FormatStatus(status) {
    if (status == 1) {
      return "Đang hoạt động"
    } else if (status == 0) {
      return " Bị khóa"
    } 
  }
  FormatIsVip(isVip) {
    if (isVip == 0) {
      return "Thường"
    } else if (isVip == 1) {
      return " VIP"
    } 
  }

}
