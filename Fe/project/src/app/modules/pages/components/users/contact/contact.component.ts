import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Contact } from 'src/app/models/Contact';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  userfake = {
    "id": 3,
    "email": "charlie@example.com",
    "password": "hashedpwd3",
    "firstName": "Charlie",
    "lastName": "Johnson",
    "userName": "charliej",
    "avatar": null,
    "createAt": "2025-04-15T16:22:26",
    "roles": [
      {
        "id": 1,
        "roleName": "user"
      }
    ],
    "vip": false
  }

  contact: Contact[] = [];
  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.fb.group({
      content: ['', Validators.required],
      dateSend: [''],
      status: [false],
      userId: [this.userfake]
    });
  }



  onSubmit() {
    if (this.contactForm.valid) {
      const formValue = this.contactForm.value;
      console.log(formValue)
      this.contactService.addNewContact(formValue).subscribe(() => {
        alert('Thêm contact thành công');
        this.contactForm.reset();
      }, error => {
        console.error('Thêm contact lỗi', error);
        alert('Thêm contact lỗi');
      });
    }
  }

}
