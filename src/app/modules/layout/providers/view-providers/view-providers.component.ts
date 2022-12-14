import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FULL_ROUTES, LayoutRoutes } from 'src/app/constants/routes';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { CustomValidators } from 'src/app/_helpers/custom-validators';
import { RemoveEmptyKeys } from 'src/app/_helpers/remove-empty-key';
import { environment } from '../../../../../environments/environment';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-view-providers',
  templateUrl: './view-providers.component.html',
  styleUrls: ['./view-providers.component.scss'],
  providers: [ConfirmationService]
})
export class ViewProvidersComponent implements OnInit {
  public _careMgId: any = '';
  public ProviderData: any = {};
  public imgURL: any;
  public otherImgPath: any;
  public _patient: any = [];
  public showCountMsg: any;
  totalRecords: any;
  currentPage = 1;
  selectedPatient: any;
  public isSlectedPatient: boolean = false;
  public providerId: any;
  readonly FULL_ROUTES = FULL_ROUTES;
  public statsData: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private loader: LoaderService,
    private toast: ToastService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
  ) {
    this._careMgId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this._careMgId) {
      this.getProviderDetails();
    }
    this.viewProviderstats();
  }

  getProviderDetails() {
    this.loader.showLoader();
    this.httpService
      .get(`${URLS.GETCAREPROVIDER}${parseInt(this._careMgId)}`)
      .subscribe({
        next: (res) => {
          if (res.status_code === 200) {
            this.ProviderData = res.data;
            let npiArray: any = [];
            this.providerId = res.data.id;
            if (
              this.ProviderData &&
              this.ProviderData.profile_pic &&
              this.ProviderData.profile_pic != ''
            ) {
              let imgUrlServer: any = this.ProviderData.profile_pic;
              this.imgURL = imgUrlServer;
              let n = this.ProviderData.profile_pic.split('.');
              this.otherImgPath = n[n.length - 1];
            }
          }
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
        },
      });
  }

  paginate(event: any) {
    this.currentPage = event.page + 1;
    this.getPatientsList();
  }
  getPatientsList(value?: string) {
    this.loader.showLoader();
    let rowCount = this.currentPage * 10;
    let payload: any;
    if (value) {
      payload = Object.assign({
        search: value,
      });
    } else {
      payload = Object.assign({
        page: this.currentPage,
      });
    }
    this.httpService
      .get(URLS.GETPATIENTLISTFORCAREMANAGER, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          this._patient = res.data.results;
          this.totalRecords = res.data.count;

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

  checkPatientActiveOrDeactive() {
    if (this.isSlectedPatient) {
      this.selectedPatient = this.selectedPatient.filter((data: any) => {
        if (data['isactive'] != '0') {
          return data;
        }
      });
    } else {
      this.selectedPatient = [];
    }
  }

  displayAdminForm: boolean = false;
  closeAdminDialog() {
    this.displayAdminForm = false;
  }
  openAssPatinPopUp() {
    this.getPatientsList();
    this.selectedPatient = [];
    this.displayAdminForm = true;
  }


  getpatientCol(selectedPatient?: any) {
    this.loader.showLoader();
    let idArray: any = [];
    if (this.selectedPatient && this.selectedPatient.length) {
      this.selectedPatient.filter((data: any) => {
        idArray.push(data.patient_id);
      });
    }
    this.loader.hideLoader();
    let payload: any = {
      primary_provider: 1,
      patient: idArray,
    };
    this.confirmationService.confirm({
      message: 'Are you sure to add selected Patients ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.httpService.post(URLS.ADDMULTIPLEPATIENT, payload).subscribe({
          next: (res) => {
            this.loader.hideLoader();
            if (res.status_code === 200) {
              this.selectedPatient = [];
              this.displayAdminForm = false;
              this.toastService.openSuccessToast('Successfully added patients')
              // this.router.navigate([LayoutRoutes.HOSPITALS]);
            }
          },
          error: (err) => {
            this.loader.hideLoader();
            this.toast.openErrorToast(err.message);
          },
        });
      }
    })
  }


  viewProvider() {
    this.router.navigate([FULL_ROUTES.UPDATE_PROVIDERS, this._careMgId]);
  }

  viewProviderstats() {
    this.httpService
      .get(`${URLS.GETPROVIDERKEYSTATS}${this._careMgId}/`)
      .subscribe({
        next: (res) => {
          this.statsData = res.data;
        },
      });
  }
}
