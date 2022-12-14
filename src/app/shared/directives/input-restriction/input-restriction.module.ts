import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRestrictionDirective } from './input-restriction.directive';

@NgModule({
  declarations: [InputRestrictionDirective],
  exports: [InputRestrictionDirective],
  imports: [CommonModule],
})
export class InputRestrictionModule {}
