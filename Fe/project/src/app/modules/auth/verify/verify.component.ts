import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  isLoading = false;
  otpForm: FormGroup;
  constructor(private userService: UserService, private router: Router, private toast: ToastrService) { 
    this.otpForm = new FormGroup({
      otp1: new FormControl(),
      otp2: new FormControl(),
      otp3: new FormControl(),
      otp4: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  submitOtp(){
    this.isLoading = true;
    const otp = this.otpForm.get('otp1')?.value + this.otpForm.get('otp2')?.value + this.otpForm.get('otp3')?.value+ this.otpForm.get('otp4')?.value;
    const email = localStorage.getItem('email-forgot');
    console.log(otp);
    this.userService.verifyOtp(email, otp).subscribe(
      (res) => {
        this.isLoading = false;
        this.toast.success(res.message); 
        this.router.navigateByUrl("/auth/change-password");
      },
      (err) => {
        const errorMessage = err.error?.message || 'OTP không hợp lệ hoặc đã hết hạn';
        this.toast.error(errorMessage);
        this.isLoading = false;
      }
    );
  }

}
