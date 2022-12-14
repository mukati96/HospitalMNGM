import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from './safe-url.pipe';



@NgModule({
  declarations: [
    SafeUrlPipe
  ],
  exports: [
    SafeUrlPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SafeUrlModule { }
