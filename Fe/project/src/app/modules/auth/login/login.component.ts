import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private userService: UserService, private jwtService: JwtService, private router: Router, private http: HttpClient,private ngZone: NgZone) {
    this.formLogin = new FormGroup({
      userName: new FormControl(),
      password: new FormControl()
    })
   }

  ngOnInit(): void {
  
    this.loadGoogleScript();
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
  
      google.accounts.id.renderButton(
        document.getElementById('google-btn'),
        { theme: 'outline', size: 'large' }
      );
    } else {
      console.error('Google object is not defined yet');
    }
  }


  loginSubmit(){
    this.userService.login(this.formLogin.value).subscribe(next=>{
      if(next.token != undefined){
        this.jwtService.setToken(next.token);
        this.jwtService.setRoles(next.roles);
        this.jwtService.setName(next.name);
        this.jwtService.setDate(next.createdTime);
        this.router.navigateByUrl("/pages/components/home-main");
      }
    })
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
        console.error('Google login failed:', err);
      }
    });
  }

}
