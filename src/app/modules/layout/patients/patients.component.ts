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
import * as FileSaver from 'file-saver';
import * as _ from 'lodash';
import { StorageKeys } from 'src/app/constants/storage';
import { PATIENTS_TAB } from 'src/app/enum/patients-tab';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  @ViewChild('searchText') searchTextRef:any;
  @ViewChild('p', {static: false}) paginator!: Paginator;
  patients: any[] = [];
  public _patientId: any = '';
  public _patient: any = [];
  public showCountMsg: any;
  FULL_ROUTES = FULL_ROUTES;
  filterGrp!: FormGroup;
  inputGrp!:FormGroup;
  totalRecords: any;
  currentPage = 1;
  outreachRadio: any = {};
  onShowAllPatient:boolean=false;
  show: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private loader: LoaderService,
    private toast: ToastService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this._patientId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.createFilterForm();
    this.getPatientsList();
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
    });
    this.httpService
      .get(URLS.PATIENT_LIST, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          this._patient = res.data.results;
          this.totalRecords = res.data.count;
          let rowCount = this.currentPage * 10;
          this.showCountMsg = ` Displaying <b>${
            rowCount >= res.data.count ? res.data.count : rowCount
          } </b> from  <b>${res.data.count}</b> data`;
          this.Onpage= 0;
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

  viewPatients(id: string) {
    localStorage.setItem(StorageKeys.TAB, PATIENTS_TAB.VITALS);
    this.router.navigate([FULL_ROUTES.PATIENTS, id]);
  }

  editPatients(id: string) {
    this.router.navigate([FULL_ROUTES.UPDATE_PATIENTS, id]);
  }

  public Onpage:any=0;
  paginate(event: any) {
    this.currentPage = event.page + 1;
    const payload = Object.assign({
      page: this.currentPage,
    });
    this.httpService
      .get(URLS.PATIENT_LIST, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          this._patient = res.data.results;
          this.totalRecords = res.data.count;
          this.Onpage = event.page;
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

  createFilterForm() {
    this.filterGrp = this.fb.group({
      sort_by: [],
      from_date: [],
      to_date: [],
    });

    this.inputGrp = this.fb.group({
      filter_provider:""
    })
  }

  submitFilter(ev: any, filter: any) {
    filter.toggle(ev);
    const payload = Object.assign({
      from_date: this.datePipe.transform(
        this.filterGrp.value.from_date,
        'yyyy-MM-dd'
      ),
      to_date: this.datePipe.transform(
        this.filterGrp.value.to_date,
        'yyyy-MM-dd'
      ),
    });
    this.httpService
      .get(URLS.PATIENT_LIST, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          this._patient = res.data.results;
          this.totalRecords = res.data.count;
          let rowCount = this.currentPage * 10;
          this.showCountMsg = ` Displaying <b>${
            rowCount >= res.data.count ? res.data.count : rowCount
          } </b> from  <b>${res.data.count}</b> data`;
          this.Onpage= 0;
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });
  }

  onSubmit(ev: any, filter: any){
    filter.toggle(ev);
    const payload = Object.assign({
      filter_provider : this.inputGrp.value.filter_provider,
    });
    this.httpService
      .get(URLS.PATIENT_LIST, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          this._patient = res.data.results;
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

  clearFilter(ev: any, filter: any) {
    this.currentPage = 1;
    filter.toggle(ev);
    this.filterGrp.reset();
    this.inputGrp.reset();
    this.getPatientsList();
  }

  getPatientsList(value?: string) {
    this.loader.showLoader();
    const payload = Object.assign({
      search: value,
    });
    this.httpService
      .get(URLS.PATIENT_LIST, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          this._patient = res.data.results;
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
      if (event.sortOrder == 1) {
        payload['ordering'] = event.sortField;
      } else {
        payload['ordering'] = '-' + event.sortField;
      }
      this.httpService
        .get(URLS.SORTINGPATIENT, RemoveEmptyKeys(payload))
        .subscribe({
          next: (res) => {
            this._patient = res.data.results;
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
  }

  addOutreach() {
    if (_.isEmpty(this.outreachRadio)) {
      this.toast.openErrorToast('Please select patient.');
      return;
    }
    this.router.navigate([FULL_ROUTES.ADD_OUTREACH], {
      queryParams: {
        patientId: this.outreachRadio.patient_id,
        name: this.outreachRadio.patient_name,
      },
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this._patient);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'patient');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
  // public first:any;
  showAllPatient(event:any){
    // this.first = 0;
    this.paginator.changePage(0);
    this.Onpage= 0;
    this.currentPage = 1;
    if(event && event.checked && event.checked.length){
      this.loader.showLoader();
      const payload = Object.assign({
        all_patient: 'all_patient',
      });
      this.httpService
        .get(URLS.PATIENT_LIST, RemoveEmptyKeys(payload))
        .subscribe({
          next: (res) => {
            this._patient = res.data.results;
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

    }else(
      this.getPatientsList()
    )
  }

  sortChange(event: any) {
    this.show = event.checked;
  }
}
