import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtService } from 'src/app/services/jwt.service';
import { UserService } from 'src/app/services/user.service';
declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  isLoading = false;


  constructor(private toast: ToastrService, private userService: UserService, private jwtService: JwtService, private router: Router, private http: HttpClient, private ngZone: NgZone) {
    this.formLogin = new FormGroup({
      userName: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
    this.loadGoogleScript();
    this.Load();
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

      // google.accounts.id.renderButton(
      //   document.getElementById('google-btn'),
      //   { theme: 'outline', size: 'large' }
      // );
    } else {
      console.error('Google object is not defined yet');
    }
  }


  loginSubmit() {
    this.isLoading = true;
    this.userService.login(this.formLogin.value).subscribe( {
      next: (res) =>{
        if (res.token != undefined) {
          this.jwtService.setToken(res.token);
          this.jwtService.setRoles(res.roles);
          this.jwtService.setName(res.name);
          this.jwtService.setDate(res.createdTime);
          this.isLoading = false;
          this.toast.success("Đăng nhập thành công");
          this.router.navigateByUrl("/pages/components/home-main");
        }
      },
      error: (err) =>{
        this.isLoading = false;
        const errorMessage = err.error?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
        this.toast.error(errorMessage);
      }
      
    })
    
  }

  handleGoogleLogin(idToken: string): void {
    this.http.post('http://localhost:8080/api/user/google', { idToken }).subscribe({
      next: (res: any) => {
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

  Load() {
    if (this.jwtService.verifyToken()) {
      this.router.navigateByUrl("/pages/components/home-main");
    }
  }

}
