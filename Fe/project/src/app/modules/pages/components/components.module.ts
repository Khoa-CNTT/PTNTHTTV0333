import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { UsersManagementComponent } from './admin/users-management/users-management.component';
import { StatisticalManagementComponent } from './admin/statistical-management/statistical-management.component';
import { HomeMainComponent } from './users/home-main/home-main.component';
import { ChattingComponent } from './users/chatting/chatting.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { MeetingHistoryComponent } from './users/meeting-history/meeting-history.component';
import { SchedulingComponent } from './users/scheduling/scheduling.component';
import { PaymentComponent } from './users/payment/payment.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { LayoutModule } from '../../shared/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CreatingRoomComponent } from './users/creating-room/creating-room.component';
import { MeetingRoomComponent } from './users/meeting-room/meeting-room.component';
import { SumaryAiComponent } from './users/sumary-ai/sumary-ai.component';
import { RecordingComponent } from './users/recording/recording.component';
import { ContactManagementComponent } from './admin/contact-management/contact-management.component';
import { ContactComponent } from './users/contact/contact.component';



@NgModule({
  declarations: [ComponentsComponent, UsersManagementComponent, StatisticalManagementComponent, HomeMainComponent, ChattingComponent, UserInfoComponent, MeetingHistoryComponent, SchedulingComponent, PaymentComponent, CreatingRoomComponent, MeetingRoomComponent, SumaryAiComponent, RecordingComponent, ContactManagementComponent, ContactComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ]
})
export class ComponentsModule { }
