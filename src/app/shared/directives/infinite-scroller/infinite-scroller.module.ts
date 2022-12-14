import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollerDirective } from './infinite-scroller.directive';



@NgModule({
  declarations: [
    InfiniteScrollerDirective
  ],
  exports: [
    InfiniteScrollerDirective
  ],
  imports: [
    CommonModule
  ]
})
export class InfiniteScrollerModule { }
