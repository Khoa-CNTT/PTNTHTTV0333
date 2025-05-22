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
  }

  payment() {
    console.log("pay");
    const userName = localStorage.getItem("Name_key")
    this.paymentService.submitPay(1000000,"abc", userName).subscribe(next => {
      this.url = next;
      console.log(this.url);
      const redirectUrl = next.redirectUrl;
      console.log(redirectUrl);
      window.location.href = redirectUrl;
    })
  }
}
