import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { RemoveEmptyKeys } from 'src/app/_helpers/remove-empty-key';


@Component({
  selector: 'app-summary-filter',
  templateUrl: './summary-filter.component.html',
  styleUrls: ['./summary-filter.component.scss'],
})
export class SummaryFilterComponent implements OnInit {
  @Output() downloadPDF = new EventEmitter<any>();
  @Output() print = new EventEmitter<any>();
  @Output() sendEmail = new EventEmitter<any>();
  callTime: any;
  callDuration: any = 0;
  currentStringDate = moment(new Date()).format('YYYY-MM-DD');;
  @Input() patientId: any;
  @Input() selectedTab: any;
  show: boolean = true;
  _url = '';
  _payload = {
    call_duration: '',
    patient: '',
  };
  public cols:any = []
 public summaryCols:any = [
  {id:1, label: 'personal_information', header: 'Personal Information'},
  {id:2,label: 'medication' , header: 'Medications'},
  {id:3,label: 'vitals' , header: 'Vitals'},
  {id:4,label: 'details', header: 'Details' },
  {id:5,label: 'self_management_goals', header: 'Self Management Goals'},
  
]
public careReportcols:any = [
  {id:1, label: 'personal_information', header: 'Personal Information'},
  {id:2,label: 'medications' , header: 'Medications'},
  {id:3,label: 'conditions_monitored' , header: 'Vitals'},
  {id:4,label: 'assessments', header: 'Assessments' },
  {id:5,label: 'self_management_goals', header: 'Self Management Goals'},
  {id:6,label: 'details', header: 'Details' }, 
]
 public selectedColumns:any = [];
 public selectedCareReportCols: any = [];
 public selectedsummaryCols: any = [];
 public summryColData: string = 'summryColData';
 public reportColData: string = 'reportColData';


  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private http: HttpService,
    private loader: LoaderService,
    private route: ActivatedRoute,
    private storageService:StorageService
  ) {
    console.log(this.currentStringDate);
  }

  ngOnInit(): void {
    if(this.selectedTab === 'PATIENT_SUMMARY'){
      this.cols = this.summaryCols;
      this.selectedColumns = this.storageService.getColSelection(this.summryColData)
      if(this.selectedColumns){
        this.getPatientSummary('PATIENT_SUMMARY');
      }
      // this.selectedColumns = [];
    }else if(this.selectedTab === 'MONTHLY_CARE_REPORT'){
      this.cols = this.careReportcols;
      this.selectedColumns = this.storageService.getColSelection(this.reportColData);
      if(this.selectedColumns){
        this.getPatientSummary('MONTHLY_CARE_REPORT');
      }
      // this.selectedColumns = [];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._payload.patient = this.patientId;
    if (this.selectedTab === 'VITALS') {
      this._payload.call_duration = this.callTime;
      this._url = URLS.VITAL_CALL_LOGS;
      this.callDuration = 0;
      this.callTime = '';
      this.show = true;
    } else if (this.selectedTab === 'MEDICAL_CONDITIONS') {
      this._payload.call_duration = this.callTime;
      this._url = URLS.MEDICATION_CALL_LOGS;
      this.callDuration = 0;
      this.callTime = '';
      this.show = true;
    } else if (this.selectedTab === 'ASSESSMENT') {
      this._payload.call_duration = this.callTime;
      this._url = URLS.assessment_call_log;
      this.callDuration = 0;
      this.callTime = '';
      this.show = true;
    } else if (this.selectedTab === 'AWV') {
      this._url = URLS.annual_wellness_visit_call_log;
      this._payload.call_duration = this.callTime;
      this.callDuration = 0;
      this.callTime = '';
      this.show = true;
    } else if (this.selectedTab === 'SELF_MANAGEMENT_PLAN') {
      this._url = URLS.self_management_plan_call_log;
      this._payload.call_duration = this.callTime;
      this.callDuration = 0;
      this.callTime = '';
      this.show = true;
    }else if(this.selectedTab === 'PATIENT_SUMMARY'){
      this.cols = this.summaryCols;
      this.selectedColumns = this.storageService.getColSelection(this.summryColData)
      if(this.selectedColumns){
        this.getPatientSummary('PATIENT_SUMMARY');
      }
    }else if(this.selectedTab === 'MONTHLY_CARE_REPORT'){
      this.cols = this.careReportcols;
      this.selectedColumns = this.storageService.getColSelection(this.reportColData);
      if(this.selectedColumns){
        this.getPatientSummary('MONTHLY_CARE_REPORT');
      }
    }
  }

  callLogs() {
    this._payload.call_duration = this.callTime;
    this.http.post(`${this._url}`, this._payload).subscribe({
      next: (res) => {
        this.callDuration = res.data.call_duration;
        this.loader.hideLoader();
        this.show = false;
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }
  changeColumnSel(event:any) {
    console.log(event)
		 this.selectedColumns =event.value;
     if(this.selectedTab === 'PATIENT_SUMMARY'){
      this.selectedsummaryCols = this.selectedColumns;
      this.storageService.setColSelection(this.summryColData, this.selectedsummaryCols);
      this.getPatientSummary('PATIENT_SUMMARY')
    }else if(this.selectedTab === 'MONTHLY_CARE_REPORT'){
      this.selectedCareReportCols = this.selectedColumns;
      this.storageService.setColSelection(this.reportColData, this.selectedCareReportCols);
      this.getPatientSummary('MONTHLY_CARE_REPORT')
    }
   
	}
  public patientSummary:any;
  getPatientSummary(form?:any) {
    let payload:any={};
    this.selectedColumns.filter((obj:any)=>{
      payload[obj.label]=true 
     });
    this.loader.showLoader();

    if(form === 'PATIENT_SUMMARY'){
      this.http.get(`${URLS.GETPATIENTSUMMARY}${this.patientId}/`, RemoveEmptyKeys(payload)).subscribe({
        next: (res) => {
          this.patientSummary = res.data;
          this.storageService.summeryDataObservable.next(res['data']);
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });
      }else if(form === 'MONTHLY_CARE_REPORT'){
        this.http.get(`${URLS.GETPATIENTMONTHLYSUMMARY}${this.patientId}/`, RemoveEmptyKeys(payload)).subscribe({
          next: (res) => {
            this.patientSummary = res.data;
            this.storageService.mounthCareDataObservable.next(res['data']);
            this.loader.hideLoader();
          },
          error: (err) => {
            this.loader.hideLoader();
            this.toast.openErrorToast(err.message);
          },
        });
      }






    
  }
  clearApplyFilter(obje:any){
    let index:any;
    this.selectedColumns.filter((obj:any,i:any) =>{
      if(obj.id === obje.id){
        index=i
      }
    })
    this.selectedColumns.splice(index, 1);
    if(this.selectedTab === 'PATIENT_SUMMARY'){
      this.selectedsummaryCols = this.selectedColumns;
      this.storageService.setColSelection(this.summryColData, this.selectedsummaryCols);
      this.getPatientSummary('PATIENT_SUMMARY')
    }else if(this.selectedTab === 'MONTHLY_CARE_REPORT'){
      this.selectedCareReportCols = this.selectedColumns;
      this.storageService.setColSelection(this.reportColData, this.selectedCareReportCols);
      this.getPatientSummary('MONTHLY_CARE_REPORT')
    }    
  }
}
