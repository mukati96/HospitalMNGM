import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { InputErrorPipe } from '../../pipes/input-error';

@NgModule({
  declarations: [
    ErrorComponent, InputErrorPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [ErrorComponent, InputErrorPipe]
})
export class ErrorModule { }
