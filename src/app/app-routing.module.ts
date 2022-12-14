import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutes, LayoutRoutes } from './constants/routes';
import { AuthGuard } from './guards/auth.guard';
import { ResetPasswordResolver } from './route-resolver/reset-password.resolver';

const routes: Routes = [
  {
    path: AuthRoutes.LOGIN,
    loadChildren: () => import('./modules/auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: AuthRoutes.FORGOT_PASSWORD,
    loadChildren: () => import('./modules/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: AuthRoutes.RESET_PASSWORD,
    loadChildren: () => import('./modules/auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
    resolve: {
      response: ResetPasswordResolver
    },
  },
  {
    path: AuthRoutes.EMPTY,
    loadChildren: () => import('./modules/layout/layout.module').then(m => m.LayoutModule),
    canActivate: [AuthGuard],
  },
  {
    path: LayoutRoutes.CALL,
    loadChildren: () => import('./modules/auth/jitsi-meet/jitsi-meet.module').then(m => m.JitsiMeetModule)
  },
  {
    path: '**', redirectTo: AuthRoutes.LOGIN, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
