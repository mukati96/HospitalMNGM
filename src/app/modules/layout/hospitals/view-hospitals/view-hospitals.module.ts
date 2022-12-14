import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewHospitalsComponent } from './view-hospitals.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPrimeModule } from 'src/app/ng-prime.module';
import { LowerCaseModule } from 'src/app/shared/directives/lower-case/lower-case.module';
import { SafeUrlModule } from 'src/app/shared/pipes/safe-url/safe-url.module';
import { SelectWithSearchModule } from 'src/app/shared/modules/select-with-search/select-with-search.module';
import { NgxMaskModule } from 'ngx-mask';
import { TitleCasePipe } from '@angular/common';
import { ErrorModule } from "../../../../shared/modules/error/error.module";
import { OptionalFieldModule } from 'src/app/shared/pipes/optional-field/optional-field.module';

const routes: Routes = [
  {
    path: LayoutRoutes.EMPTY,
    component: ViewHospitalsComponent,
  },
];

@NgModule({
    declarations: [ViewHospitalsComponent],
    providers: [TitleCasePipe],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OptionalFieldModule,
        NgPrimeModule,
        LowerCaseModule,
        RouterModule.forChild(routes),
        SafeUrlModule,
        SelectWithSearchModule,
        NgxMaskModule.forRoot({
            showMaskTyped: false,
        }),
        ErrorModule
    ]
})
export class ViewHospitalsModule {}
