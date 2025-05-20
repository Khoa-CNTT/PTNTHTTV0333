import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formRegister: FormGroup;
  isLoading = false;

  constructor(private userService: UserService, private router: Router, private toast: ToastrService) {
    this.formRegister = new FormGroup({
      userName: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      rePassword: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  submitRegister() {
    this.isLoading = true;
    if (this.formRegister.get('rePassword')?.value == this.formRegister.get('password')?.value) {
      this.userService.register(this.formRegister.value).subscribe(next => {
        this.toast.success('Đăng ký thành công');

        this.isLoading = false;
        this.router.navigateByUrl("/auth/login");
      })
    } else {
      this.isLoading = false;
      this.toast.error('Vui lòng nhập lại mật khẩu phải trùng khớp');
    }
  }
}
