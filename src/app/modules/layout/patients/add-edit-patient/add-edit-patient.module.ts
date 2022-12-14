import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditPatientComponent } from './add-edit-patient.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { NgPrimeModule } from 'src/app/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LowerCaseModule } from 'src/app/shared/directives/lower-case/lower-case.module';
import { SafeUrlModule } from 'src/app/shared/pipes/safe-url/safe-url.module';
import { InputRestrictionModule } from 'src/app/shared/directives/input-restriction/input-restriction.module';
import { CharacterOnlyModule } from 'src/app/shared/directives/characters-only/characters-only.module';
import { NumbersOnlyModule } from 'src/app/shared/directives/numbers-only/numbers-only.module';
import {NgxMaskModule} from 'ngx-mask';
import { ErrorModule } from 'src/app/shared/modules/error/error.module';
import { SearchWithSelectDropdownModule } from 'src/app/shared/modules/search-with-select-dropdown/search-with-select-dropdown.module';
const routes: Routes = [
  {
    path: LayoutRoutes.EMPTY,
    component: AddEditPatientComponent,
  },
];

@NgModule({
  declarations: [AddEditPatientComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgPrimeModule,
    LowerCaseModule,
    SafeUrlModule,
    SearchWithSelectDropdownModule,
    InputRestrictionModule,
    CharacterOnlyModule,
    NumbersOnlyModule,
    NgxMaskModule.forRoot({
      showMaskTyped : false,
    }),
    ErrorModule
  ],
})
export class AddEditPatientModule {}
