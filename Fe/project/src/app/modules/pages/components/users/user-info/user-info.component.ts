import { Component, OnInit, Renderer2 } from '@angular/core';
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
  avatar: string;
  isLoading = false;
  user: UserEditDto;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private renderer: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {


    this.userService.getByUserName().subscribe(data => {
      this.user = data;
      this.avatar = this.user.avatar;
      this.userForm = this.formBuilder.group({
        id: [this.user.id],
        email: [this.user.email, [Validators.email]],
        firstName: [this.user.firstName],
        lastName: [this.user.lastName],
        userName: [this.user.userName],
        isVip: [this.user.isVip],
        gender: [this.user.gender],
        phone: [this.user.phone, [Validators.pattern(/^\d{10,11}$/)]],
        address: [this.user.address],
        birthday: [this.user.birthday],
        avatar: [this.user.avatar],
      });
    });

    const script = this.renderer.createElement('script');
    script.src = 'assets/js/imgFireBase.js';
    this.renderer.appendChild(document.body, script);
  }

  edit() {
    const updatedUser = this.userForm.value;
    const userId = this.user.id;

      if (this.selectedImage) {
        const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
        const fileRef = this.storage.ref(nameImg);
        this.isLoading = true;
        this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              updatedUser.avatar = url;
              this.updateUser(userId, updatedUser);
            });
          })
        ).subscribe();
      } else {
        this.isLoading = true;
        if (JSON.stringify(updatedUser) === JSON.stringify(this.user)) {
          this.toast.warning('Dữ liệu không có thay đổi.', 'Message');
          this.isLoading = false;
          return;
        }
        this.updateUser(userId, updatedUser);
      }
  }

  private updateUser(userId: number, updatedUser: any) {
    console.log(updatedUser);
    this.userService.editUser(userId, updatedUser,).subscribe(
      (data) => {
        this.isLoading = false;
        this.toast.success('Chỉnh sửa thành công.', 'Message');
      },
      (error) => {
        this.toast.error('Chỉnh sửa thất bại.', 'Message');
        this.isLoading = false;
      }
    );
  }




  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = (e: any) => {
      this.avatar = e.target.result;
    };
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
