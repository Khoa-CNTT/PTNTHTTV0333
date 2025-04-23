import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { VerifyComponent } from './verify/verify.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { AuthenticationModule } from '../shared/authentication/authentication.module';
import { LayoutModule } from '../shared/layout/layout.module';



@NgModule({
  declarations: [AuthComponent, ChangePasswordComponent, ForgotPasswordComponent, HomePageComponent, LoginComponent, RegistrationComponent, VerifyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    AuthenticationModule,
    LayoutModule,
    ToastrModule.forRoot()
  ]
})
export class AuthModule { }
