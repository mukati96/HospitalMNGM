import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line-chart.component';
import { ChartModule } from 'primeng/chart';



@NgModule({
  declarations: [
    LineChartComponent
  ],
  exports: [
    LineChartComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ]
})
export class LineChartModule { }
