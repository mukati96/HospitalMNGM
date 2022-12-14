import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: LayoutRoutes.EMPTY,
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
