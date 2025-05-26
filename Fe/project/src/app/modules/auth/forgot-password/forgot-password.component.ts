import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  isLoading = false;
  formMail: FormGroup;
  constructor(private userService: UserService, private router:Router, private toast: ToastrService) {
    this.formMail = new FormGroup(
      {
        email: new FormControl('', [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) 
              ]),
      }
    )
   }
  
  validation_messages = {
    email: [
      { type: 'required', message: 'Vui lòng nhập email.' },
      { type: 'pattern', message: 'Vui lòng nhập đúng định dạng.' }
    ]
  }

  ngOnInit(): void {
  }

  submitForgot(){
    this.isLoading = true;
    const email = this.formMail.get('email')?.value;
    this.userService.forgotPassword(this.formMail.get('email')?.value).subscribe((res) => {
      console.log(' Response:', res);
      this.toast.success(res); 
      localStorage.setItem('email-forgot', email);
      this.isLoading = false;
      this.router.navigateByUrl("/verify");
    },
    (err) => {
      const errorMessage = err.error?.message || 'Email không hợp lệ hoặc không tồn tại';
      this.toast.error(errorMessage);
      this.isLoading = false;
    })
  }
}
