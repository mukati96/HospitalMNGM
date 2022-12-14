import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { PatientsComponent } from './patients.component';

const routes: Routes = [
  {
    path: LayoutRoutes.EMPTY,
    component: PatientsComponent
  },
  {
    path: LayoutRoutes.OUTREACH,
    loadChildren: () => import('./outreach/outreach.module').then(m => m.OutreachModule)
  },
  {
    path: LayoutRoutes.ADD,
    loadChildren: () => import('./add-edit-patient/add-edit-patient.module').then(m => m.AddEditPatientModule)
  },
  {
    path: LayoutRoutes.VIEW_WITH_ID,
    loadChildren: () => import('./view-patient/view-patient.module').then(m => m.ViewPatientModule)
  },
  {
    path: LayoutRoutes.UPDATE_WITH_ID,
    loadChildren: () => import('./add-edit-patient/add-edit-patient.module').then(m => m.AddEditPatientModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
