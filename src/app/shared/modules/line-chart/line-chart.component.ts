import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { URLS } from 'src/app/constants/url';
import { Router } from '@angular/router';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  lineStylesData: any;
  multiAxisOptions: any;
  public _lineChartDetail:any

  constructor(
    private httpService: HttpService,
     private router: Router) { }

  ngOnInit(): void {
   this.lineChartDetail()
    this.lineStylesData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          data: [12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: '#FF55BE',
          borderWidth: 2,
          tension: .4,
          pointBackgroundColor: '#0000',
          pointBorderWidth: 0,
          backgroundColor: '#FF55BE4A',
        }, {
          data: [23, 1, 6, 33, 1, 2, 45],
          fill: true,
          borderColor: '#e60348',
          borderWidth: 2,
          tension: .4,
          pointBackgroundColor: '#0000',
          pointBorderWidth: 0,
          backgroundColor: '#2c2525',
        }, {
          data: [6, 50, 7, 13, 2, 72, 15],
          fill: true,
          borderColor: '#3c248f',
          borderWidth: 2,
          tension: .4,
          pointBackgroundColor: '#0000',
          pointBorderWidth: 0,
          backgroundColor: '#1dcd34',
        },
      ],
    };

    this.multiAxisOptions = {
      stacked: false,
      plugins: {
          legend: {
            display:false,
          },
      },
      scales: {
        x: {
          grid: {
            color: '#0000',
          },
        },
        y: {
          type: 'linear',
          display: false,
          position: 'left',
        }
      }
    };
  }

  lineChartDetail() {
    this.httpService.get(URLS.GETLINECHARTDETAIL).subscribe({
      next: (res) => {
        if (res.status_code === 200) {
          this._lineChartDetail = res.data;
          console.log(this._lineChartDetail);
        }
      },
      error: (err) => {
      },
    });
  }

}
