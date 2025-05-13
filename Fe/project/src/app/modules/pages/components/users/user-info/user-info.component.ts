import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { formatDate } from '@angular/common';
import { User } from 'src/app/models/User';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userForm: FormGroup;
  selectedImage: any = null;
  private error: string;
  avatar: any = null;
  isLoading = false;
  user: User;



  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private render: Renderer2,
    private toast: ToastrService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.userService.getByUserName().subscribe(data => {
      this.user = data;
      this.userForm = this.formBuilder.group({
        id: [this.user.id],
        lastName: [this.user.lastName],
        firstName: [this.user.firstName],
        email: [this.user.email],
        phone: [this.user.phone],
        address: [this.user.address],
        birthday: [this.user.birthday],
        avatar: [this.user.avatar]
      });
    });
  }

  edit() {
    const updatedUser = this.userForm.value;
    if (this.userForm.dirty && this.userForm.valid) {
      if (this.selectedImage) {
        const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
        const fileRef = this.storage.ref(nameImg);
        this.isLoading = true;
        this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe({
              next: (url) => {
                updatedUser.avatar = url;
                this.updateUser(updatedUser);
              },
              error: (err) => {
                this.toast.error('Tải ảnh thất bại.', 'Thông báo');
                this.isLoading = false;
              }
            });
          })
        ).subscribe();
      } else {
        this.isLoading = true;
        if (JSON.stringify(updatedUser) === JSON.stringify(this.user)) {
          this.toast.warning('Dữ liệu không có thay đổi.', 'Thông báo');
          this.isLoading = false;
          return;
        }
        this.updateUser(updatedUser);
      }
    } else {
      this.toast.warning('Vui lòng điền thông tin cần chỉnh sửa.', 'Thông báo');
    }
  }

  private updateUser(updatedUser: any) {
    this.userService.editUser(updatedUser).subscribe(
      (data) => {
        console.log("updateUser: " + data);

        if (data != null) {
          this.toast.error(this.error, 'Message');
        } else {
          this.toast.success('Chỉnh sửa thành công!', 'Message');
          this.router.navigateByUrl('userList');
        }
        this.isLoading = false;
      },
      (error) => {
        this.toast.error('Chỉnh sửa thất bại.', 'Message');
        this.isLoading = false;
      }
    );
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatar = e.target.result; // Cập nhật ảnh xem trước
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }


  ngAfterViewInit(): void {
    console.log(document.getElementById('fileInput')); // Kiểm tra xem fileInput có tồn tại không
  }

}

