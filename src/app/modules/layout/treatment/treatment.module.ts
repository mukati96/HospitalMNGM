import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreatmentRoutingModule } from './treatment-routing.module';
import { TreatmentComponent } from './treatment.component';


@NgModule({
  declarations: [
    TreatmentComponent
  ],
  imports: [
    CommonModule,
    TreatmentRoutingModule
  ]
})
export class TreatmentModule { }
