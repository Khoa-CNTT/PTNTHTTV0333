import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtService } from 'src/app/services/jwt.service';
import { UserService } from 'src/app/services/user.service';
declare const google: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  ngOnInit(): void {
    this.loadGoogleScript();
    this.Load();
  }
  formRegister: FormGroup;
  isLoading = false;

  constructor(private userService: UserService, private router: Router, private toast: ToastrService, private jwtService: JwtService, private http: HttpClient, private ngZone: NgZone) {
    this.formRegister = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]+$/)  
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]+$/) 
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/) 
      ]),
      rePassword: new FormControl('', Validators.required)
    });
  }
  validation_messages = {
    userName:[
      { type: 'required', message: 'Vui lòng nhập tên tài khoản.' },
      { type: 'pattern', message: 'Tên tài khoản chứa chữ thường, chữ số và trên 5 ký tự.' }
    ],
    email: [
      { type: 'required', message: 'Vui lòng nhập email.' },
      { type: 'pattern', message: 'Vui lòng nhập đúng định dạng.' }
    ],
    password:[
      { type: 'required', message: 'Vui lòng nhập mật khẩu.' },
      { type: 'pattern', message: 'Mật khẩu chứa chữ thường, chữ số và trên 8 ký tự (vd: abcd123456).' }
    ] 
  }

  

  submitRegister() {
    this.isLoading = true;
    if (this.formRegister.get('rePassword')?.value == this.formRegister.get('password')?.value) {
      this.userService.register(this.formRegister.value).subscribe( {
        next: (res) =>{
          this.toast.success('Đăng ký thành công');

          this.isLoading = false;
          this.router.navigateByUrl("/auth/login");
        },
        error: (err) => {
          this.isLoading = false;
          const errorMessage = err.error?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
          this.toast.error(errorMessage);
        }
      })
    } else {
      this.isLoading = false;
      this.toast.error('Vui lòng nhập lại mật khẩu phải trùng khớp');
    }
  }

  loadGoogleScript(): void {
    const scriptId = 'google-client-script';

    // Tránh load lại nếu đã có script
    if (document.getElementById(scriptId)) {
      this.initializeGoogleLogin(); // Script đã có => khởi tạo luôn
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.id = scriptId;
    script.async = true;
    script.defer = true;
    script.onload = () => this.initializeGoogleLogin(); // Chỉ gọi khi script đã sẵn sàng
    document.body.appendChild(script);
  }

  initializeGoogleLogin(): void {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: '705757181216-610b41ap71n8d08rblrmkk643muc33t3.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleLogin(response.credential)
      });

      setTimeout(() => {
        google.accounts.id.renderButton(
          document.getElementById('google-btn'),
          { theme: 'outline', size: 'large' }
        );
      }, 0);
    } else {
      console.error('Google object is not defined yet');
    }
  }

  handleGoogleLogin(idToken: string): void {
    this.http.post('http://localhost:8080/api/user/google', { idToken }).subscribe({
      next: (res: any) => {
        // console.log('Google login success:', res);
        this.jwtService.setToken(res.token);
        this.jwtService.setRoles(res.roles);
        this.jwtService.setName(res.name);
        this.jwtService.setDate(res.createdTime);
        this.ngZone.run(() => {
          this.router.navigate(['/pages/components/home-main']);
        });
      },
      error: err => {
        const errorMessage = err.error?.message || 'Đăng nhập Google thất bại. Vui lòng thử lại.';
        this.ngZone.run(() => {
          this.toast.error(errorMessage);
        });
      }
    });
  }

  Load(){
    if(this.jwtService.verifyToken()){
      this.router.navigateByUrl("/pages/components/home-main");
    }
  }

}
