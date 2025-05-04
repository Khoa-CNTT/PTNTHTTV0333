import { Component, OnInit, Renderer2 } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { PaymentService } from 'src/app/services/payment.service';
Chart.register(...registerables);

@Component({
  selector: 'app-statistical-management',
  templateUrl: './statistical-management.component.html',
  styleUrls: ['./statistical-management.component.css']
})
export class StatisticalManagementComponent implements OnInit {
  chartData: any;
  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  labelData: any[] = [];
  realData: any[] = [];
  colorData: any[] = [];
  borderData: any[] = [];

  constructor(
    private paymentSer: PaymentService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {

    this.paymentSer.GetRevenueByYear(2025).subscribe(data => {
      this.chartData = data
      if (this.chartData != null) {
        for (let i = 0; i < this.chartData.length; i++) {
          this.realData.push(this.chartData[i].amount);
        }
        this.RenderChart2(this.labelData, this.realData, 'line', 'LinechartTotal')
      }
    })

  }
  RenderChart2(labelData: any, realData: any, type: any, id: any) {
    const labels = this.months.map(month => `Tháng ${month}`);
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}