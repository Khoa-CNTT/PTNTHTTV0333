import { Component, ElementRef, HostListener, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  currentTime: string = '';
  private intervalId: any;
  dropdownVisible = false;
  adminDropdownVisible = false;

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isInside = target.closest('.user-menu');
    if (!isInside) {
      this.dropdownVisible = false;
    }
  }
  
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
    this.adminDropdownVisible = false; // ẩn dropdown admin khi mở user
  }
  
  toggleAdminDropdown(): void {
    this.adminDropdownVisible = !this.adminDropdownVisible;
    this.dropdownVisible = false; // ẩn dropdown user khi mở admin
  }
  

}
