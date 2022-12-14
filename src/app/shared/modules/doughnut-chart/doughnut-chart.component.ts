import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries[];
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit {
  @Input() chartData: any;
  @ViewChild("chart",{ static: false }) chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions = {
      series: [
        (this.chartData?.completed_patients || 0),
        (this.chartData?.enroll_patients || 0),
        (this.chartData?.inactive_patients || 0),
        (this.chartData?.total_Patients || 0),
        (this.chartData?.care_manager_total_count || 0),
        (this.chartData?.patient_total_count || 0),
        (this.chartData?.provider_total_count || 0)
      ],
      pieHole: 0.5,
      chart: {
        type: 'donut',
        width: '210px',
        height: '210px',
      },
      labels: ['Completed patients', 'Enroll patients', 'Inactive patients', 'Total Patients', 'care manager total count', 'patient total count','provider total count'],
      colors: ['#1bd0dc', '#361bdc', '#dc1b1b', '#dc831b', '#9FE2BF', '#1bdc68'], // add this part to modify colours
      legend: {
        show: false,
        position: 'bottom',
        horizontalAlign: 'center'
      },
      dataLabels: { // add this part to remove %
        enabled: true,
      }
    };

  }
}
