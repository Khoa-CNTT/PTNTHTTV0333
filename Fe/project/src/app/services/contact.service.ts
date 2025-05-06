import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactComponent } from '../modules/pages/components/users/contact/contact.component';
import { Contact } from '../models/Contact';
import { Observable } from 'rxjs';
import {HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
  

  private API_CONTACT = 'http://localhost:8080/api/page'
  constructor(private http : HttpClient) {} 

  
  

  // 2. Thêm mới contact
  addNewContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.API_CONTACT}/addNewContact`, contact);
  }
   // 3. Lấy contact có phân trang
   getPageContact(page: number, size: number): Observable<any> {
    let params = new HttpParams()
    .set('page', page.toString())  // Thêm tham số 'page'
    .set('size', size.toString()); // Thêm tham số 'size'
    return this.http.get<any>(`${this.API_CONTACT}`, { params });
  }

  // 4. Cập nhật status contact
  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.API_CONTACT}`, contact);
  } 
}

