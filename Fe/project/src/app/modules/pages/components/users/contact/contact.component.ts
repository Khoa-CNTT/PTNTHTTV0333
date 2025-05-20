import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Contact } from 'src/app/models/Contact';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { JwtService } from 'src/app/services/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  isLoading = false;
  contact: Contact[] = [];
  contactForm!: FormGroup;
  userId = null

  constructor(
    private jwtService: JwtService,
    private userSer: UserService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.userSer.getByUserName().subscribe(data => {
      this.userId = data;
      this.contactForm.patchValue({
        user: this.userId
      });
    });
    this.initForm();

  }
  initForm() {
    this.contactForm = this.fb.group({
      content: ['', Validators.required],
      dateSend: [''],
      status: [false],
      user: []
    });
  }



  onSubmit() {
    this.isLoading = true;
    if (this.contactForm.value.user.firstName == null || this.contactForm.value.user.lastName == null || this.contactForm.value.user.phone == null) {
      this.isLoading = false;
      this.toast.error('Vui lòng cập nhập đầy đủ thông tin cá nhân của bạn');
      return;
    } else {
      if (this.contactForm.valid) {
        const formValue = this.contactForm.value;
        this.contactService.addNewContact(formValue).subscribe(() => {
          this.isLoading = false;
          this.toast.success('Cảm ơn bạn đã liên hệ với chúng tôi');
          this.contactForm.reset();
        }, error => {
          this.toast.error('Hiện đang lỗi');
        });
      } else {
        this.isLoading = false;
        this.toast.error('Vui lòng nhập đầy đủ thông tin');
      }
    }

  }

}
