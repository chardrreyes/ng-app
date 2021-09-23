import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserIndexComponent } from './user-index/user-index.component';

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'home', component: UserIndexComponent},
  {path: ':userId/view', component: UserEditComponent},
  // Path not found
  // {path: '404', component: UserIndexComponent},
  // {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
