import { Component, OnInit } from '@angular/core';
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
  size: number = 5;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    interface ContactPage {
      content: Contact[];
      totalPages: number;
      totalElements: number;
      size: number;
      number: number;}
   
  
    this.contactService.getPageContact(this.currentPage, this.size).subscribe({
      next: (data: ContactPage) => {
        this.contacts = data.content;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        console.error('Lỗi khi tải dữ liệu:', err);
      }
    });
  }

  nextPage(): void {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.loadContacts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadContacts();
    }
  }


}
