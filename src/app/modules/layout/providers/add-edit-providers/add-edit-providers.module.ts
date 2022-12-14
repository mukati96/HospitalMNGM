import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditProvidersComponent } from './add-edit-providers.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPrimeModule } from 'src/app/ng-prime.module';
import { LowerCaseModule } from 'src/app/shared/directives/lower-case/lower-case.module';
import { SafeUrlModule } from 'src/app/shared/pipes/safe-url/safe-url.module';
import { SelectWithSearchModule } from 'src/app/shared/modules/select-with-search/select-with-search.module';
import { NgxMaskModule } from 'ngx-mask';
import { SearchWithSelectDropdownModule } from 'src/app/shared/modules/search-with-select-dropdown/search-with-select-dropdown.module';
import { SearchWithPaginationModule } from 'src/app/shared/modules/search-with-pagination/search-with-pagination.module';

const routes: Routes = [
  {
    path: LayoutRoutes.EMPTY,
    component: AddEditProvidersComponent,
  },
];

@NgModule({
  declarations: [AddEditProvidersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgPrimeModule,
    LowerCaseModule,
    SafeUrlModule,
    SelectWithSearchModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forRoot({
      showMaskTyped : false,
    }),
    SearchWithSelectDropdownModule,
    SearchWithPaginationModule
  ],
})
export class AddEditProvidersModule {}
