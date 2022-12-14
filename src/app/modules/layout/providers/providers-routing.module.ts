import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { ProvidersComponent } from './providers.component';

const routes: Routes = [
  {
    path: LayoutRoutes.EMPTY,
    component:ProvidersComponent
  },
  {
    path: LayoutRoutes.ADD,
    loadChildren: () => import('./add-edit-providers/add-edit-providers.module').then(m => m.AddEditProvidersModule)
  },
  {
    path: LayoutRoutes.UPDATE_WITH_ID,
    loadChildren: () => import('./add-edit-providers/add-edit-providers.module').then(m => m.AddEditProvidersModule)
  },
  {
    path: LayoutRoutes.VIEW_WITH_ID,
    loadChildren: () => import('./view-providers/view-providers.module').then(m => m.ViewProvidersModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidersRoutingModule { }
