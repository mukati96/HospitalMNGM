import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { TreatmentComponent } from './treatment.component';

const routes: Routes = [
  {
    path: LayoutRoutes.EMPTY,
    component: TreatmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentRoutingModule { }
