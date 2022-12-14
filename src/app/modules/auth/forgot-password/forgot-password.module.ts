import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LowerCaseModule } from 'src/app/shared/directives/lower-case/lower-case.module';
import { AppStateService } from 'src/app/services/app-state.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgPrimeModule } from 'src/app/ng-prime.module';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LowerCaseModule,
    NgPrimeModule,
  ],
  providers: [AppStateService, AuthService],
})
export class ForgotPasswordModule {}
