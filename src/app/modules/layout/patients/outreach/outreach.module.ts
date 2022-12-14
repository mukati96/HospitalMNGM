import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutreachRoutingModule } from './outreach-routing.module';
import { OutreachComponent } from './outreach.component';
import { TableModule } from 'primeng/table';
import { NgPrimeModule } from 'src/app/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OptionalFieldModule } from 'src/app/shared/pipes/optional-field/optional-field.module';

@NgModule({
  declarations: [OutreachComponent],
  imports: [
    CommonModule,
    OutreachRoutingModule,
    TableModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    OptionalFieldModule,
  ],
})
export class OutreachModule {}
