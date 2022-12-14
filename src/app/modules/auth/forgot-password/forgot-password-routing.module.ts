import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutes } from 'src/app/constants/routes';
import { ForgotPasswordComponent } from './forgot-password.component';

const routes: Routes = [
  {
    path: AuthRoutes.EMPTY,
    component:ForgotPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
