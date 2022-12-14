import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FULL_ROUTES } from 'src/app/constants/routes';
import { URLS } from 'src/app/constants/url';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RemoveEmptyKeys } from 'src/app/_helpers/remove-empty-key';
import { ToastService } from 'src/app/services/toast.service';
import { DatePipe } from '@angular/common';
import { SortEvent } from 'primeng/api';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-outreach',
  templateUrl: './outreach.component.html',
  styleUrls: ['./outreach.component.scss'],
})
export class OutreachComponent implements OnInit {
  @ViewChild('searchText') searchTextRef:any;
  public outreachData: any = [];
  public showCountMsg: any;
  filterGrp!: FormGroup;
  totalRecords: any;
  currentPage = 1;
  _patientDict: any;
  dataaa: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private loader: LoaderService,
    private toast: ToastService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.createFilterForm();
    this.getoutreachList();
    this._patientDict = this.route.snapshot.queryParams;
  }
  ngAfterViewInit() {
    if (this.searchTextRef) {
      fromEvent(this.searchTextRef.nativeElement, 'keyup')
        .pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(value =>{ console.log(this.searchTextRef.nativeElement.value)
          this.loader.showLoader();
    const payload = Object.assign({
      search: this.searchTextRef.nativeElement.value,
      page: this.currentPage,
    });
    this.httpService.get(URLS.GETOUTREACH, RemoveEmptyKeys(payload)).subscribe({
      next: (res) => {
        this.outreachData = res.data.results;
        this.totalRecords = res.data.count;
        let rowCount = this.currentPage * 10;
        this.showCountMsg = ` Displaying <b>${
          rowCount >= res.data.count ? res.data.count : rowCount
        } </b> from  <b>${res.data.count}</b> data`;
        this.Onpage = 0;
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
    })
    }
  }

  // viewPatients(id: string) {
  //   this.router.navigate([FULL_ROUTES.PATIENTS, id]);
  // }

  // editPatients(id: string) {
  //   this.router.navigate([FULL_ROUTES.UPDATE_PATIENTS, id]);
  // }

  public Onpage:any=0;
  paginate(event: any) {
    this.Onpage = event.page;
    this.currentPage = event.page + 1;
    this.getoutreachList();
  }

  createFilterForm() {
    this.filterGrp = this.fb.group({
      sort_by: [],
      from_date: [],
      to_date: [],
    });
  }

  submitFilter(ev: any, filter: any) {
    filter.toggle(ev);
    this.getoutreachList();
  }

  clearFilter(ev: any, filter: any) {
    this.currentPage = 1;
    filter.toggle(ev);
    this.filterGrp.reset();
    this.getoutreachList();
  }

  getoutreachList(value?: string) {
    this.loader.showLoader();
    const payload = Object.assign({
      search: value,
      page: this.currentPage,
    });
    this.httpService.get(URLS.GETOUTREACH, RemoveEmptyKeys(payload)).subscribe({
      next: (res) => {
        this.outreachData = res.data.results;
        this.totalRecords = res.data.count;
        let rowCount = this.currentPage * 10;
        this.showCountMsg = ` Displaying <b>${
          rowCount >= res.data.count ? res.data.count : rowCount
        } </b> from  <b>${res.data.count}</b> data`;
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  customSort(event: any) {
    if (event) {
      const payload: any = {};
      if (event.order == 1) {
        payload['ordering'] = event.field;
      } else {
        payload['ordering'] = '-' + event.field;
      }
      this.httpService
        .get(URLS.SORTOUTREACH, RemoveEmptyKeys(payload))
        .subscribe({
          next: (res) => {
            this.outreachData = res.data.results;
            // this.totalRecords = res.data.count;
            // let rowCount = this.currentPage * 10;
            // this.showCountMsg = ` Displaying <b>${
            //   rowCount >= res.data.count ? res.data.count : rowCount
            // } </b> from  <b>${res.data.count}</b> data`;
            this.loader.hideLoader();
          },
          error: (err) => {
            this.loader.hideLoader();
            this.toast.openErrorToast(err.message);
          },
        });
    }
  }
}
