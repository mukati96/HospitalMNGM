import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DoughnutChartModule } from 'src/app/shared/modules/doughnut-chart/doughnut-chart.module';
import { LineChartModule } from 'src/app/shared/modules/line-chart/line-chart.module';
import { NgPrimeModule } from 'src/app/ng-prime.module';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { PracticeAdminComponent } from './practice-admin/practice-admin.component';
import { PatientComponent } from './patient/patient.component';
import { ProviderComponent } from './provider/provider.component';
import { CareManagerComponent } from './care-manager/care-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'src/app/shared/modules/chart/chart.module';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { OptionalFieldModule } from 'src/app/shared/pipes/optional-field/optional-field.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SuperAdminComponent,
    PracticeAdminComponent,
    PatientComponent,
    ProviderComponent,
    CareManagerComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DoughnutChartModule,
    LineChartModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    OverlayPanelModule,
    CheckboxModule,
    ReactiveFormsModule,
    CalendarModule,
    OptionalFieldModule
  ],
  providers: [DatePipe]
})
export class DashboardModule { }
