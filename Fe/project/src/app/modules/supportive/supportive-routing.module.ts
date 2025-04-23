import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SupportiveComponent } from './supportive.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ErrorComponent } from './error/error.component';



const routes: Routes = [{
  path: '', component: SupportiveComponent,
  children: [
    { path: 'coming-soon', component: ComingSoonComponent},
    { path: 'error', component: ErrorComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportiveRoutingModule { }
