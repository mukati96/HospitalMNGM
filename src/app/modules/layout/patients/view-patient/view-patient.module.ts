import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPatientComponent } from './view-patient.component';
import { LayoutRoutes } from 'src/app/constants/routes';
import { RouterModule, Routes } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { JitsiModule } from 'src/app/shared/modules/jitsi/jitsi.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VitalsComponent } from './vitals/vitals.component';
import { MedicalConditionsComponent } from './medical-conditions/medical-conditions.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { PatientSummaryComponent } from './patient-summary/patient-summary.component';
import { CallLogsComponent } from './call-logs/call-logs.component';
import { MonthlyCareReportComponent } from './monthly-care-report/monthly-care-report.component';
import { AwvComponent } from './awv/awv.component';
import { SelfManagementPlanComponent } from './self-management-plan/self-management-plan.component';
import { DateTimeFilterComponent } from './date-time-filter/date-time-filter.component';
import { OptionalFieldModule } from 'src/app/shared/pipes/optional-field/optional-field.module';
import { SafeUrlModule } from 'src/app/shared/pipes/safe-url/safe-url.module';
import { SelectWithSearchModule } from 'src/app/shared/modules/select-with-search/select-with-search.module';
import { ErrorModule } from 'src/app/shared/modules/error/error.module';
import { NgPrimeModule } from 'src/app/ng-prime.module';
import { SummaryFilterComponent } from './summary-filter/summary-filter.component';
import { AddGoalComponent } from './self-management-plan/add-goal/add-goal.component';
import { ViewGoalComponent } from './self-management-plan/view-goal/view-goal.component';
import { VitalsGraphModule } from 'src/app/shared/modules/vitals-graph/vitals-graph.module';
import { SearchWithSelectDropdownModule } from 'src/app/shared/modules/search-with-select-dropdown/search-with-select-dropdown.module';
import { NumbersOnlyModule } from 'src/app/shared/directives/numbers-only/numbers-only.module';
import { GeneralNotesComponent } from './general-notes/general-notes.component';


const routes: Routes = [
  {
    path: LayoutRoutes.EMPTY,
    component: ViewPatientComponent,
  },
];

@NgModule({
  declarations: [
    ViewPatientComponent,
    VitalsComponent,
    MedicalConditionsComponent,
    AssessmentComponent,
    PatientSummaryComponent,
    CallLogsComponent,
    MonthlyCareReportComponent,
    AwvComponent,
    SelfManagementPlanComponent,
    DateTimeFilterComponent,
    SummaryFilterComponent,
    AddGoalComponent,
    ViewGoalComponent,
    GeneralNotesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DialogModule,
    JitsiModule,
    ReactiveFormsModule,
    FormsModule,
    OptionalFieldModule,
    SafeUrlModule,
    SelectWithSearchModule,
    ErrorModule,
    NgPrimeModule,
    VitalsGraphModule,
    SearchWithSelectDropdownModule,
    NumbersOnlyModule,
  ],
})
export class ViewPatientModule {}
