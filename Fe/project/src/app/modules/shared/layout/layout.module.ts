import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../../auth/auth-routing.module';
import { LoadingComponent } from './loading/loading.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    LoadingComponent,
    NavigationComponent
  ]
})
export class LayoutModule { }
