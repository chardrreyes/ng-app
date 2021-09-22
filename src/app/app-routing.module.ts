import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserIndexComponent } from './user-index/user-index.component';

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'home', component: UserIndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
