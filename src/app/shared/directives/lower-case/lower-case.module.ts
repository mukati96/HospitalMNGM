import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LowerCaseDirective } from './lower-case.directive';


@NgModule({
  declarations: [
    LowerCaseDirective
  ],
  exports: [
    LowerCaseDirective
  ],
  imports: [
    CommonModule
  ]
})
export class LowerCaseModule { }
