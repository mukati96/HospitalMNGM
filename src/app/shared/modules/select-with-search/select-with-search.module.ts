import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectWithSearchComponent } from './select-with-search.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    SelectWithSearchComponent
  ],
  exports: [
    SelectWithSearchComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule
  ]
})
export class SelectWithSearchModule { }
