import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  ChartComponent as ChartComponentE,
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexStroke,
  ApexLegend
} from "ng-apexcharts";
import { StorageService } from "src/app/services/storage.service";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-vitals-graph',
  templateUrl: './vitals-graph.component.html',
  styleUrls: ['./vitals-graph.component.scss']
})
export class VitalsGraphComponent implements OnInit {
  @Input() data: number[] = [];
  @Input() colorCode: string = '#FF55BE';
  @Input() label: string = '';
  @ViewChild("chart", { static: false }) chart!: ChartComponentE;
  public chartOptions!: Partial<ChartOptions> | any;
  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.initChart();
  }

  initChart(): void {
    this.chartOptions = {
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      series: [
        {
          color: this.colorCode,
          data: this.data,
          name: this.label
        },
      ],
      chart: {
        height: 180,
        type: "area",
        stacked: true,
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: true
        }
        // zoom: {
        //   autoScaleYaxis: true,
        // },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [],
        labels: {
          show: false
        },
      },
      yaxis: {
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        },
        labels: {
          show: false
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      },
      grid: {
        padding: {
          left: -10,
          right: -10,
        },
        show: false,      // you can either change hear to disable all grids
        xaxis: {
          lines: {
            show: false  //or just here to disable only x axis grids
           }
         },
        yaxis: {
          lines: {
            show: false  //or just here to disable only y axis
           }
         },
      },
    };
  }
}
