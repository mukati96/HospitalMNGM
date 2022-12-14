import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { FEATURE_SLUGS } from 'src/app/enum/feature-slug';
import { AccessGuard } from 'src/app/guards/access.guard';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: LayoutRoutes.EMPTY,
    component: LayoutComponent,
    children: [
      {
        path: LayoutRoutes.DASHBOARD,
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: LayoutRoutes.PATIENTS,
        loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule),
        canActivate: [AccessGuard],
        data: {
          feature: FEATURE_SLUGS.PATIENT_MANAGEMENT
        },
      },
      {
        path: LayoutRoutes.HOSPITALS,
        loadChildren: () => import('./hospitals/hospitals.module').then(m => m.HospitalsModule),
        canActivate: [AccessGuard],
        data: {
          feature: FEATURE_SLUGS.HOSPITAL_MANAGEMENT
        }
      },
      {
        path: LayoutRoutes.PROVIDERS,
        loadChildren: () => import('./providers/providers.module').then(m => m.ProvidersModule),
        canActivate: [AccessGuard],
        data: {
          feature: FEATURE_SLUGS.PROVIDER_MANAGEMENT
        }
      },
      {
        path: LayoutRoutes.TREATMENT,
        loadChildren: () => import('./treatment/treatment.module').then(m => m.TreatmentModule),
        canActivate: [AccessGuard],
        data: {
          feature: FEATURE_SLUGS.TREATMENTS
        }
      },
      {
        path: LayoutRoutes.CHRONIC_DISEAS,
        loadChildren: () => import('./chronical-diseas/chronical-diseas.module').then(m => m.ChronicalDiseasModule),
        canActivate: [AccessGuard],
        data: {
          feature: FEATURE_SLUGS.CHRONIC_DISEAS
        }
      },
      {
        path: LayoutRoutes.PROFILE,
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
