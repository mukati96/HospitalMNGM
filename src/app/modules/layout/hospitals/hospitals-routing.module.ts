import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { HospitalsComponent } from './hospitals.component';

const routes: Routes = [
  {
    path:LayoutRoutes.EMPTY,
    component: HospitalsComponent
  },
  {
    path: LayoutRoutes.ADD,
    loadChildren: () => import('./add-edit-hospitals/add-edit-hospitals.module').then(m => m.AddEditHospitalsModule)
  },
  {
    path: LayoutRoutes.UPDATE_WITH_ID,
    loadChildren: () => import('./add-edit-hospitals/add-edit-hospitals.module').then(m => m.AddEditHospitalsModule)
  },
  {
    path: LayoutRoutes.VIEW_WITH_ID,
    loadChildren: () => import('./view-hospitals/view-hospitals.module').then(m =>m.ViewHospitalsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HospitalsRoutingModule { }
