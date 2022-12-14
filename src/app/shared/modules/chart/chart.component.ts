import { Component, ViewChild } from "@angular/core";
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
import { SERIESDUMMYDATA } from "src/app/constants/series";
import { StorageKeys } from "src/app/constants/storage";
import { URLS } from "src/app/constants/url";
import { ROLES } from "src/app/enum/roles";
import { AppStateService } from "src/app/services/app-state.service";
import { HttpService } from "src/app/services/http.service";
import { StorageService } from "src/app/services/storage.service";
import { data } from "./chart-data";

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
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @ViewChild("chart", { static: false }) chart!: ChartComponentE;
  currentRole!: ROLES;
  ROLES = ROLES;
  public chartOptions!: Partial<ChartOptions> | any;
  role: ROLES = this.storage.getFromLocalStorage(StorageKeys.ROLE);
  // public updateOptionsData = {
  //   "1m": {
  //     xaxis: {
  //       min: undefined,
  //       max: undefined
  //     }
  //   },
  //   "6m": {
  //     xaxis: {
  //       min: this.addMonths(new Date(), 0).getTime(),
  //       max: this.addMonths(new Date(), 6).getTime()
  //     }
  //   },
  //   "1y": {
  //     xaxis: {
  //       min: this.addMonths(new Date(), 0).getTime(),
  //       max: this.addMonths(new Date(), 12).getTime()
  //     }
  //   },
  // };
  public updateOptionsData = {
    "1m": {
      xaxis: {
        min: new Date("28 Jan 2013").getTime(),
        max: new Date("27 Feb 2013").getTime()
      }
      // xaxis: {
      //   min: undefined,
      //   max: undefined
      // }
    },
    "6m": {
      xaxis: {
        min: new Date("27 Sep 2012").getTime(),
        max: new Date("27 Feb 2013").getTime()
      }
    },
    "1y": {
        xaxis: {
          min: new Date("27 Feb 2012").getTime(),
          max: new Date("27 Feb 2013").getTime()
        }
    },
    "all": {
      xaxis: {
        min: undefined,
        max: undefined
      }
  },
  };
  seriesData: any[] = [];

  constructor(private storage: StorageService, private httpService: HttpService,private appState: AppStateService) {
    this.lineChartDetail();
    this.currentRole = this.appState.getRole();
  }

  lineChartDetail() {
    this.httpService.get(URLS.GETLINECHARTDETAIL).subscribe({
      next: (res) => {
        res.data.forEach((e: any, i:number) => {
          const payload: any = {};
          const arrObject: any[] = Object.entries(e).map(m => m);
          let data: any = Object.entries(arrObject[0][1]);
          const updatedDataArray: any = [];
            for (const key in data[0][1]) {
              const timestamp: any = new Date(parseInt(key) * 1000);
              const dateString = timestamp.toGMTString();
              const value = data[0][1][key];
              updatedDataArray.push([dateString, value]);
            }
          if(i === 0 && this.role === ROLES.SUPERADMIN) {
            payload.color = '#FF55BE';
            payload.name = 'Practices';
            payload.data = updatedDataArray;
            this.seriesData.push(payload);
          } else if(i === 1) {
            payload.color = '#55d6ff';
            payload.name = 'Providers';
            payload.data = updatedDataArray;
            this.seriesData.push(payload);
          } else if(i === 2) {
            payload.color = '#5f5bfe';
            payload.name = 'Patients';
            payload.data = updatedDataArray;
            this.seriesData.push(payload);
          }
          this.initChart();
        });
      },
      error: (err) => {
      },
    });
  }

  initChart(): void {
    this.chartOptions = {
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      //series: this.seriesData,
      series: [
        {
          data:SERIESDUMMYDATA,
          color: '#FF55BE',
          name: 'Practices'
        },
        {
          data:SERIESDUMMYDATA,
          color : '#55d6ff',
          name : 'Patients',
        },
        {
          data:SERIESDUMMYDATA,
          color : '#5f5bfe',
          name : 'Providers',
        }
      ],

      chart: {
        type: "area",
        height: 260,
        sparkline: false,
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          autoScaleYaxis: true,
        },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: "datetime",
        min: new Date("01 Mar 2012").getTime(),
        
      },
      yaxis: {
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        },
        labels: {
          show: true,
          formatter: function (value:any) {
            return parseInt(value).toLocaleString()
          },
        },
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
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
          left: 15,
          right:15,
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
      legend: {
        position: "bottom",
        horizontalAlign: "center"
      },
  
    };
  }

  public sortOptionMonthly(): void {
    this.chart.updateOptions(this.updateOptionsData['1m'], false, true, true);
  }

  public sortOptionQuarterly(): void {
    this.chart.updateOptions(this.updateOptionsData['6m'], false, true, true);
  }
  public sortOptionYearly(): void {
    this.chart.updateOptions(this.updateOptionsData['1y'], false, true, true);
  }
  public sortOptionAll(): void {
    this.chart.updateOptions(this.updateOptionsData['all'], false, true, true);
  }


  sortByDate(ev: any) {
    if(ev.target.value === 'monthly') {
      this.sortOptionMonthly();
    } else if(ev.target.value === 'quaterly') {
      this.sortOptionQuarterly();
    } else if(ev.target.value === 'yearly') {
      this.sortOptionYearly();
    }  else if(ev.target.value === 'all') {
      this.sortOptionAll();
    }
  }

  addMonths(dt: any, n: number): Date {
    return new Date(dt.setMonth(dt.getMonth() + n));
  }
}
