import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { NgApexchartsModule } from "ng-apexcharts";


@NgModule({
  declarations: [
    ChartComponent
  ],
  exports: [
    ChartComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule
  ]
})
export class ChartModule { }
