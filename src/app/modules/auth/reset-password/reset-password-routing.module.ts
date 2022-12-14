import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutes } from 'src/app/constants/routes';
import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [
  {
    path:AuthRoutes.EMPTY,
    component:ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }
