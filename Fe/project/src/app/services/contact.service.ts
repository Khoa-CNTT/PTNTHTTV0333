import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactComponent } from '../modules/pages/components/users/contact/contact.component';
import { Contact } from '../models/Contact';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private API_CONTACT = 'http://localhost:8080/api/page'

  constructor(private http: HttpClient) { }

  addNewContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.API_CONTACT}/addNewContact`, contact);
  }

  getAllContact(page: number, pageSize: number): Observable<Contact[]> {
    const blogApprove = `${this.API_CONTACT}/getPageContact?page=${page}&size=${pageSize}`;
    return this.http.get<Contact[]>(blogApprove)
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.API_CONTACT}`, contact);
  }

  findByIdContact(id: any): Observable<Contact> {
    return this.http.get<Contact>(this.API_CONTACT + '/getContactById/' + id);
  }
}

