import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FULL_ROUTES } from 'src/app/constants/routes';
import { URLS } from 'src/app/constants/url';
import { PATIENTS_TAB } from 'src/app/enum/patients-tab';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment.prod';
import * as moment from 'moment';
import { StorageKeys } from 'src/app/constants/storage';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { StorageService } from 'src/app/services/storage.service';
import { MedicalConditionsComponent } from './medical-conditions/medical-conditions.component';
declare const bootstrap: any;

interface patientProgramDetails {
  program_status: string;
  program_type: string;
  date: string;
}

interface taskDetails {
  task_name: string;
  notes: string;
  gole_lookUp: string;
  date: string;
  status: string;
}

interface chronicDetails {
  chronic_dic: string;
}
@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss'],
})
export class ViewPatientComponent implements OnInit {
  selectedTab: PATIENTS_TAB | any =
  localStorage.getItem(StorageKeys.TAB) || PATIENTS_TAB.VITALS;
  patientForm!: FormGroup;
  ChronicForm!: FormGroup;
  taksForm!: FormGroup;
  TABS = PATIENTS_TAB;
  agenda: any;
  patientId!: string;
  patientProgram!: patientProgramDetails;
  taskObj!: taskDetails;
  chronicObj!: chronicDetails;
  public _patientDetail: any = {};
  public _patientKeyStats: any = {};
  public _patientTotalTime: any = {};
  patientProgramList: any;
  public _patientKeyStatsWeight: any;
  public _patientKeyStatsSystolic: any;
  public _patientKeyStatsHbaic: any;
  patientProgram_name: any;
  public TaskdataArray: any = [];
  public stutusArry: any = [];
  _totalCallLogs: any = [];
  public displayCallLogForm: boolean = false;
  public displayChronicForm: boolean = false;
  public IsEditProgramInfo: boolean = false;
  chronic_diseases: any = [];
  selectedPK: any = [];
  selectedChronicalDiseases: any = [];
  disableViewClient: boolean = false;
  programInformation: any;
  programId:any;
  @ViewChild('referenceVariable') childVariable!: MedicalConditionsComponent;
  public selectedValue:any ='individual'; 

  constructor(
    private router: Router,
    private http: HttpService,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private toast: ToastService,
    private storageService: StorageService
  ) {
    this.patientId = this.route.snapshot.params['id'];
    this.patientProgram = {} as patientProgramDetails;
    this.taskObj = {} as taskDetails;
    this.chronicObj = {} as chronicDetails;
    this.stutusArry = [{ label: 'COMPLETED' }, { label: 'PENDING' }];
    this.programInformation = [
      { value: 'ACTIVE', label: 'Active' },
      { value: 'INACTIVE', label: 'In-Active' },
      { value: 'DECLINED', label: 'Declined' },
    ];
  }

  ngOnInit(): void {
    if (this.patientId) {
      this.getPatientDetail();
      this.getPatientKeyStats();
      this.getPatientTotalTime();
      this.patientProgramForm();
      this.GETPATIENTPROGRAM();
      this.GETPATIENTPROGRAMTYPE();
      this.taskInitForms();
      this.getPatientGole();
      this.getTotalCallLogs();
      this.chronicInitForms();
      this.getChronicalDisease();
    }
  }
  patientProgramForm() {
    this.patientForm = new FormGroup({
      program_type: new FormControl(this.patientProgram.program_type, [
        Validators.required,
      ]),
      date: new FormControl(this.patientProgram.date, [Validators.required]),
      program_status: new FormControl(this.patientProgram.program_status, [
        Validators.required,
      ]),
    });
  }
  get a(): { [key: string]: AbstractControl } {
    return this.patientForm.controls;
  }

  get T(): { [key: string]: AbstractControl } {
    return this.taksForm.controls;
  }
  get c(): { [key: string]: AbstractControl } {
    return this.ChronicForm.controls;
  }
  getPatientDetail() {
    this.http.get(`${URLS.PATIENT_DETAIL}${this.patientId}`).subscribe({
      next: (res) => {
        this._patientDetail = res.data;
      },
      error: (err) => {},
    });
  }

  getPatientKeyStats() {
    this.http.get(`${URLS.GETPATIENTKEYSTATS}${this.patientId}`).subscribe({
      next: (res) => {
        this._patientKeyStats = res.data;
        this._patientKeyStatsWeight = res.data['weight'];
        this._patientKeyStatsSystolic = res.data['systolic'];
        this._patientKeyStatsHbaic = res.data['hbaic'];
        // for (let key in res.data) {
        //   let data: any = {};
        //   for (let subKey in res.data[key]) {
        //     data.keyName = subKey;
        //     data.value = res.data[key][subKey];
        //   }
        //   this._patientKeyStats.push({ keyName: key, value: data });
        // }
      },
      error: (err) => {},
    });
  }

  getPatientTotalTime() {
    this.http.get(`${URLS.GETPATIENTTOTALTIME}${this.patientId}`).subscribe({
      next: (res) => {
        this._patientTotalTime = res.data;
      },
      error: (err) => {},
    });
  }

  startCall() {
    this.openNewTab();
    let myModalEl = document.getElementById('startCall');
    let modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
    this.agenda = undefined;
  }

  openCallModal() {
    var modal = new bootstrap.Modal(document.getElementById('startCall'));
    modal.show();
  }

  startCallWithAgenda(agenda: string) {
    this.agenda = agenda;
    this.openNewTab();
  }

  openNewTab() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(
        [`${FULL_ROUTES.INITIATE_CALL}/${this.uniqueId()}`],
        { queryParams: { agenda: this.agenda, patientId: this.patientId } }
      )
    );
    window.open(url, '_blank');
  }

  changeTab(tab: PATIENTS_TAB) {
    this.selectedTab = tab;
    localStorage.setItem(StorageKeys.TAB, this.selectedTab);
  }

  uniqueId() {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  }

  //patient program information edit
  public validatePatientProgramForm(): void {
    if (this.patientForm.invalid) {
      for (const control of Object.keys(this.patientForm.controls)) {
        this.patientForm.controls[control].markAsTouched();
      }
      return;
    }
    let _payload = Object.assign(this.patientForm.value, {
      patient: this.patientId,
    });
    this.loader.showLoader();
    this.http.post(`${URLS.PATIENTPROGRAM}`, _payload).subscribe({
      next: (res) => {
        this.patientForm.reset();
        this.GETPATIENTPROGRAM();
        this.loader.hideLoader();
        //$('#ProEdit').modal('hide');
        let myModalEl = document.getElementById('ProEdit');
        let modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  ///GET PATIENT PROGRAM
  GETPATIENTPROGRAM() {
    this.loader.showLoader();
    this.http.get(`${URLS.GETPATIENTPROGRAM}${this.patientId}/`).subscribe({
      next: (res) => {
        this.patientProgramList = res.data;
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }
  // EDIT PATIENT ROUTE
  editPatients(from: any) {
    this.storageService.disableViewClient =
      !this.storageService?.disableViewClient;
    this.disableViewClient = this.storageService.disableViewClient;
  }

  /// Get patience program
  GETPATIENTPROGRAMTYPE() {
    this.loader.showLoader();
    this.http.get(`${URLS.GETPATIENTPROGRAMTYPE}`).subscribe({
      next: (res) => {
        this.patientProgram_name = res.data;
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  taskInitForms() {
    this.taksForm = new FormGroup({
      task_name: new FormControl(this.taskObj.task_name, [Validators.required]),
      notes: new FormControl(this.taskObj.notes, [Validators.required]),
      gole_lookUp: new FormControl(this.taskObj.gole_lookUp, [Validators.required]),
      date: new FormControl(this.taskObj.date, [Validators.required]),
      status: new FormControl(this.taskObj.status, [Validators.required]),
    });
  }

  chronicInitForms() {
    this.ChronicForm = new FormGroup({
      chronic_dic: new FormControl(this.chronicObj.chronic_dic, [
        Validators.required,
      ]),
    });
  }

  getPatientGole() {
    this.http.get(`${URLS.GETPATIENTGOAL}${this.patientId}`).subscribe({
      next: (res) => {
        this.TaskdataArray = res.data;
      },
      error: (err) => {},
    });
  }

  onSubmitTask() {
    if (this.taksForm.invalid) {
      for (const control of Object.keys(this.taksForm.controls)) {
        this.taksForm.controls[control].markAsTouched();
      }
      return;
    }
    let date: any = moment(this.taksForm.value.date).format('YYYY-MM-DD');
    let _payload: any = Object.assign({
      task_status: this.taksForm.value.status.label,
      goal: this.taksForm.value.gole_lookUp.id,
      task_date: date,
      notes: this.taksForm.value.notes,
      name: this.taksForm.value.task_name,
    });
    this.loader.showLoader();
    this.http.post(`${URLS.ADDPATIENTTASKS}`, _payload).subscribe({
      next: (res) => {
        this.taksForm.reset();
        this.loader.hideLoader();
        let myModalEl = document.getElementById('addTask');
        let modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  getTotalCallLogs() {
    this.loader.showLoader();
    this.http.get(`${URLS.TOTAL_CALL_LOGS}${this.patientId}/`).subscribe({
      next: (res) => {
        if (res.data.all_logs && res.data.all_logs.length) {
          this._totalCallLogs = res.data.all_logs;
        } else {
          this._totalCallLogs.push(res.data.all_logs);
        }
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }
  openCallLogPopUp() {
    this.displayCallLogForm = true;
  }

  closeCallLogPopUp() {
    this.displayCallLogForm = false;
  }

  getChronicalDisease() {
    this.loader.showLoader();
    this.http
      .get(`${URLS.GETCHRONICDISEASE}${parseInt(this.patientId)}`)
      .subscribe({
        next: (res) => {
          this.chronic_diseases = res.data;
          this.selectedChronicalDiseases = res.data.filter(
            (res: any) => res.has_disease === true
          );
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });
  }

  onSubmitChronicForm() {
    let payload: any = Object.assign({
      patient: this.patientId,
      chronic: this.selectedPK,
    });
    if (payload.chronic.length === 0) {
      this.toast.openErrorToast('Please select chronic condition.');
      return;
    }
    this.http.post(`${URLS.ASSIGNCHRONICDISEASE}`, payload).subscribe({
      next: (res) => {
        let filterResult = this.chronic_diseases.filter((m: any) => {
          return m.has_disease === true;
        });
        this.selectedChronicalDiseases.push(filterResult);
        this.loader.hideLoader();
        this.closeChronicPopUp();
        this.getChronicalDisease();
        this.childVariable.getChronicDiseaseList();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  openChronicPopUp() {
    this.displayChronicForm = true;
  }
  closeChronicPopUp() {
    this.displayChronicForm = false;
  }

  editProgramInfo(obj: any) {
    if (obj) {
      this.programId = obj.id;
      this.IsEditProgramInfo = true;
      let programObj: any = {};
      this.patientProgram_name.filter((data: any) => {
        if (data.program_name === obj.program_type) {
          programObj = data;
        }
      });
      let value = obj.program_status;
      this.patientForm.patchValue({
        program_type: programObj.id,
        date: obj.date,
        program_status: value.toUpperCase(),
      });
    }
  }
  UpdateProgramInfo() {
    if (this.patientForm.invalid) {
      for (const control of Object.keys(this.patientForm.controls)) {
        this.patientForm.controls[control].markAsTouched();
      }
      return;
    }
    let _payload = Object.assign(this.patientForm.value, {
      patient: this.patientId,
      chronic: [],
    });
    if (this.patientId) {
      this.http
        .put(
          `${URLS.UPDATEPATIENTPROGRAM}${parseInt(this.patientId)}/${parseInt(this.programId)}/`,
          _payload
        )
        .subscribe({
          next: (res) => {
            this.IsEditProgramInfo = false;
            this.GETPATIENTPROGRAM();
            let myModalEl = document.getElementById('ProEdit');
            let modal = bootstrap.Modal.getInstance(myModalEl);
            modal.hide();
            this.patientForm.reset();
          },
          error: (err) => {
            this.toast.openErrorToast(err.errors.non_field_errors[0]);
          },
        });
    }
  }
  openProgramInfoPopUp() {
    this.IsEditProgramInfo = false;
    this.patientForm.reset();
  }

  resetchronicForm() {
    this.ChronicForm.reset();
  }

  onDownloadpdf(ev: any) {
    if (this.selectedTab === this.TABS.MONTHLY_CARE_REPORT) {
      this.createAndDownloadPdf('#monthly-care-report');
    } else if (this.selectedTab === this.TABS.PATIENT_SUMMARY) {
      this.createAndDownloadPdf('#patient-summary');
    }
  }

  onPrint(ev: any) {
    if (this.selectedTab === this.TABS.MONTHLY_CARE_REPORT) {
      this.printPageArea('monthly-care-report');
    } else if (this.selectedTab === this.TABS.PATIENT_SUMMARY) {
      this.printPageArea('patient-summary');
    }
  }

  public canvasImgPath: any;
  onSendMail(ev: any) {
    this.changehtml2canvas((callback: any) => {
      //  let data:any = this.base64toBlob(this.canvasImgPath);
      //  console.log("this.canvasImgPath1",data)
      this.onSaveValue();
    });
  }

  changehtml2canvas(cb: any) {
    var data: any = document.querySelector('#patient-summary');
    if (this.selectedTab === this.TABS.MONTHLY_CARE_REPORT) {
      data = document.querySelector('#monthly-care-report');
    } else if (this.selectedTab === this.TABS.PATIENT_SUMMARY) {
      data = document.querySelector('#patient-summary');
    }

    html2canvas(data).then((canvas) => {
      let fileWidth = 210;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      this.canvasImgPath = canvas.toDataURL('pdf');
      cb(true);
    });
  }

  base64toBlob(base64: any) {
    var arr = base64.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], 'report.pdf', { type: 'pdf' });
  }

  onSaveValue() {
    this.canvasImgPath = this.base64toBlob(this.canvasImgPath);
    if (this.canvasImgPath) {
      const fd = new FormData();
      fd.append('attachment', this.canvasImgPath);
      if (this.patientId) {
        this.http
          .put(`${URLS.SENDMAILPATIENT}${parseInt(this.patientId)}/`, fd)
          .subscribe({
            next: (res) => {
              this.toast.openSuccessToast('Mail Send successfully');
            },
            error: (err) => {
              this.toast.openErrorToast(err.errors.non_field_errors[0]);
            },
          });
      }
    }
  }

  createAndDownloadPdf(idWithHash: string) {
    var data: any = document.querySelector(idWithHash);
    html2canvas(data).then((canvas) => {
      let fileWidth = 210;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('report.pdf');
    });
  }

  printPageArea(id: any) {
    var prtContent: any = document.getElementById(id);
    var WinPrint: any = window.open('', '');
    WinPrint.document.write('<html><head>');
    WinPrint.document.write(
      '<link rel="stylesheet" href="assets/css/print/normalize.css">'
    );
    WinPrint.document.write(
      '<link rel="stylesheet" href="assets/css/print/receipt.css">'
    );
    WinPrint.document.write('</head><body onload="print();close();">');
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.write('</body></html>');
    WinPrint.document.close();
    WinPrint.focus();
  }
  showGoleFiled(event:any){
    if(event.value == 'individual'){
      this.selectedValue= event.value;
      if(this.taksForm.value.gole_lookUp || this.taksForm.value.gole_lookUp == null || this.taksForm.value.gole_lookUp == ''){
        this.taksForm.removeControl('gole_lookUp');
      }
    }else{
      if(!this.taksForm.value.gole_lookUp){
        this.taksForm.addControl('gole_lookUp', new FormControl('', [
          Validators.required,
        ]));
      }
      this.selectedValue= event.value;
    }
  }

}
