
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtResponse } from '../models/JwtResponse';
import { LoginForm } from '../models/LoginForm';
import { Contact } from '../models/Contact';
import { UserEditDto } from '../models/DTO/UserEditDto';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = 'http://localhost:8080/api/user/';


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

  getMonthlyUserRegistrations(year: number): Observable<any> {
    return this.httpClient.get(this.API_URL + 'monthly-registrations/' + year);
  }

  register(user: any): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + "register", user, this.httpOptions);
  }

  login(formLogin: LoginForm): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>(this.API_URL + "login", formLogin);
  }

  logout() {
    this.jwtService.removeDate();
    this.jwtService.removeName();
    this.jwtService.removeRoles();
    this.jwtService.removeToken();
    this.router.navigateByUrl("/auth/login");
  }

  getByUserName(): Observable<UserEditDto> {
    let name = this.jwtService.getName();
    return this.httpClient.get(this.API_URL + 'getByUserName/' + name);
  }

  editUser(id: number, userForm: any): Observable<UserEditDto> {
    return this.httpClient.put<UserEditDto>(this.API_URL + 'updateProfile/' + id, userForm);
  }

  countTotalUsers(year: number): Observable<any> {
    return this.httpClient.get(this.API_URL + 'count?year=' + year);
  }

  
  getAllUser(page: number, pageSize: number): Observable<Contact[]> {
    const users = `${this.API_URL}getPageUser?page=${page}&size=${pageSize}`;
    return this.httpClient.get<User[]>(users)
  }

  getUserStatusTrue(page: number, pageSize: number): Observable<Contact[]> {
    const users = `${this.API_URL}getUserStatusTrue?page=${page}&size=${pageSize}`;
    return this.httpClient.get<User[]>(users)
  }

  getUserStatusFalse(page: number, pageSize: number): Observable<Contact[]> {
    const users = `${this.API_URL}getUserStatusFalse?page=${page}&size=${pageSize}`;
    return this.httpClient.get<User[]>(users)
  }
  updateStatusUser(id: number): Observable<any> {
    return this.httpClient.put(`${this.API_URL}delete`,id)
  }

}
