import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';

Chart.register(...registerables);

@Component({
  selector: 'app-statistical-management',
  templateUrl: './statistical-management.component.html',
  styleUrls: ['./statistical-management.component.css']
})
export class StatisticalManagementComponent implements OnInit, AfterViewInit {
  chartLineData: any[] = [];
  chartBarData: any[] = [];
  yearList: number[] = [];
  selectedYear: number = new Date().getFullYear();
  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  private lineChart: Chart | null = null;
  private barChart: Chart | null = null;
  sumUser: number;
  sumPayment: number;



  constructor(
    private paymentService: PaymentService,
    private userService: UserService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.loadYears();
    this.loadRevenueData(this.selectedYear);
  }

  ngAfterViewInit(): void {
    this.setupYearSelectorListener();
  }

  private loadYears(): void {
    this.paymentService.GetRegistrationYears().subscribe({
      next: (years: number[]) => {
        this.yearList = years;
      },
      error: (error) => console.error('Error fetching years:', error)
    });

  }

  private loadRevenueData(year: number): void {
    this.paymentService.GetRevenueByYear(year).subscribe({
      next: (data: any) => {
        this.chartLineData = data;
        this.renderLineChart();
      },
      error: (error) => console.error(`Error fetching revenue for year ${year}:`, error)
    });

    this.userService.getMonthlyUserRegistrations(year).subscribe({
      next: (data: any) => {
        this.chartBarData = data;
        this.renderBarChart();
      },
      error: (error) => console.error(`Error fetching revenue for year ${year}:`, error)
    });

    this.userService.countTotalUsers(year).subscribe(data => {
      this.sumUser = data;
    })
    this.paymentService.GetRevenueBetween(year).subscribe((data: number) => {
      this.sumPayment = data;
    })
  }

  private setupYearSelectorListener(): void {
    const selectElement = document.getElementById('year') as HTMLSelectElement;
    if (selectElement) {
      this.renderer.listen(selectElement, 'change', (event: Event) => {
        const selectedYear = Number((event.target as HTMLSelectElement).value);
        this.selectedYear = selectedYear;
        this.destroyChart();
        this.loadRevenueData(selectedYear);
      });
    }
  }

  private renderLineChart(): void {
    const labels = this.months.map(month => `Tháng ${month}`);
    const realData = this.chartLineData.map(item => item.total);

    this.lineChart = new Chart('LinechartTotal', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Doanh thu',
          data: realData,
          backgroundColor: '#c2363f',
          borderColor: '#c2363f',
          borderWidth: 2,
          tension: 0.1,
          fill: false,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Biểu đồ doanh thu ${this.selectedYear}`,
            font: { size: 20 }
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.parsed.y;
                return `Doanh thu: ${value.toLocaleString('vi-VN')} VNĐ`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value: any) {
                return value.toLocaleString('vi-VN') + ' VNĐ';
              }
            }
          }
        }
      }
    });
  }



  private renderBarChart(): void {
    const labels = this.months.map(month => `Tháng ${month}`);
    const realDataBar = this.chartBarData.map(items => items.count);

    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Số người đăng ký',
          data: realDataBar,
          backgroundColor: '#c2363f',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Biểu đồ số lượng người đăng ký ${this.selectedYear}`,
            font: { size: 20 }
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }


  private destroyChart(): void {
    if (this.lineChart) {
      this.lineChart.destroy();
      this.lineChart = null;
    }
    if (this.barChart) {
      this.barChart.destroy();
      this.barChart = null;
    }
  }

}