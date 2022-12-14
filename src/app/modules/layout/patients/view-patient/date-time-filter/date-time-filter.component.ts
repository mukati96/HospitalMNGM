import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
declare const $: any;
declare var jQuery: any;
@Component({
  selector: 'app-date-time-filter',
  templateUrl: './date-time-filter.component.html',
  styleUrls: ['./date-time-filter.component.scss'],
})
export class DateTimeFilterComponent implements OnInit, OnChanges {
  callTime: any;
  callDuration: any = 0;
  currentStringDate = moment(new Date()).format('YYYY-MM-DD');
  @Input() patientId: any;
  @Input() selectedTab: any;
  show: boolean = true;
  _url = '';
  _updateUrl = '';
  _payload = {
    call_duration: '',
    patient: '',
  };
  dataaa: any;
  outreachForm!: FormGroup;
  callLogsData: any;
  vitalsData: any;
  public hideField: boolean = true;
  public selectedTabName: string = '';
  public isEditSpentTime :boolean=false;
  public spentTimeObj:any={};
  public displaySpenttimeForm: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private http: HttpService,
    private loader: LoaderService,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.form();
    // this.currentStringDate = new Date().toISOString().substring(0, 10);
  }

  form() {
    this.outreachForm = this.fb.group({
      from_date: ['', Validators.compose([Validators.required])],
      to_date: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._payload.patient = this.patientId;
    this.hideField = true;
    this.form();
    if (this.selectedTab === 'VITALS') {
      this.selectedTabName = 'Vitals';
      this._payload.call_duration = this.callTime;
      this._url = URLS.VITAL_CALL_LOGS;
      this._updateUrl = URLS.UPDATE_VITAL_CALL_LOGS;
      this.callDuration = 0;
      this.callTime = '';
      this.show = true;
    } else if (this.selectedTab === 'MEDICAL_CONDITIONS') {
      this.selectedTabName = 'Clinical Profile';
      this._payload.call_duration = this.callTime;
      this._url = URLS.MEDICATION_CALL_LOGS;
      this._updateUrl = URLS.UPDATE_MEDICATION_CALL_LOGS;
      this.callDuration = 0;
      this.callTime = '';
      this.show = true;
    } else if (this.selectedTab === 'ASSESSMENT') {
      this.selectedTabName = 'Assessment';
      this._payload.call_duration = this.callTime;
      this._url = URLS.assessment_call_log;
      this._updateUrl = URLS.update_assessment_call_log;
      this.callDuration = 0;
      this.callTime = '';
      this.show = true;
    } else if (this.selectedTab === 'AWV') {
      this.selectedTabName = 'Awv';
      this._url = URLS.annual_wellness_visit_call_log;
      this._updateUrl = URLS.update_annual_wellness_visit_call_log;
      this._payload.call_duration = this.callTime;
      this.callDuration = 0;
      this.callTime = '';
      this.show = true;
    } else if (this.selectedTab === 'SELF_MANAGEMENT_PLAN') {
      this.selectedTabName = 'Self Management Plan';
      this._url = URLS.self_management_plan_call_log;
      this._updateUrl = URLS.update_self_management_plan_call_log;
      this._payload.call_duration = this.callTime;
      this.callDuration = 0;
      this.callTime = '';
      this.show = true;
    } else if (this.selectedTab === 'MONTHLY_CARE_REPORT') {
      this.selectedTabName = 'Care Report';
      this._payload.call_duration = this.callTime;
      this.callDuration = 0;
      this.callTime = '';
      this.show = true;
      this.hideField = false;
    } else if (this.selectedTab === 'CALL_LOGS') {
      this.hideField = false;
      this.selectedTabName = 'Call Logs';
    }
  }

  callLogs() {
    if (this.callTime == '') {
      this.toast.openErrorToast('Please enter call log time.');
      return;
    }
    this._payload.call_duration = this.callTime;
    this.http.post(`${this._url}`, this._payload).subscribe({
      next: (res) => {
        this.callDuration = res.data.call_duration;
        this.spentTimeObj = res.data
        this.loader.hideLoader();
        this.show = false;
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }
  updateCallLogs(){
    if (this.callTime == '') {
      this.toast.openErrorToast('Please enter call log time.');
      return;
    }
    this._payload.call_duration = this.callTime;
    this.http.put(`${this._updateUrl}${this.spentTimeObj.id}/${this.patientId}/`, this._payload).subscribe({
      next: (res) => {
        this.callDuration = res.data.call_duration;
        this.loader.hideLoader();
        this.isEditSpentTime =false;
        this.show = false;
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  onSubmitSearch() {
    if (this.selectedTab === 'VITALS') {
      if (this.outreachForm.valid) this.getVitals();
    } else if (this.selectedTab === 'CALL_LOGS') {
      if (this.outreachForm.valid && this.DataInvalide === false) {
        this.getCallLogs();
      }
    } else if (this.selectedTab === 'AWV') {
      if (this.outreachForm.valid && this.DataInvalide === false){
        this.getAwvs();
      } 
    } else if (this.selectedTab === 'ASSESSMENT') {
      if (this.outreachForm.valid && this.DataInvalide === false){
        this.getAssessment();
      } 
    } else if (this.selectedTab === 'SELF_MANAGEMENT_PLAN') {
      if (this.outreachForm.valid && this.DataInvalide === false){
        this.getTask();
      } 
    } else if (this.selectedTab === 'MONTHLY_CARE_REPORT') {
      if (this.outreachForm.valid && this.DataInvalide === false){
        this.getPatientMonthlySummary();
      } 
    }
  }

  getVitals() {
    this.http
      .get(`${URLS.GETVITALS}${this.patientId}/`, this.outreachForm?.value)
      .subscribe({
        next: (res) => {
          this.vitalsData = res.data;
          this.storageService.vitalsDataObservable.next(res['data']);
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });
  }
  getCallLogs() {
    this.http
      .get(`${URLS.GETCALLLOGS}${this.patientId}/`, this.outreachForm?.value)
      .subscribe({
        next: (res) => {
          this.callLogsData = res;
          this.storageService.callLogsDataObservable.next(res['data']);
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });
  }

  getAwvs() {
    this.http
      .get(`${URLS.GETAWV}${this.patientId}/`, this.outreachForm?.value)
      .subscribe({
        next: (res) => {
          this.storageService.awvDataObservable.next(res['data']);
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });
  }

  getAssessment() {
    this.http
      .get(
        `${URLS.GETASSESSMENTLIST}${this.patientId}/`,
        this.outreachForm?.value
      )
      .subscribe({
        next: (res) => {
          this.storageService.assessmentDataObservable.next(res['data']);
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });
  }

  getTask() {
    this.http
      .get(
        `${URLS.GETPATIENTTASKlIST}${this.patientId}/`,
        this.outreachForm?.value
      )
      .subscribe({
        next: (res) => {
          this.storageService.taskDataObservable.next(res['data']);
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });
  }
  getPatientMonthlySummary() {
    this.loader.showLoader();
    this.http
      .get(`${URLS.GETPATIENTMONTHLYSUMMARY}${this.patientId}/`,
      this.outreachForm?.value
      )
      .subscribe({
        next: (res) => {
          this.storageService.mounthCareDataObservable.next(res['data']);
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });
  }
  public lastDate:any
  public showErrMsg :any =''
  DataInvalide :boolean=false;
  public FristDate:any;
  public Formdate:any ;

  changeDate(event:any, form:any){
    if(this.selectedTab === 'MONTHLY_CARE_REPORT'){
    if(form == 'from_date'){
    this.FristDate = new Date(event.target.value);
    this.lastDate = new Date(this.FristDate.getFullYear(), this.FristDate.getMonth() + 1);
    if( this.Formdate && this.FristDate <= this.Formdate  ){
      this.DataInvalide =false;
      this.showErrMsg='';
    }
  }else if(form == 'to_date'){
    var from_date = new Date(event.target.value);
    this.Formdate =from_date
    if( this.lastDate <=  from_date){
      this.showErrMsg = 'please select one mounth Date '
      this.DataInvalide =true;
    }else if( from_date <= this.FristDate){
      this.DataInvalide =true;
      this.showErrMsg='From date must be less than or equal to To date.';
    }else{
      this.DataInvalide =false;
      this.showErrMsg='';
    }
   }
    }else{
      if(form == 'from_date'){
        this.FristDate = new Date(event.target.value);
        this.lastDate = new Date(this.FristDate.getFullYear(), this.FristDate.getMonth() + 1);
        if( this.Formdate && this.FristDate <= this.Formdate){
          this.DataInvalide =false;
          this.showErrMsg='';
        } 
      }else if(form == 'to_date'){
          var from_date = new Date(event.target.value);
          this.Formdate =from_date
         if( from_date <= this.FristDate){
          this.DataInvalide =true;
          this.showErrMsg='From date must be less than or equal to To date.';
        }else{
          this.DataInvalide =false;
          this.showErrMsg='';
        }
       }

    }
  }
  openSpentTimePopUp() {
    this.isEditSpentTime = true;
    
  }
  closeChronicPopUp() {
    this.isEditSpentTime = false;
  }

}
