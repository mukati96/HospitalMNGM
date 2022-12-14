import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProvidersComponent } from './view-providers.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { FormsModule } from '@angular/forms';
import { SafeUrlModule } from 'src/app/shared/pipes/safe-url/safe-url.module';
import { NgPrimeModule } from 'src/app/ng-prime.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OptionalFieldModule } from 'src/app/shared/pipes/optional-field/optional-field.module';
import {NgxMaskModule} from 'ngx-mask';
const routes: Routes = [
  {
    path: LayoutRoutes.EMPTY,
    component: ViewProvidersComponent,
  },
];



@NgModule({
  declarations: [
    ViewProvidersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SafeUrlModule,
    ReactiveFormsModule,
    OptionalFieldModule,
    NgPrimeModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forRoot({
      showMaskTyped : false,
    })
  ]
})
export class ViewProvidersModule { }
