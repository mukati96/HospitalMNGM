import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoughnutChartComponent } from './doughnut-chart.component';
import { ChartModule } from 'primeng/chart';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    DoughnutChartComponent
  ],
  exports: [
    DoughnutChartComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule
    //ChartModule
  ]
})
export class DoughnutChartModule { }
