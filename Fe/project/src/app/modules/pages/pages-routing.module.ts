import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';



const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: 'components', loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule) },
    ], canActivate:[AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
