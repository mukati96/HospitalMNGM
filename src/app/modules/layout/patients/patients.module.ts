import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { TableModule } from 'primeng/table';
import { NgPrimeModule } from 'src/app/ng-prime.module';
import { OptionalFieldModule } from 'src/app/shared/pipes/optional-field/optional-field.module';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [PatientsComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    TableModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    OptionalFieldModule,
    RadioButtonModule,
  ],
  providers: [DatePipe],
})
export class PatientsModule {}
