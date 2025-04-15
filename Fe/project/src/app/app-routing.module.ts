import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/auth/home-page', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'pages', loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule) },
  { path: 'supportive', loadChildren: () => import('./modules/supportive/supportive.module').then(m => m.SupportiveModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
