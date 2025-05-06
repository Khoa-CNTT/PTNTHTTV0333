import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  profile = {
    fullName: '',
    email: '',
    phone: '',
    avatar: ''
  };

  previewImage: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.previewImage = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log('Thông tin đã lưu:', this.profile);
    // Nếu cần upload ảnh và thông tin, bạn có thể tích hợp gọi API tại đây
  }

}
