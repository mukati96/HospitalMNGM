import { DatePipe } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FULL_ROUTES } from 'src/app/constants/routes';
import { URLS } from 'src/app/constants/url';
import { ROLES } from 'src/app/enum/roles';
import { AppStateService } from 'src/app/services/app-state.service';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { RemoveEmptyKeys } from 'src/app/_helpers/remove-empty-key';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss'],
})
export class SuperAdminComponent implements OnInit {
  @ViewChild('searchText') searchTextRef:any;
  ROLES = ROLES;
  FULL_ROUTES = FULL_ROUTES;
  public patients: any = [];
  public _hospitals: [] = [];
  public _countDetail: any = {};
  cuurentRole!: ROLES;
  filterGrp!:FormGroup

  constructor(
    private appState: AppStateService,
    private httpService: HttpService,
    private loader: LoaderService,
    private toast: ToastService,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.createFilterForm();
    this.getHospitalsList();
    this.getCountDetail();
    this.cuurentRole = this.appState.getRole();
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
            from_date: this.datePipe.transform(this.filterGrp.value.from_date, 'YYYY-MM-dd'),
            to_date: this.datePipe.transform(this.filterGrp.value.to_date, 'YYYY-MM-dd'),
            sort_by: this.filterGrp.value.sort_by
          });
          this.httpService.get(URLS.GETHOSPITALDATALIST, RemoveEmptyKeys(payload)).subscribe({
            next: (res) => {
              this.loader.hideLoader();
              this._hospitals = res.data.data.slice(0, 5);
            },
            error: (err) => {
              this.loader.hideLoader();
              this.toast.openErrorToast(err.message);
            },
          });   
    })
    }
  }

  getHospitalsList(value?: string) {
    this.loader.showLoader();
    const payload = Object.assign({
      search: value,
      from_date: this.datePipe.transform(this.filterGrp.value.from_date, 'YYYY-MM-dd'),
      to_date: this.datePipe.transform(this.filterGrp.value.to_date, 'YYYY-MM-dd'),
      sort_by: this.filterGrp.value.sort_by
    });
    this.httpService.get(URLS.GETHOSPITALDATALIST, RemoveEmptyKeys(payload)).subscribe({
      next: (res) => {
        this.loader.hideLoader();
        this._hospitals = res.data.data.slice(0, 10);
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  getCountDetail() {
    this.httpService.get(URLS.GETCOUNTDETAIL).subscribe({
      next: (res) => {
        if (res.status_code === 200) {
          this._countDetail = res.data;
        }
      },
      error: (err) => {
        this.toast.openErrorToast(err.message);
      },
    });
  }
  viewHosital(id: string) {
    this.router.navigate([FULL_ROUTES.HOSPITALS, id]);
  }

  editHosital(id: string) {
    this.router.navigate([FULL_ROUTES.UPDATE_HOSPITALS, id]);
  }

  deleteHosital(id: string) {
    this.loader.showLoader();
    this.httpService.delete(`${URLS.DELETEHOSPITAL}${parseInt(id)}`).subscribe({
      next: (res: any) => {
        if (res.status_code === 200) {
          this.toast.openSuccessToast('Successfully deleted');
          this.getHospitalsList();
        }
        this.loader.hideLoader();
      },
      error: (err: any) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  createFilterForm() {
    this.filterGrp = this.fb.group({
      sort_by: [],
      from_date: [],
      to_date: []
    })
  }

  submitFilter(ev: any, filter: any) {
    filter.toggle(ev);
    this.getHospitalsList();
  }

  clearFilter(ev: any, filter: any) {
    filter.toggle(ev);
    this.filterGrp.reset();
    this.getHospitalsList();
  }
}
