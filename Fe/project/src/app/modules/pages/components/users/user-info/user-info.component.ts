import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { formatDate } from '@angular/common';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userForm: FormGroup;
  selectedImage: any = null;
  private error: string;
  urlImg: any = null;
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
    const script = this.render.createElement('script');
    script.src = '/assets/js/imgFireBase.js';
    this.render.appendChild(document.body, script);
    this.activatedRoute.paramMap.subscribe((data: ParamMap) => {
      const id = data.get('id');

    });


  }

  edit() {

  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = (e: any) => {
      this.urlImg = e.target.result;
    };
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }



}