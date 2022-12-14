import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VitalsGraphComponent } from './vitals-graph.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    VitalsGraphComponent
  ],
  exports: [
    VitalsGraphComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule
  ]
})
export class VitalsGraphModule { }
