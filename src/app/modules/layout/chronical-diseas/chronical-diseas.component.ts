import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FULL_ROUTES, LayoutRoutes } from 'src/app/constants/routes';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { RemoveEmptyKeys } from 'src/app/_helpers/remove-empty-key';
import * as FileSaver from 'file-saver';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';

declare const bootstrap: any;

interface chronicalDetails {
  disease_name: string;
  description: string;
}
@Component({
  selector: 'app-chronical-diseas',
  templateUrl: './chronical-diseas.component.html',
  styleUrls: ['./chronical-diseas.component.scss'],
  providers: [ConfirmationService]
})
export class ChronicalDiseasComponent {
  @ViewChild('searchText') searchTextRef: any;
  displayAddForm = false;
  showSubmitPopup = false;
  _popUpImage: string = '/assets/images/img-1.svg';
  _popUpBtnColour: string = '#00A040';
  chronical_diseas: any = [];
  selectedProducts3: any;
  selectedValues: any;
  public showCountMsg: any;
  totalRecords: any;
  checked: boolean = false;
  selectedDisease: string[] = [];
  public chronic!: chronicalDetails;
  public IsEditMedicationInfo: boolean = false;
  medicationSummary: any;
  chronic_conditions: any[] = [];
  rowIndex: any;
  chronicForm!: FormGroup;

  LayoutRoutes = LayoutRoutes;
  FULL_ROUTES = FULL_ROUTES;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private loader: LoaderService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
  ) {
    this.chronic = {} as chronicalDetails;
  }

  ngOnInit() {
    this.getChronicalDisease();
    this.initChronicalForm();
  }
  ngAfterViewInit() {
    if (this.searchTextRef) {
      fromEvent(this.searchTextRef.nativeElement, 'keyup')
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value) => {
          console.log(this.searchTextRef.nativeElement.value);
          this.loader.showLoader();
          let page: any = 1;
          let rowCount = page * 10;
          this.httpService
            .get(
              URLS.SEARCHCHRONICALDISEASE,
              RemoveEmptyKeys(this.searchTextRef.nativeElement.value)
            )
            .subscribe({
              next: (res) => {
                this.chronical_diseas = res.data.results;
                this.totalRecords = res.data.count;
                this.showCountMsg = ` Displaying <b>${rowCount >= res.data.count ? res.data.count : rowCount
                  } </b> from  <b>${res.data.count}</b> data`;
                this.Onpage = 0;
                this.loader.hideLoader();
              },
              error: (err) => {
                this.loader.hideLoader();
              },
            });
        });
    }
  }
  initChronicalForm() {
    this.chronicForm = new FormGroup({
      disease_name: new FormControl(this.chronic.disease_name, [
        Validators.required,
      ]),
      description: new FormControl(this.chronic.description, [
        Validators.required,
      ]),
    });
  }
  get H(): { [key: string]: AbstractControl } {
    return this.chronicForm.controls;
  }
  validateChronicForm() {
    if (this.chronicForm.invalid) {
      for (const control of Object.keys(this.chronicForm.controls)) {
        this.chronicForm.controls[control].markAsTouched();
      }
      return;
    }
    const fd = new FormData();
    const value: any = this.chronicForm.getRawValue();
    fd.append('disease_name', value.disease_name);
    fd.append('description', value.description);
    this.httpService.post(URLS.ADDCHRONICALCONIDITION, fd).subscribe({
      next: (res) => {
        this.toastService.openSuccessToast(
          'Chronic Disease Added Successfully.'
        );
        let myModalEl = document.getElementById('addCronic');
        let modal = bootstrap.Modal.getInstance(myModalEl);
        this.chronicForm.reset();
        modal.hide();
        this.getChronicalDisease();
      },
      error: (err) => {
        this.loader.hideLoader();
      },
    });
  }

  confirm(id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure to delete this Chronic Condition ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.httpService.delete(`${URLS.DELETECHRONICDISEASE}${id}/`).subscribe({
          next: (res) => {
            this.toastService.openSuccessToast('Successfully deleted')
            this.getChronicalDisease();
          },
          error: (err) => {
            this.toastService.openErrorToast('Unable to delete.');
          }
        });
      },
    });
  }

  openChronicInfoPopUp() {
    this.IsEditMedicationInfo = false;
    this.chronicForm.reset();
  }

  chronicObj: any = {};
  editChronicInfo(obj: any) {
    if (obj) {
      this.IsEditMedicationInfo = true;
      this.chronical_diseas.filter((data: any) => {
        if (data.disease_name === obj.disease_name) {
          this.chronicObj = data;
        }
      });
      this.chronicForm.patchValue({
        disease_name: this.chronicObj.disease_name,
        description: this.chronicObj.description,
      });
    }
  }

  UpdateChronicInfo() {
    if (this.chronicForm.invalid) {
      for (const control of Object.keys(this.chronicForm.controls)) {
        this.chronicForm.controls[control].markAsTouched();
      }
      return;
    }
    let _payload = Object.assign(this.chronicForm.value, {
      id: this.chronicObj.id,
    });
    if (this.chronicObj.id) {
      this.httpService
        .put(`${URLS.UPDATECHRONICDISEASE}${this.chronicObj.id}/`, _payload)
        .subscribe({
          next: (res: any) => {
            this.IsEditMedicationInfo = false;
            this.getChronicalDisease();
            let myModalEl = document.getElementById('addCronic');
            let modal = bootstrap.Modal.getInstance(myModalEl);
            this.chronicForm.reset();
            modal.hide();
          },
          error: (err: any) => {
            this.toastService.openErrorToast('Chronic Condition not updated.');
          },
        });
    }
  }
  getChronicalDisease(event?: any) {
    this.loader.showLoader();
    if (event) {
      let page = event.page + 1;
      let rowCount = page * 10;
      const url = `${URLS.GETCHRONICALDISEASE}` + '?page=' + `${page}`;
      this.httpService.get(url).subscribe({
        next: (res) => {
          this.totalRecords = res.data.count;
          this.chronical_diseas = res.data.results;
          this.showCountMsg = ` Displaying <b>${rowCount >= res.data.count ? res.data.count : rowCount
            } </b> from  <b>${res.data.count}</b> data`;
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
        },
      });
    } else {
      let page: any = 1;
      let rowCount = page * 10;
      this.httpService.get(URLS.GETCHRONICALDISEASE).subscribe({
        next: (res) => {
          this.chronical_diseas = res.data.results;
          this.totalRecords = res.data.count;
          this.showCountMsg = ` Displaying <b>${rowCount >= res.data.count ? res.data.count : rowCount
            } </b> from  <b>${res.data.count}</b> data`;
          this.loader.hideLoader();
        },
        error: (err: any) => {
          this.loader.hideLoader();
        },
      });
    }
  }

  public Onpage: any = 0;
  paginate(event: any) {
    this.Onpage = event.page;
    this.getChronicalDisease(event);
  }

  customSort(event: any) {
    if (event) {
      const payload: any = {};
      if (event.sortOrder == 1) {
        payload['ordering'] = event.sortField;
      } else {
        payload['ordering'] = '-' + event.sortField;
      }
      let page: any = 1;
      let rowCount = page * 10;
      this.httpService
        .get(URLS.SORTCHRONICALDISEASE, RemoveEmptyKeys(payload))
        .subscribe({
          next: (res) => {
            this.chronical_diseas = res.data.results;
            this.totalRecords = res.data.count;
            this.showCountMsg = ` Displaying <b>${rowCount >= res.data.count ? res.data.count : rowCount
              } </b> from  <b>${res.data.count}</b> data`;
            this.loader.hideLoader();
          },
          error: (err) => {
            this.loader.hideLoader();
          },
        });
    }
  }

  // search(value?: string) {
  //   this.loader.showLoader();
  //   const payload = Object.assign({
  //     search: value,
  //   });
  //   let page: any = 1;
  //   let rowCount = page * 10;
  //   this.httpService
  //     .get(URLS.SEARCHCHRONICALDISEASE, RemoveEmptyKeys(payload))
  //     .subscribe({
  //       next: (res) => {
  //         this.chronical_diseas = res.data.results;
  //         this.totalRecords = res.data.count;
  //         this.showCountMsg = ` Displaying <b>${
  //           rowCount >= res.data.count ? res.data.count : rowCount
  //         } </b> from  <b>${res.data.count}</b> data`;
  //         this.loader.hideLoader();
  //       },
  //       error: (err) => {
  //         this.loader.hideLoader();
  //       },
  //     });
  // }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.chronical_diseas);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'chronicalDiseas');
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
  closePopUp(){
    let myModalEl = document.getElementById('addCronic')
    let modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
  }
}
