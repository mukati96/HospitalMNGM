import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HospitalsRoutingModule } from './hospitals-routing.module';
import { HospitalsComponent } from './hospitals.component';
import { NgPrimeModule } from 'src/app/ng-prime.module';
import { OptionalFieldModule } from 'src/app/shared/pipes/optional-field/optional-field.module';

@NgModule({
  declarations: [HospitalsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HospitalsRoutingModule,
    NgPrimeModule,
    OptionalFieldModule
  ],
})
export class HospitalsModule {}
