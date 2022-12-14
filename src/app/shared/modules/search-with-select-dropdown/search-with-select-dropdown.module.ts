import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchWithSelectDropdownComponent } from './search-with-select-dropdown.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    SearchWithSelectDropdownComponent
  ],
  exports: [
    SearchWithSelectDropdownComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule
  ]
})
export class SearchWithSelectDropdownModule { }
