import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators  } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
    userUpdate: any;
    userUpdateForm: FormGroup;
  usernameSearch: string = '';
  private searchSubject = new Subject<string>();

  constructor(
    private userService: UserService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
  this.applyFilter(this.currentPage)
  this.userUpdateForm = new FormGroup({
      id: new FormControl(''),
      status: new FormControl('')
      })
      this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(username => {
      if (username.trim() === '') {
        this.userService.getAllUser(0,this.pageSize); // hoặc reset danh sách
      } else {
        this.searchByUsername(username);
      }
    });
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
    } else if (this.filterStatus === 'active') {
      this.userService.getUserStatusFalse(page, this.pageSize).subscribe(
        (response: any) => {
          console.log("false: " + response.content)
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
  onFilterChange(status: string): void {
    this.filterStatus = status;
    this.applyFilter(this.currentPage); // Cập nhật danh sách bài viết hiển thị
  }
  countPageCanShow() {
    const rangeStart = Math.max(0, this.currentPage - 2);
    const rangeEnd = Math.min(this.totalPages - 1, this.currentPage + 2);
    this.pageRange = Array(rangeEnd - rangeStart + 1).fill(0).map((x, i) => i + rangeStart);
  }
  FilterChange(status: string): void {
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
  getIdUser(item) {
    this.userUpdate = item
    console.log("as"+this.userUpdate.status, this.userUpdate.id)
    this.userUpdateForm.patchValue({
      id: this.userUpdate.id,
      status: this.userUpdate.status,
    })
  }
  updateStatus() {
    console.log(this.userUpdateForm.value.id);
    this.userService.updateStatusUser(this.userUpdateForm.value.id).subscribe(data => {
      this.toast.success('Chỉnh sửa thành công');
      this.ngOnInit();
    })
  }

  // Hàm gọi API tìm kiếm theo username
  searchByUsername(username: string): void {
  this.userService.searchUserByUserName(username).subscribe(
    response => {
      this.users = [response]; // xử lý phù hợp
    },
    error => {
      this.users = [];
      console.error('User not found', error);
    }
  );
}

  // Hàm gọi khi người dùng nhập
  onUsernameInput() {
    this.searchSubject.next(this.usernameSearch);
  }

  FormatStatusColor(status: number): string {
    if (status == 0) {
      return 'green';
    } else if (status == 1) {
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
    if (status == 0) {
      return "Đang hoạt động"
    } else if (status == 1) {
      return " Bị khóa"
    }
  }
  FormatUpdateButton(status) {
    if (status == 0) {
      return "Khóa"
    } else if (status == 1) {
      return "Mở khóa"
    }
  }
  FormatIsVip(isVip) {
    if (isVip == 0) {
      return "Thường"
    } else if (isVip == 1) {
      return " VIP"
    }
  }

  getIdBlog(Item){

  }

}
