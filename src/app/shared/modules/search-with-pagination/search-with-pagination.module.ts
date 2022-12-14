import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchWithPaginationComponent } from './search-with-pagination.component';
import { NgPrimeModule } from 'src/app/ng-prime.module';
import { InfiniteScrollerModule } from '../../directives/infinite-scroller/infinite-scroller.module';


@NgModule({
  declarations: [
    SearchWithPaginationComponent
  ],
  exports: [
    SearchWithPaginationComponent
  ],
  imports: [
    CommonModule,
    NgPrimeModule,
    InfiniteScrollerModule
  ]
})
export class SearchWithPaginationModule { }
