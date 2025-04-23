import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { AuthFooterComponent } from './auth-footer/auth-footer.component';
import { AuthRightComponent } from './auth-right/auth-right.component';
import { AuthRoutingModule } from '../../auth/auth-routing.module';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthRightComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthRightComponent
  ]
})
export class AuthenticationModule { }
