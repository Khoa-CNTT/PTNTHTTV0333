import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private API_PAYMENT = 'http://localhost:8080/api/payment'

  constructor(private http: HttpClient) { }

  GetRevenueByYear(year: number) {
    return this.http.get(this.API_PAYMENT + '/revenue/getByYear?year=' + year);
  }

  GetRegistrationYears(){
    return this.http.get(this.API_PAYMENT + '/years');
  }

  GetRevenueBetween(year: number){
    return this.http.get(this.API_PAYMENT + '/revenue/total?year=' + year);
  }
}
