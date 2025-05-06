import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
currentTime: string = '';
  private intervalId: any;
  dropdownVisible = false;

  ngOnInit() {
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 60000);
  }

  updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit' });
    this.currentTime = `${time} • ${date}`;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isInside = target.closest('.user-menu');
    if (!isInside) {
      this.dropdownVisible = false;
    }
  }

}
