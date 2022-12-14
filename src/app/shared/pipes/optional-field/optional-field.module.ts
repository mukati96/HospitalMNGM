import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { OptionalFieldPipe } from './optional-field.pipe';



@NgModule({
  declarations: [
    OptionalFieldPipe
  ],
  exports: [OptionalFieldPipe],
  imports: [
    CommonModule
  ],
  providers: [TitleCasePipe]
})
export class OptionalFieldModule { }
