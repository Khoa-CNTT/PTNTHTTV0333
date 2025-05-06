import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtResponse } from '../models/JwtResponse';
import { LoginForm } from '../models/LoginForm';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = "http://localhost:8080/api/user";
  
  private httpOptions: any;
  constructor(private httpClient: HttpClient, private jwtService: JwtService, private router: Router) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  register(user: any): Observable<any>{
    return this.httpClient.post<any>(this.URL + "/register", user, this.httpOptions);
  }

  login(formLogin: LoginForm): Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(this.URL+"/login", formLogin);
  }

  logout(){
    this.jwtService.removeDate();
    this.jwtService.removeName();
    this.jwtService.removeRoles();
    this.jwtService.removeToken();
    this.router.navigateByUrl("/login");
  }
}
