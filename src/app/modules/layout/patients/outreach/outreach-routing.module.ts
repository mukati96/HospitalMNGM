import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { OutreachComponent } from './outreach.component';

const routes: Routes = [
  {
    path: LayoutRoutes.EMPTY,
    component: OutreachComponent
  },
  {
    path: LayoutRoutes.ADD,
    loadChildren: () => import('./add-edit-outreach/add-edit-outreach.module').then(m => m.AddEditOutreachModule)
  },
  {
    path: LayoutRoutes.UPDATE_WITH_ID,
    loadChildren: () => import('./add-edit-outreach/add-edit-outreach.module').then(m => m.AddEditOutreachModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutreachRoutingModule { }
