import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PaymentService } from 'src/app/services/payment.service';

Chart.register(...registerables);

@Component({
  selector: 'app-statistical-management',
  templateUrl: './statistical-management.component.html',
  styleUrls: ['./statistical-management.component.css']
})
export class StatisticalManagementComponent implements OnInit, AfterViewInit {
  chartData: any[] = [];
  yearList: number[] = [];
  selectedYear: number = new Date().getFullYear();
  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  private chart: Chart | null = null;

  constructor(
    private paymentService: PaymentService,
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
        this.chartData = data;
        this.renderLineChart();
        this.renderBarChart();
      },
      error: (error) => console.error(`Error fetching revenue for year ${year}:`, error)
    });
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
    const realData = this.chartData.map(item => item.total);

    this.chart = new Chart('LinechartTotal', {
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
            text: `Biểu đồ doanh thu 2025`,
            font: { size: 20 }
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  private renderBarChart(): void {
    const labels = this.months.map(month => `Tháng ${month}`);
    const realData = this.chartData.map(item => item.total);

    this.chart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'My First Dataset',
          data: realData,
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
            text: `Biểu đồ số lượng người đăng ký 2025`,
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
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}