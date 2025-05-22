import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private API_PAYMENT = 'http://localhost:8080/api/payment'

  constructor(private http: HttpClient) { }

  GetRevenueByYear(year: number) {
    return this.http.get(this.API_PAYMENT + '/revenue/getByYear?year=' + year);
  }

  GetRegistrationYears() {
    return this.http.get(this.API_PAYMENT + '/years');
  }

  GetRevenueBetween(year: number) {
    return this.http.get(this.API_PAYMENT + '/revenue/total?year=' + year);
  }

  submitPay(total: any, orderInfo: string, userName:string):Observable<any>{
    let params = new HttpParams()
          .set('amount', total.toString())
          .set('orderInfo', orderInfo.toString())
          .set('userName', userName.toString());;
    return this.http.post<any>(`${this.API_PAYMENT}/submitOrder`,{}, { params });
  }

  getResultPay(){
    return this.http.get<boolean>(this.API_PAYMENT + '/vnpay-payment');
  }
}
