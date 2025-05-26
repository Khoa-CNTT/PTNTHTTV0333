import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-result-pay',
  templateUrl: './result-pay.component.html',
  styleUrls: ['./result-pay.component.css']
})
export class ResultPayComponent implements OnInit {
  result: boolean;
  constructor(private paymentService: PaymentService,
      private route: ActivatedRoute,
      private http: HttpClient,
      private router: Router,
      private toast: ToastrService) { }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    const httpParams = new HttpParams({ fromObject: params });
    this.http.get<boolean>('http://localhost:8080/api/payment/vnpay-payment', { params: httpParams})
      .subscribe(
            next => {
              if(next == true){
                this.result = true;
                this.toast.success("Thanh toán tài khoản VIP thành công");
              }else{
                this.toast.error("Thanh toán thất bại");
              }
            },
          );
  }

}
