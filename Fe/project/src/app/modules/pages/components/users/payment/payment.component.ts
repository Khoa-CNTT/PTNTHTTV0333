import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  success: boolean | null = null;
  url: any = null;


  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;

    const httpParams = new HttpParams({ fromObject: params });

    this.http.get<boolean>('http://localhost:8080/api/payment/vnpay-payment', { params: httpParams })
      .subscribe(
        result => {
          this.success = result;
          // Redirect sau vài  setTimeout(() => this.router.navigateByUrl('/pages/components/home-main'), 3000);
        },
        error => {
          this.success = false;
        }
      );
  }

  payment() {
    this.paymentService.submitPay2(1000000,"abc").subscribe(next => {
      this.url = next;
      console.log(this.url);
      const redirectUrl = next.redirectUrl;
      window.location.href = redirectUrl;
    })
  }
}
