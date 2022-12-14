import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditDiseasComponent } from './add-edit-diseas.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes =[
  {
    path: LayoutRoutes.EMPTY,
    component: AddEditDiseasComponent
  }
]

@NgModule({
  declarations: [
    AddEditDiseasComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class AddEditDiseasModule { }
