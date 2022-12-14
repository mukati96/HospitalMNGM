import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { ProvidersComponent } from './providers.component';
import { NgPrimeModule } from 'src/app/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OptionalFieldModule } from 'src/app/shared/pipes/optional-field/optional-field.module';

@NgModule({
  declarations: [ProvidersComponent],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    OptionalFieldModule,
  ],

  providers: [DatePipe],
})
export class ProvidersModule {}
