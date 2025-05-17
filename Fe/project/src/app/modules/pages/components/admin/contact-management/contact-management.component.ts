import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/services/contact.service';



@Component({
  selector: 'app-contact-management',
  templateUrl: './contact-management.component.html',
  styleUrls: ['./contact-management.component.css']
})
export class ContactManagementComponent implements OnInit {
  contacts: Contact[] = [];
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
    private contactService: ContactService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.applyFilter(this.currentPage)
    this.contactUpdateForm = new FormGroup({
      id: new FormControl(''),
      content: new FormControl({ value: '', disabled: true }, Validators.required),
      dateSend: new FormControl(''),
      status: new FormControl(''),
      user: new FormControl(''),
    })

  }

  applyFilter(page: number): void {
    if (this.filterStatus === 'all') {
      this.contactService.getAllContact(page, this.pageSize).subscribe(
        (response: any) => {
          console.log(response);
          this.contacts = response.content;
          this.currentPage = response.pageable.pageNumber;
          this.totalPages = response.totalPages;
          this.pages = this.totalPages > 1;
          this.countPageCanShow();
          this.noRecord = this.contacts.length
        },
        (error) => console.error('Error loading blogs:', error)
      );
    } else if (this.filterStatus === 'approved') {
      this.contactService.getAllContactTrue(page, this.pageSize).subscribe(
        (response: any) => {
          this.contacts = response.content;
          this.currentPage = response.pageable.pageNumber;
          this.totalPages = response.totalPages;
          this.pages = this.totalPages > 1;
          this.countPageCanShow();
          this.noRecord = this.contacts.length
        },
        (error) => console.error('Error loading blogs:', error)
      );
    } else if (this.filterStatus === 'pending') {
      this.contactService.getAllContactFalse(page, this.pageSize).subscribe(
        (response: any) => {
          this.contacts = response.content;
          this.currentPage = response.pageable.pageNumber;
          this.totalPages = response.totalPages;
          this.pages = this.totalPages > 1;
          this.countPageCanShow();
          this.noRecord = this.contacts.length
        },
        (error) => console.error('Error loading blogs:', error)
      );
    }

  }

  onFilterChange(status: string): void {
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

  countPageCanShow() {
    const rangeStart = Math.max(0, this.currentPage - 2);
    const rangeEnd = Math.min(this.totalPages - 1, this.currentPage + 2);
    this.pageRange = Array(rangeEnd - rangeStart + 1).fill(0).map((x, i) => i + rangeStart);
  }

  getIdBlog(item) {
    this.contactUpdate = item
    this.contactUpdateForm.patchValue({
      id: this.contactUpdate.id,
      content: this.contactUpdate.content,
      dateSend: this.contactUpdate.dateSend,
      status: this.contactUpdate.status,
      user: this.contactUpdate.user,
    })
  }

  updateStatus() {
    console.log(this.contactUpdateForm.value.id);
    this.contactService.updateContact(this.contactUpdateForm.value.id, this.contactUpdateForm.value).subscribe(data => {
      this.toast.success('Chỉnh sửa thành công');
      this.ngOnInit();
    })
  }

  FormatStatusColor(status: number): string {
    if (status == 0) {
      return 'rgb(55,125,246)';
    } else if (status == 1) {
      return 'green';
    } else {
      return 'red';
    }
  }

  FormatStatus(status) {
    if (status == 0) {
      return "Chưa xử lý"
    } else if (status == 1) {
      return " Đã xử lý"
    } else {
      return "o Hủy bỏ"
    }
  }


}
