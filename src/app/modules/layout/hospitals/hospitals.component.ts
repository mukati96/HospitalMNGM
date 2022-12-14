import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { FULL_ROUTES, LayoutRoutes } from 'src/app/constants/routes';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss'],
})
export class HospitalsComponent implements OnInit {
  @ViewChild('searchText') searchTextRef:any;
  public _hospitals: [] = [];
  public showCountMsg: any;
  totalRecords: any;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.getHospitals();
  }

  ngAfterViewInit() {
    if (this.searchTextRef) {
      fromEvent(this.searchTextRef.nativeElement, 'keyup')
        .pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(value =>{ console.log(this.searchTextRef.nativeElement.value)
          const url =
          `${URLS.GETHOSPITALLIST}` + '?hospital_name=' + `${this.searchTextRef.nativeElement.value}`;
        this.httpService.get(url).subscribe({
          next: (res) => {
            if (res.status_code === 200) {
              this._hospitals = res.data.results;
              this.Onpage =0;
            }
          },
          error: (err) => {
            console.log(err.message);
          },
        });
    })
    }
  }
  getHospitals(event?: any) {
    this.loader.showLoader();
    if (event) {
      let page = event.page + 1;
      let rowCount = page * 10;
      const url = `${URLS.GETHOSPITALLIST}` + '?page=' + `${page}`;
      this.httpService.get(url).subscribe({
        next: (res) => {
          this.totalRecords = res.data.count;
          this._hospitals = res.data.results;
          this.showCountMsg = ` Displaying <b>${
            rowCount >= res.data.count ? res.data.count : rowCount
          } </b> from  <b>${res.data.count}</b> data`;
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
        },
      });
    } else {
      this.httpService.get(URLS.GETHOSPITALLIST).subscribe({
        next: (res) => {
          this.totalRecords = res.data.count;
          this._hospitals = res.data.results;
          this.showCountMsg = ` Displaying <b>${res.data.results.length}</b> from  <b>${res.data.count}</b> data`;
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
        },
      });
    }
  }

  // seachHospital(event: any) {
  //   const url =
  //     `${URLS.GETHOSPITALLIST}` + '?hospital_name=' + `${event.target.value}`;
  //   this.httpService.get(url).subscribe({
  //     next: (res) => {
  //       if (res.status_code === 200) {
  //         this._hospitals = res.data.results;
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err.message);
  //     },
  //   });
  // }

  viewHosital(id: string) {
    this.router.navigate([FULL_ROUTES.HOSPITALS, id]);
  }

  editHosital(id: string) {
    this.router.navigate([FULL_ROUTES.UPDATE_HOSPITALS, id]);
  }

  deleteHosital(id: string) {
    this.httpService.delete(`${URLS.DELETEHOSPITAL}${parseInt(id)}`).subscribe({
      next: (res: any) => {
        if (res.status_code === 200) {
          this.getHospitals();
        }
      },
      error: (err: any) => {
      },
    });
  }

  public Onpage:any=0;
  paginate(event: any) {
    this.Onpage = event.page;
    this.getHospitals(event);
  }
}
