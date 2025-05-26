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
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ResultPayComponent } from './users/result-pay/result-pay.component';



const routes: Routes = [
  {
    path: '', component: ComponentsComponent,
    children: [
      { path: 'home-main', component: HomeMainComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'contact-management', component: ContactManagementComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'statistical-management', component: StatisticalManagementComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'contact', component: ContactComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'users-management', component: UsersManagementComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'chatting', component: ChattingComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'creating-room', component: CreatingRoomComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'meeting-history', component: MeetingHistoryComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'meeting-room/:id', component: MeetingRoomComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'payment', component: PaymentComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'recording', component: RecordingComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'scheduling', component: SchedulingComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'sumary-ai', component: SumaryAiComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } },
      { path: 'result-pay', component: ResultPayComponent, canActivate: [AuthGuardService], data: { roles: ['ADMIN', 'USER'] } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
