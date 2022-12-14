import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { ChronicalDiseasComponent } from './chronical-diseas.component';

const routes: Routes = [
  {
    path: LayoutRoutes.EMPTY,
    component: ChronicalDiseasComponent
  },
  {
    path: LayoutRoutes.ADD,
    loadChildren: () => import('./add-edit-diseas/add-edit-diseas.module').then(m => m.AddEditDiseasModule)
  },
  {
    path: LayoutRoutes.UPDATE_WITH_ID,
    loadChildren: () => import('./add-edit-diseas/add-edit-diseas.module').then(m => m.AddEditDiseasModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChronicalDiseasRoutingModule { }
