import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JitsiComponent } from './jitsi.component';



@NgModule({
  declarations: [
    JitsiComponent
  ],
  exports: [
    JitsiComponent
  ],
  imports: [
    CommonModule
  ]
})
export class JitsiModule { }
