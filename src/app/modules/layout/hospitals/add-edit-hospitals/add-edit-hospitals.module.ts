import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditHospitalsComponent } from './add-edit-hospitals.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { NgPrimeModule } from 'src/app/ng-prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeUrlModule } from 'src/app/shared/pipes/safe-url/safe-url.module';
import { LowerCaseModule } from 'src/app/shared/directives/lower-case/lower-case.module';
import { InputRestrictionModule } from 'src/app/shared/directives/input-restriction/input-restriction.module';
import { SelectWithSearchModule } from 'src/app/shared/modules/select-with-search/select-with-search.module';
import { NumbersOnlyModule } from 'src/app/shared/directives/numbers-only/numbers-only.module';
import { CharacterOnlyModule } from 'src/app/shared/directives/characters-only/characters-only.module';
import {NgxMaskModule} from 'ngx-mask';
import { SearchWithSelectDropdownModule } from 'src/app/shared/modules/search-with-select-dropdown/search-with-select-dropdown.module';
const routes: Routes = [
  {
    path: LayoutRoutes.EMPTY,
    component: AddEditHospitalsComponent,
  },
];

@NgModule({
  declarations: [AddEditHospitalsComponent],
  imports: [
    CommonModule,
    NgPrimeModule,
    FormsModule,
    ReactiveFormsModule,
    SafeUrlModule,
    LowerCaseModule,
    InputRestrictionModule,
    RouterModule.forChild(routes),
    SelectWithSearchModule,
    NumbersOnlyModule,
    CharacterOnlyModule,
    SearchWithSelectDropdownModule,
    NgxMaskModule.forRoot({
      showMaskTyped : false,
    })
  ],
})
export class AddEditHospitalsModule {}
