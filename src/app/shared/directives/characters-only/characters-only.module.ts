import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterOnlyDirective } from './characters-only.directive';


@NgModule({
  declarations: [
    CharacterOnlyDirective
  ],
  exports: [
    CharacterOnlyDirective
  ],
  imports: [
    CommonModule
  ]
})
export class CharacterOnlyModule { }