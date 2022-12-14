import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutes } from 'src/app/constants/routes';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: AuthRoutes.EMPTY,
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
