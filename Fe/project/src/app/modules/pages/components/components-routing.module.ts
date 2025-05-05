import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsComponent } from './components.component';
import { HomeMainComponent } from './users/home-main/home-main.component';
import { ContactManagementComponent } from './admin/contact-management/contact-management.component';
import { StatisticalManagementComponent } from './admin/statistical-management/statistical-management.component';
import { UsersManagementComponent } from './admin/users-management/users-management.component';
import { ChattingComponent } from './users/chatting/chatting.component';
import { CreatingRoomComponent } from './users/creating-room/creating-room.component';
import { MeetingHistoryComponent } from './users/meeting-history/meeting-history.component';
import { MeetingRoomComponent } from './users/meeting-room/meeting-room.component';
import { PaymentComponent } from './users/payment/payment.component';
import { RecordingComponent } from './users/recording/recording.component';
import { SchedulingComponent } from './users/scheduling/scheduling.component';
import { SumaryAiComponent } from './users/sumary-ai/sumary-ai.component';
import { UserInfoComponent } from './users/user-info/user-info.component';
import { ContactComponent } from './users/contact/contact.component';



const routes: Routes = [
  {
    path: '', component: ComponentsComponent,
    children: [
      {path: 'home-main', component: HomeMainComponent},
      {path: 'contact-management', component: ContactManagementComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'statistical-management', component: StatisticalManagementComponent},
      {path: 'users-management', component: UsersManagementComponent},
      {path: 'chatting', component: ChattingComponent},
      {path: 'creating-room', component: CreatingRoomComponent},
      {path: 'meeting-history', component: MeetingHistoryComponent},
      {path: 'meeting-room', component: MeetingRoomComponent},
      {path: 'payment', component: PaymentComponent},
      {path: 'recording', component: RecordingComponent},
      {path: 'scheduling', component: SchedulingComponent},
      {path: 'sumary-ai', component: SumaryAiComponent},
      {path: 'user-info', component: UserInfoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
