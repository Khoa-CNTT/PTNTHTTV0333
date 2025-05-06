import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_key';
const ROLE_KEY = 'Role_Key';
const DATE = 'Date'
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private roles: Array<string> = [];
  constructor(private router: Router) { }
  public setToken(token: string){
    localStorage.removeItem('Token_Key');
    localStorage.setItem(TOKEN_KEY, token)
  }
  public getToken(): string{
    return localStorage.getItem(TOKEN_KEY);
  }
  public removeToken(){
    localStorage.removeItem('Token_Key');
  }
  public setName(name: string){
    localStorage.removeItem('Name_key');
    localStorage.setItem(NAME_KEY, name);
  }
  public getName():string{
    return localStorage.getItem(NAME_KEY);
  }
  public removeName(){
    localStorage.removeItem('Name_key');
  }
  public setRoles(roles: string[]){
    localStorage.removeItem('Role_Key');
    localStorage.setItem(ROLE_KEY, JSON.stringify(roles));
  }
  public removeRoles(){
    localStorage.removeItem('Role_Key');
  }
  public setDate(date: any){
    localStorage.removeItem('Date');
    localStorage.setItem(DATE, date);
  }
  public getDate():any{
    return localStorage.getItem(DATE);
  }
  public removeDate(){
    localStorage.removeItem('Date');
  }
  verifyToken(): any{
    let result = this.getToken() == null ? false : true;
    console.log(result);
    const date = new Date();
    const createdTime = this.getDate();
    if(createdTime != null){
      const created = new Date(createdTime);
      date.setDate(created.getDate() + 1);
      const currentTime = new Date();
      if (date < currentTime) {
        result = false;
        this.removeToken();
        this.removeRoles();
        this.removeName();
        this.removeDate();
        // this.router.navigateByUrl("/auth/login")
      } else {
        console.log('token con hieu luc');
      }
    } else {
      result = false;
      // this.router.navigateByUrl("/auth/login")
    }
    return result;
  }

  public generateHeader(): HttpHeaders {
    const tokenStr = 'Bearer ' + this.getToken();
    return new HttpHeaders().set('Authorization', tokenStr);
  }

}
