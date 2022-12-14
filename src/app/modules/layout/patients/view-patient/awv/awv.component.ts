import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';
import { StorageService } from 'src/app/services/storage.service';
declare var jQuery: any;
declare const bootstrap: any;

interface avwDetails {
  services_and_Screening_name: string;
  date_of_last_services: string;
  annual_wellness_status: string;
  notes:string;
}

@Component({
  selector: 'app-awv',
  templateUrl: './awv.component.html',
  styleUrls: ['./awv.component.scss'],
})
export class AwvComponent implements OnInit {
  public _awvList: any = [];
  avwForm!: FormGroup;
  avw!: avwDetails;
  public _screenList:any= [];
  @Input() patientId: any;
  public IsEditScreeningInfo: boolean = false;
  currentStringDate = moment(new Date()).format('YYYY-MM-DD');
  _hospitalStatus: any;


  constructor(
    private router: Router,
    private http: HttpService,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private toast: ToastService,
    private storageService: StorageService
  ) {
    this.avw = {} as avwDetails;
    this._hospitalStatus = [
      { value: 'MET', label: 'Met' },
      { value: 'NOT-MET', label: 'Not-Met' },
      { value: 'EXCLUDED', label: 'Excluded' },
    ];
  }

  ngOnInit(): void {
    this.initProvidersForm();
    this.getAWV();
    this.getScreening();
    this.storageService.awvDataObservable.asObservable().subscribe((res:any) => {
      this._awvList = res;
     });
  }

  initProvidersForm() {
    this.avwForm = new FormGroup({
      services_and_Screening_name: new FormControl(
        this.avw.services_and_Screening_name,
        [Validators.required]
      ),
      date_of_last_services: new FormControl(this.avw.date_of_last_services, [
        Validators.required,
      ]),
      annual_wellness_status: new FormControl(this.avw.annual_wellness_status, [
        Validators.required,
      ]),
      notes:new FormControl(this.avw.notes, [Validators.required]),
    });
  }

  get a(): { [key: string]: AbstractControl } {
    return this.avwForm.controls;
  }

  public validatepAwvForm(): void {
    if (this.avwForm.invalid) {
      for (const control of Object.keys(this.avwForm.controls)) {
        this.avwForm.controls[control].markAsTouched();
      }
      return;
    }
    let _payload = Object.assign(this.avwForm.value, {
      patient: this.patientId,
    });
    this.loader.showLoader();
    this.http.post(`${URLS.ADDAWV}`, _payload).subscribe({
      next: (res) => {
        this.avwForm.reset();
        this.getAWV();
        this.loader.hideLoader();
        let myModalEl = document.getElementById('screening');
       let modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
        jQuery('#screening').modal('hide');
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  getAWV() {
    this.loader.showLoader();
    this.http.get(`${URLS.GETAWV}`).subscribe({
      next: (res) => {
        this._awvList = res.data;
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  getScreening() {
    this.loader.showLoader();
    this.http.get(`${URLS.GETSCREENING}`).subscribe({
      next: (res) => {
        this._screenList = res.data;
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  public screeningId :any; 
  editScreeningInfo(obj: any) {
    if (obj) {
      this.IsEditScreeningInfo = true;
      this.screeningId=obj.id
      let programObj: any = ''; 
      let newData:any={};
      this._screenList.filter((data:any)=>{
        if( data.name=== obj.services_and_Screening_name){
          newData=data.id;
        }
      })
      this._awvList.filter((data:any)=>{
        if(data.services_and_Screening_name === obj.services_and_Screening_name){
          programObj=data.annual_wellness_status;
        }
      })
      this.avwForm.patchValue({
        services_and_Screening_name: newData,
        date_of_last_services: obj.date_of_last_services,
        annual_wellness_status: obj.annual_wellness_status.toUpperCase(),
        notes:obj.notes
      });
    }
  }

  UpdateScreeningInfo() {
    if (this.avwForm.invalid) {
      for (const control of Object.keys(this.avwForm.controls)) {
        this.avwForm.controls[control].markAsTouched();
      }
      return;
    }
    let _payload = Object.assign(this.avwForm.value, {
      patient: this.patientId,
    });
    if (this.patientId) {
      this.http
        .put(`${URLS.UPDATEAWV}${parseInt(this.screeningId)}/`, _payload)
        .subscribe({
          next: (res) => {
            this.IsEditScreeningInfo = false;
            this.getAWV();
            let myModalEl = document.getElementById('screening');
            let modal = bootstrap.Modal.getInstance(myModalEl);
            modal.hide();
            this.avwForm.reset();
          },
          error: (err) => {
            this.toast.openErrorToast(err.errors.non_field_errors[0]);
          },
        });
    }
  }
  openScreeningInfoPopUp() {
    this.IsEditScreeningInfo = false;
    this.avwForm.reset();
    this.avwForm.patchValue({
      date_of_last_services: this.currentStringDate,
      annual_wellness_status:  this._hospitalStatus[1].value
    });
  }
}
