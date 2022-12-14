import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditOutreachComponent } from './add-edit-outreach.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { ReactiveFormsModule } from '@angular/forms';
import { CharacterOnlyModule } from 'src/app/shared/directives/characters-only/characters-only.module';
import { NumbersOnlyModule } from 'src/app/shared/directives/numbers-only/numbers-only.module';
import { NgPrimeModule } from 'src/app/ng-prime.module';

const routes: Routes = [
  {
    path: LayoutRoutes.EMPTY,
    component: AddEditOutreachComponent
  }
]


@NgModule({
  declarations: [
    AddEditOutreachComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CharacterOnlyModule,
    NumbersOnlyModule,
    NgPrimeModule
  ]
})
export class AddEditOutreachModule { }
