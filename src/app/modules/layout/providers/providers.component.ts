import { Component, OnInit,AfterViewInit, ViewChild  } from '@angular/core';
import { FULL_ROUTES } from 'src/app/constants/routes';
import { URLS } from 'src/app/constants/url';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { DatePipe } from '@angular/common';
import { RemoveEmptyKeys } from 'src/app/_helpers/remove-empty-key';
import * as FileSaver from 'file-saver';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent implements OnInit {
  @ViewChild('searchText') searchTextRef:any;
  public _provider: any = [];
  public showCountMsg: any;
  filterGrp!: FormGroup;
  totalRecords: any;
  currentPage = 1;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private loader: LoaderService,
    private toast: ToastService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.createFilterForm();
    this.getProviderList();
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
      .get(URLS.CAREPROVIDER_LIST, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          this._provider = res.data.results;
          this.totalRecords = res.data.count;
          let rowCount = this.currentPage * 10;
          this.showCountMsg = ` Displaying <b>${rowCount >= res.data.count ? res.data.count : rowCount
            } </b> from  <b>${res.data.count}</b> data`;
            this.Onpage=0;
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

  viewProviders(id: string) {
    this.router.navigate([FULL_ROUTES.PROVIDERS, id]);
  }

  editproviders(id: string) {
    this.router.navigate([FULL_ROUTES.UPDATE_PROVIDERS, id]);
  }
  public Onpage:any=0;
  paginate(event: any) {
    this.Onpage = event.page;
    this.currentPage = event.page + 1;
    const payload = Object.assign({
      page: this.currentPage,
    });
    this.httpService
      .get(URLS.CAREPROVIDER_LIST, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          this._provider = res.data.results;
          this.totalRecords = res.data.count;
          let rowCount = this.currentPage * 10;
          this.showCountMsg = ` Displaying <b>${rowCount >= res.data.count ? res.data.count : rowCount
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
      .get(URLS.CAREPROVIDER_LIST, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          this._provider = res.data.results;
          this.totalRecords = res.data.count;
          let rowCount = this.currentPage * 10;
          this.Onpage=0;
          this.showCountMsg = ` Displaying <b>${rowCount >= res.data.count ? res.data.count : rowCount
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
    this.getProviderList();
  }

  getProviderList(value?: string) {
    this.loader.showLoader();
    const payload = Object.assign({
      search: value,
    });
    this.httpService
      .get(URLS.CAREPROVIDER_LIST, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          this._provider = res.data.results;
          this.totalRecords = res.data.count;
          let rowCount = this.currentPage * 10;
          this.showCountMsg = ` Displaying <b>${rowCount >= res.data.count ? res.data.count : rowCount
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
    event.sortField
    console.log(event)
    if(event){
      const payload:any= {};
      if(event.sortOrder == 1){
        payload['ordering'] = event.sortField;
      }else{
        payload['ordering'] = ('-'+event.sortField);
      }
      this.httpService
      .get(URLS.SORTPROVIDER, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          this._provider = res.data.results;
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

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this._provider);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'provider');
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
}
