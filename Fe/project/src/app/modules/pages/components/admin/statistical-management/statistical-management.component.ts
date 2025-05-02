import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';
import {
  LineController, LineElement, PointElement, LinearScale, CategoryScale,
  BarController, BarElement, Title, Tooltip, Legend
} from 'chart.js';

Chart.register(
  LineController, LineElement, PointElement, LinearScale, CategoryScale,
  Title, Tooltip, Legend, BarController, BarElement
);

@Component({
  selector: 'app-statistical-management',
  templateUrl: './statistical-management.component.html',
  styleUrls: ['./statistical-management.component.css']
})
export class StatisticalManagementComponent implements AfterViewInit, OnDestroy {
  lineChart: Chart | null = null;
  barChart: Chart | null = null;

  selectedYear = new Date().getFullYear();
  years: number[] = [];
  startYear = 2021;

  totalMeetingsToday = 0;
  totalMeetingsPast = 0;

  readonly months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

  meetings = [
    { date: '2025-04-10' }, { date: '2025-04-15' }, { date: '2025-04-17' },
    { date: '2025-04-18' }, { date: '2025-04-19' }, { date: '2025-04-19' },
    { date: '2025-04-19' }, { date: '2025-04-01' }, { date: '2025-03-25' },
    { date: '2025-02-14' },
  ];

  monthlyRevenue: { [year: number]: number[] } = {
    2021: [100, 120, 140, 130, 160, 170, 200, 180, 190, 210, 220, 250],
    2022: [90, 110, 130, 120, 150, 160, 190, 170, 180, 200, 210, 240],
    2023: [80, 100, 120, 110, 140, 150, 180, 160, 170, 190, 200, 230],
    2024: [110, 130, 150, 140, 170, 180, 210, 190, 200, 220, 230, 260],
    2025: [110, 130, 150, 140, 170, 180, 210, 190, 200, 220, 230, 260],
  };

  monthlyRegistrations: { [year: number]: number[] } = {
    2021: [30, 45, 50, 55, 60, 70, 80, 85, 90, 100, 110, 120],
    2022: [40, 60, 65, 70, 80, 90, 100, 110, 120, 130, 140, 150],
    2023: [50, 70, 75, 80, 90, 100, 120, 130, 140, 150, 160, 170],
    2024: [60, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180],
    2025: [60, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180],
  };

  ngAfterViewInit() {
    this.calculateMeetingStats();
    this.years = Array.from({ length: this.selectedYear - this.startYear + 1 }, (_, i) => this.startYear + i);
    this.updateCharts();
  }

  ngOnDestroy() {
    this.lineChart?.destroy();
    this.barChart?.destroy();
  }

  onYearChange() {
    this.updateCharts();
  }

  updateCharts() {
    this.lineChart?.destroy();
    this.barChart?.destroy();

    this.createLineChart(this.selectedYear);
    this.createBarChart(this.selectedYear);
  }

  calculateMeetingStats() {
    const today = new Date().toISOString().split('T')[0];
    this.totalMeetingsToday = this.meetings.filter(m => m.date === today).length;
    this.totalMeetingsPast = this.meetings.filter(m => m.date < today).length;
  }

  createLineChart(year: number) {
    this.lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.months,
        datasets: [{
          label: `Doanh thu năm ${year}`,
          data: this.monthlyRevenue[year],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          tension: 0.3,
          fill: false,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Biểu đồ doanh thu ${year}`,
            font: { size: 20 }
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  createBarChart(year: number) {
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [{
          label: `Số lượng người đăng ký năm ${year}`,
          data: this.monthlyRegistrations[year],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
            text: `Biểu đồ số lượng người đăng ký ${year}`,
            font: { size: 20 }
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
