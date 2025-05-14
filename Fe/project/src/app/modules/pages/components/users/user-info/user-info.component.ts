import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { formatDate } from '@angular/common';
import { UserEditDto } from 'src/app/models/DTO/UserEditDto';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userForm: FormGroup;
  selectedImage: any = null;
  avatar: string = null;
  isLoading = false;
  user: UserEditDto;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.userService.getByUserName().subscribe(data => {
      this.user = data;
      this.avatar = this.user.avatar;
      this.userForm = this.formBuilder.group({
        id: [this.user.id],
        email: [this.user.email, [Validators.required, Validators.email]],
        firstName: [this.user.firstName, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        userName: [this.user.userName, Validators.required],
        isVip: [this.user.isVip],
        gender: [this.user.gender, Validators.required],
        phone: [this.user.phone, [Validators.pattern(/^\d{10,11}$/)]],
        address: [this.user.address],
        birthday: [this.user.birthday]
      });
    });
  }

  edit() {
    const updatedUser = this.userForm.value;
    const userId = this.user.id;

    if (this.userForm.dirty || this.selectedImage) {
      if (this.selectedImage) {
        const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
        const fileRef = this.storage.ref(nameImg);
        this.isLoading = true;
        this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe({
              next: (url) => {
                updatedUser.avatar = url;
                this.updateUser(userId, updatedUser);
              },
              error: (err) => {
                this.toast.error('Tải ảnh lên thất bại.', 'Lỗi');
                this.isLoading = false;
              }
            });
          })
        ).subscribe({
          error: (err) => {
            this.toast.error('Tải ảnh lên thất bại.', 'Lỗi');
            this.isLoading = false;
          }
        });
      } else {
        this.isLoading = true;
        if (JSON.stringify(updatedUser) === JSON.stringify(this.user)) {
          this.toast.warning('Dữ liệu không có thay đổi.', 'Message');
          this.isLoading = false;
          return;
        }
        updatedUser.avatar = this.user.avatar;
        this.updateUser(updatedUser,userId);
      }
    } else {
      this.toast.warning('Vui lòng điền thông tin cần chỉnh sửa hoặc chọn ảnh.', 'Message');
    }
  }

  private updateUser(userId: number, updatedUser: any) {
    this.userService.editUser(userId, updatedUser).subscribe({
      next: (data) => {
        this.toast.success('Chỉnh sửa thành công!', 'Message');
        this.isLoading = false;
      },
      error: (error) => {
        this.toast.error('Chỉnh sửa thất bại.', 'Message');
        this.isLoading = false;
      }
    });
  }

  showPreview(event: any) {
    const file = event.target.files[0];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        this.toast.error('Vui lòng chọn file ảnh (PNG, JPG, GIF).', 'Lỗi');
        return;
      }
      if (file.size > maxSize) {
        this.toast.error('Kích thước ảnh không được vượt quá 5MB.', 'Lỗi');
        return;
      }
      this.selectedImage = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.avatar = e.target.result;
      };
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}