import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
import { RemoveEmptyKeys } from 'src/app/_helpers/remove-empty-key';
import { StorageKeys } from 'src/app/constants/storage';
@Component({
  selector: 'app-monthly-care-report',
  templateUrl: './monthly-care-report.component.html',
  styleUrls: ['./monthly-care-report.component.scss'],
})
export class MonthlyCareReportComponent implements OnInit {
  @Input() patientId: any;
  @Input() selectedTab: any;
  userInfo: any = this.storageService.getFromLocalStorage(StorageKeys.USER_INFO);
  patientMonthlySummary: any;
  conditions_monitored: any[] = [];
  date!: Date;
  public mounthlyReportData:any;
  constructor(
    private router: Router,
    private http: HttpService,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private toast: ToastService,
    private storageService:StorageService
  ) {}

  ngOnInit(): void {
    this.storageService.mounthCareDataObservable.asObservable().subscribe((res: any) => {
      this.mounthlyReportData = Object.assign(res);
      if(this.mounthlyReportData && this.mounthlyReportData.conditions_monitored){
        if( this.mounthlyReportData.conditions_monitored.bloodglucose && this.mounthlyReportData.conditions_monitored.bloodglucose.length){
          let bloodglucoselength :any =  this.mounthlyReportData.conditions_monitored.bloodglucose.length;
          let bloodglucoseObj : any =this.mounthlyReportData.conditions_monitored.bloodglucose[bloodglucoselength -1];
          let bloodglucoseArray : any =[]
          bloodglucoseArray.push(bloodglucoseObj)
          this.mounthlyReportData.conditions_monitored.bloodglucose = bloodglucoseArray;
        }

        if( this.mounthlyReportData.conditions_monitored.bloodpressure && this.mounthlyReportData.conditions_monitored.bloodpressure.length){
          let bloodglucoselength :any =  this.mounthlyReportData.conditions_monitored.bloodpressure.length;
          let bloodglucoseObj : any =this.mounthlyReportData.conditions_monitored.bloodpressure[bloodglucoselength -1];
          let bloodglucoseArray : any =[]
          bloodglucoseArray.push(bloodglucoseObj)
          this.mounthlyReportData.conditions_monitored.bloodpressure = bloodglucoseArray;
        }

        if( this.mounthlyReportData.conditions_monitored.cholesterol && this.mounthlyReportData.conditions_monitored.cholesterol.length){
          let bloodglucoselength :any =  this.mounthlyReportData.conditions_monitored.cholesterol.length;
          let bloodglucoseObj : any =this.mounthlyReportData.conditions_monitored.cholesterol[bloodglucoselength -1];
          let bloodglucoseArray : any =[]
          bloodglucoseArray.push(bloodglucoseObj)
          this.mounthlyReportData.conditions_monitored.cholesterol = bloodglucoseArray;
        }
        if( this.mounthlyReportData.conditions_monitored.pulseox && this.mounthlyReportData.conditions_monitored.pulseox.length){
          let bloodglucoselength :any =  this.mounthlyReportData.conditions_monitored.pulseox.length;
          let bloodglucoseObj : any =this.mounthlyReportData.conditions_monitored.pulseox[bloodglucoselength -1];
          let bloodglucoseArray : any =[]
          bloodglucoseArray.push(bloodglucoseObj)
          this.mounthlyReportData.conditions_monitored.pulseox = bloodglucoseArray;
        }
        if( this.mounthlyReportData.conditions_monitored.hba1c && this.mounthlyReportData.conditions_monitored.hba1c.length){
          let bloodglucoselength :any =  this.mounthlyReportData.conditions_monitored.hba1c.length;
          let bloodglucoseObj : any =this.mounthlyReportData.conditions_monitored.hba1c[bloodglucoselength -1];
          let bloodglucoseArray : any =[]
          bloodglucoseArray.push(bloodglucoseObj)
          this.mounthlyReportData.conditions_monitored.hba1c = bloodglucoseArray;
        }
        if( this.mounthlyReportData.conditions_monitored.bmi && this.mounthlyReportData.conditions_monitored.bmi.length){
          let bloodglucoselength :any =  this.mounthlyReportData.conditions_monitored.bmi.length;
          let bloodglucoseObj : any =this.mounthlyReportData.conditions_monitored.bmi[bloodglucoselength -1];
          let bloodglucoseArray : any =[]
          bloodglucoseArray.push(bloodglucoseObj)
          this.mounthlyReportData.conditions_monitored.bmi = bloodglucoseArray;
        }

      }
     });
    this.getPatientMonthlySummary();
    this.date = new Date();
  }

  getPatientMonthlySummary() {
    this.loader.showLoader();
    this.http
      .get(`${URLS.GETPATIENTMONTHLYSUMMARY}${this.patientId}/`)
      .subscribe({
        next: (res) => {
          this.patientMonthlySummary = res.data;
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });
  }
}
