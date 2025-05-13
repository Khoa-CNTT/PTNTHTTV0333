import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Contact } from 'src/app/models/Contact';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { JwtService } from 'src/app/services/jwt.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: Contact[] = [];
  contactForm!: FormGroup;
  user = null

  constructor(
    private jwtService: JwtService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.user = this.jwtService.getName();
    this.contactForm = this.fb.group({
      content: ['', Validators.required],
      dateSend: [''],
      status: [false],
      userId: [this.user]
    });
  }



  onSubmit() {
    if (this.contactForm.valid) {
      const formValue = this.contactForm.value;
      console.log(formValue)
      this.contactService.addNewContact(formValue).subscribe(() => {
        this.toast.success('Cảm ơn bạn đã liên hệ với chúng tôi');
        this.contactForm.reset();
      }, error => {
        console.error('Thêm contact lỗi', error);
        this.toast.error('Hiện đang lỗi');
      });
    }
  }

}
