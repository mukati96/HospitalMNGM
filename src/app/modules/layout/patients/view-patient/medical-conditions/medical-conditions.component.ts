import { Component, Input, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
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
import { RemoveEmptyKeys } from 'src/app/_helpers/remove-empty-key';
declare const bootstrap: any;
interface medicationDetails {
  medication_name: string;
  category: string;
  frequency: string;
  midication_status: string;
  dose: string;
  reasons: string;
  patient: string;
  prescriber: string;
  chronic_condition: string;
}

interface medicationNotes {
  date: string;
  description: string;
}

@Component({
  selector: 'app-medical-conditions',
  templateUrl: './medical-conditions.component.html',
  styleUrls: ['./medical-conditions.component.scss'],
})
export class MedicalConditionsComponent implements OnInit {
  @Input() patientId: any;
  @Input() patientData: any;

  medicationForm!: FormGroup;
  medication!: medicationDetails;
  chronicDiseaseForm!: FormGroup;

  medicationNotesForm!: FormGroup;
  medicationNotes!: medicationNotes;
  medicationNote: any;

  medicationSummary: any;
  medicationId: any;

  providersArr: any[] = [];
  isLoadingProviderData: boolean = false;

  public IsEditMedicationInfo: boolean = false;
  public IsEditChronicDiseaseInfo: boolean = false;
  _desc: any[] = [];
  chronic_conditions: any[] = [];

  _chronicConditionName: string = '';

  midicationStatus: any;
  frequency: any;
  onShowAllMedications:boolean=false;

  constructor(
    private router: Router,
    private http: HttpService,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private toast: ToastService,
    private titlecasePipe:TitleCasePipe
  ) {
    this.medication = {} as medicationDetails;
    this.medicationNotes = {} as medicationNotes;
    this.midicationStatus = [
      { value: 'ACTIVE', label: 'Active' },
      { value: 'INACTIVE', label: 'In-Active' },
      { value: 'SUSPENDED', label: 'Suspended' },
    ];
    this.frequency = [
      { value: 'DAILY', label: 'Daily' },
      { value: 'WEEKLY', label: 'Weekly' },
      { value: 'MONTHLY', label: 'Monthly' },
    ];
  }

  ngOnInit(): void {
    this.initmedicationForm();
    this.initmedicationNotesForm();
    this.initchronicDiseaseForm();
    this.getMedication();
    this.getMedicationNotes();
    this.getProvidersData();
    this.getChronicalDisease();
    this.getChronicDiseaseList();
    this.getChronicDiseaseList();
  }

  initmedicationForm() {
    this.medicationForm = new FormGroup({
      medication_name: new FormControl(this.medication.medication_name, [
        Validators.required,
      ]),
      dose: new FormControl(this.medication.dose, [
        Validators.required,
        Validators.min(0),
      ]),
      category: new FormControl(this.medication.category, [
        Validators.required,
      ]),
      // type: new FormControl(this.medication.type, [Validators.required]),
      frequency: new FormControl(this.medication.frequency, [
        Validators.required,
      ]),
      prescriber: new FormControl(this.medication.prescriber, [
        Validators.required,
      ]),
      midication_status: new FormControl(this.medication.midication_status, [
        Validators.required,
      ]),
      reasons: new FormControl(this.medication.reasons),
      chronic_condition: new FormControl(this.medication.chronic_condition, [ Validators.required,]),
    });
  }

  get a(): { [key: string]: AbstractControl } {
    return this.medicationForm.controls;
  }

  initmedicationNotesForm() {
    this.medicationNotesForm = new FormGroup({
      date: new FormControl(this.medicationNotes.date, [Validators.required]),
      description: new FormControl(this.medicationNotes.description, [
        Validators.required,
      ]),
    });
  }

  get m(): { [key: string]: AbstractControl } {
    return this.medicationNotesForm.controls;
  }

  initchronicDiseaseForm() {
    this.chronicDiseaseForm = new FormGroup({
      name: new FormControl(this.medication.medication_name, [
        Validators.required,
      ]),
      description: new FormControl(this.medication.dose, [Validators.required]),
      file: new FormControl(this.medication.category),
    });
  }

  get c(): { [key: string]: AbstractControl } {
    return this.chronicDiseaseForm.controls;
  }

  public validateMedicationForm(): void {
    if (this.medicationForm.invalid) {
      for (const control of Object.keys(this.medicationForm.controls)) {
        this.medicationForm.controls[control].markAsTouched();
      }
      return;
    }
    let _payload = {
      medication_name: this.medicationForm.value.medication_name,
      category: this.medicationForm.value.category,
      frequency: this.medicationForm.value.frequency,
      midication_status: this.medicationForm.value.midication_status,
      dose: this.medicationForm.value.dose,
      reasons: this.medicationForm.value.reasons,
      prescriber: this.medicationForm.value.prescriber,
      patient: this.patientId,
      chronic_condition: this.medicationForm.value.chronic_condition,
    };
    this.loader.showLoader();
    this.http.post(`${URLS.ADDMEDICATION}`, _payload).subscribe({
      next: (res) => {
        this.medicationForm.reset();
        this.getMedication();
        this.loader.hideLoader();
        let myModalEl = document.getElementById('medication_tab');
        let modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  getMedication() {
    this.loader.showLoader();
    this.http.get(`${URLS.GETMEDICATION}${this.patientId}/`).subscribe({
      next: (res) => {
        this.medicationSummary = res.data;
        let data = this.medicationSummary.map(
          (detail: { id: any }) => detail.id
        );
        this.medicationId = data[0];
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  showAllMedication(event:any){
    if(event && event.checked && event.checked.length){
      this.loader.showLoader();
      const payload = Object.assign({
        all_medication:true
      });
      this.http.get(`${URLS.GETMEDICATION}${this.patientId}`,payload)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.medicationSummary=res.data;
            
            this.loader.hideLoader();
          },
          error: (err) => {
            this.loader.hideLoader();
            this.toast.openErrorToast(err.message);
          },
        });
    }else(
      this.getMedication()
    )
  }





  public validateMedicationNotesForm(): void {
    if (this.medicationNotesForm.invalid) {
      for (const control of Object.keys(this.medicationNotesForm.controls)) {
        this.medicationNotesForm.controls[control].markAsTouched();
      }
      return;
    }
    let _payload = Object.assign(this.medicationNotesForm.value, {
      patient: this.patientId,
    });
    this.loader.showLoader();
    this.http.post(`${URLS.ADDMEDICATIONNOTES}`, _payload).subscribe({
      next: (res) => {
        this.medicationNotesForm.reset();
        this.getMedicationNotes();
        this.loader.hideLoader();
        let myModalEl = document.getElementById('Notes');
        let modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  getMedicationNotes() {
    this.loader.showLoader();
    this.http.get(`${URLS.GETMEDICATIONNOTES}${this.patientId}/`).subscribe({
      next: (res) => {
        this.medicationNote = res.data;
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  getProvidersData(search?: string) {
    const payload = Object.assign({
      search: search,
    });
    this.isLoadingProviderData = true;
    this.http.get(URLS.PROVIDER_SEARCH, RemoveEmptyKeys(payload)).subscribe({
      next: (res: any) => {
        this.providersArr = res.data.results || [];
        this.isLoadingProviderData = false;
      },
      error: (err: any) => {
        this.isLoadingProviderData = false;
        this.toast.openErrorToast(err.message);
      },
    });
  }
  openMedicationInfoPopUp() {
    this.IsEditMedicationInfo = false;
    this.medicationForm.reset();
  }

  editMedicationInfo(obj: any) {
    if (obj) {
      this.IsEditMedicationInfo = true;
      let programObj: any = {};
      this.medicationSummary.filter((data: any) => {
        if (data.medication_name === obj.medication_name) {
          programObj = data;
        }
      });
      let chronicObj1: any = {};
      this.chronic_conditions.filter((data: any) => {
        if (data.id === obj.chronic_condition) {
          chronicObj1 = data;
        }
      });
      this.medicationForm.patchValue({
        medication_name: this.titlecasePipe.transform(programObj.medication_name),
        dose: programObj.dose,
        category: programObj.category,
        frequency: programObj.frequency,
        prescriber: programObj.prescriber,
        midication_status: programObj.midication_status,
        reasons: programObj.reasons,
        chronic_condition: chronicObj1.id,
      });
    }
  }

  UpdateMedicationInfo() {
    if (this.medicationForm.invalid) {
      for (const control of Object.keys(this.medicationForm.controls)) {
        this.medicationForm.controls[control].markAsTouched();
      }
      return;
    }
    let _payload = Object.assign(this.medicationForm.value, {
      patient: this.patientId,
    });
    if (this.patientId) {
      this.http
        .put(
          `${URLS.UPDATEMEDICATION}${this.medicationId}/${this.patientId}/`,
          _payload
        )
        .subscribe({
          next: (res) => {
            this.IsEditMedicationInfo = false;
            this.getMedication();
            let myModalEl = document.getElementById('Medication');
            let modal = bootstrap.Modal.getInstance(myModalEl);
            this.medicationForm.reset();
            modal.hide();
          },
          error: (err) => {
            this.toast.openErrorToast(err.errors.non_field_errors[0]);
          },
        });
    }
  }
  // getChronicalDisease
  getChronicalDisease() {
    this.loader.showLoader();
    this.http
      .get(`${URLS.GETCHRONICDISEASE}${parseInt(this.patientId)}`)
      .subscribe({
        next: (res) => {
          this.chronic_conditions = res.data;
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });
  }

  openChronicDiseasePopUp(Obj: any) {
    this.cornicData = Obj;
    this._chronicConditionName = Obj.disease_name;
    this.IsEditChronicDiseaseInfo = false;
    this.chronicDiseaseForm.reset();
  }

  addChronicDisease() {
    if (this.chronicDiseaseForm.invalid) {
      for (const control of Object.keys(this.chronicDiseaseForm.controls)) {
        this.chronicDiseaseForm.controls[control].markAsTouched();
      }
      return;
    }
    let _payload = {
      patient: this.patientId,
      chronic: this.cornicData.id,
      name: this.chronicDiseaseForm.value.name,
      description: this.chronicDiseaseForm.value.description,
    };
    this.loader.showLoader();
    this.http.post(`${URLS.ADDCHRONICDISEASELIST}`, _payload).subscribe({
      next: (res) => {
        this.chronicDiseaseForm.reset();
        this.getChronicDiseaseList();
        this.loader.hideLoader();
        let myModalEl = document.getElementById('disease');
        let modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }
  public cornicId: any;
  public cornicData: any;
  patient_chronic_id:any;
  editChronicDisease(obj: any ,value?:any ) {
    if (obj) {
this.patient_chronic_id = value.id
      this._chronicConditionName = obj.disease_name;
      this.cornicData = obj;
      this.cornicId = obj.id;
      this.IsEditChronicDiseaseInfo = true;
      this.chronicDiseaseForm.patchValue({
        name: value.name,
        description: value.description,
        file: value.file,
      });
    }
  }
  updateChronicDiseaseList() {
    if (this.chronicDiseaseForm.invalid) {
      for (const control of Object.keys(this.chronicDiseaseForm.controls)) {
        this.chronicDiseaseForm.controls[control].markAsTouched();
      }
      return;
    }
    let data: any = this.chronicDiseaseForm.value;
    let _payload = Object.assign({
      file: data.file,
      description: data.description,
      name: data.name,
      patient:this.patientId,
      chronic:this.cornicId,

    });
    if (this.cornicId) {
      this.http
        .put(`${URLS.EDITCHRONICDIEASELIST}${parseInt(this.patient_chronic_id)}/${parseInt(this.patientId)}/`, _payload)
        .subscribe({
          next: (res) => {
            this.IsEditChronicDiseaseInfo = false;
            this.getChronicDiseaseList();
            let myModalEl = document.getElementById('disease');
            let modal = bootstrap.Modal.getInstance(myModalEl);
            this.chronicDiseaseForm.reset();
            this.getMedication()
            modal.hide();
          },
          error: (err) => {
            this.toast.openErrorToast(err.errors.non_field_errors[0]);
          },
        });
    }
  }

  getChronicDiseaseList() {
    this.http
      .get(`${URLS.GETCHRONICDISEASELIST}${parseInt(this.patientId)}`)
      .subscribe({
        next: (res) => {
          this.chronic_conditions
          this._desc = res.data.filter(
            (res: any) => res.has_disease === true
          );
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });
  }

  // getItem(event?: any) {
  //   this.prescriberData = event;
  // }
}
