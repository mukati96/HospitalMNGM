import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChronicalDiseasRoutingModule } from './chronical-diseas-routing.module';
import { ChronicalDiseasComponent } from './chronical-diseas.component';
import { NgPrimeModule } from 'src/app/ng-prime.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChronicalDiseasComponent
  ],
  imports: [
    CommonModule,
    ChronicalDiseasRoutingModule,
    NgPrimeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChronicalDiseasModule { }
