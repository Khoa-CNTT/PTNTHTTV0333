import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  isLoading = false;
  resetForm: FormGroup;
  constructor(private userService: UserService, private toast: ToastrService, private router: Router) {
    this.resetForm = new FormGroup({
      newPassword: new FormControl('', [
              Validators.required,
              Validators.minLength(8),
              Validators.pattern(/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]+$/) 
            ]),
      rePassword: new FormControl()
    })
  }
  validation_messages = {
    newPassword:[
      { type: 'required', message: 'Vui lòng nhập mật khẩu.' },
      { type: 'pattern', message: 'Mật khẩu chứa chữ thường, chữ số và trên 8 ký tự (vd: abcd123456).' }
    ]
  }

  ngOnInit(): void {
  }

  submitReset(){
    this.isLoading = true;
    const newPass = this.resetForm.get('newPassword')?.value;
    if (newPass == this.resetForm.get('rePassword')?.value) {
      this.userService.resetPassword(localStorage.getItem('email-forgot'), newPass).subscribe(next => {
        this.toast.success('Thay đổi mật khẩu thành công');

        this.isLoading = false;
        this.router.navigateByUrl("/auth/login");
      })
    } else {
      this.isLoading = false;
      this.toast.error('Vui lòng nhập lại mật khẩu phải trùng khớp');
    }
  }
}
