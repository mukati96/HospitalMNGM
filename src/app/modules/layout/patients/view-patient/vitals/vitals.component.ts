import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { RemoveEmptyKeys } from 'src/app/_helpers/remove-empty-key';
import { forkJoin, map } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import * as moment from 'moment';
import { StorageService } from 'src/app/services/storage.service';
declare const bootstrap: any;

@Component({
  selector: 'app-vitals',
  templateUrl: './vitals.component.html',
  styleUrls: ['./vitals.component.scss'],
})
export class VitalsComponent implements OnInit {
  bmiForm!: UntypedFormGroup;
  bloodGlucoseForm!: UntypedFormGroup;
  bloodPressureForm!: UntypedFormGroup;
  colestrolForm!: UntypedFormGroup;
  hba1cForm!: UntypedFormGroup;
  pulseOxForm!: UntypedFormGroup;
  callNotesForm!: UntypedFormGroup;
  patientId!: string | number;
  trackerDetails: any;
  bmidetails: any;
  selectedbmiData: any;
  selectedBP: any;
  selectedGlucose: any;
  selectedCholesterol: any;
  selectedpulseOx: any;
  selectedHBA1C: any;
  showbmi: boolean = true;
  showbloodpressure: boolean = true;
  showbloodglucose: boolean = true;
  showcholestrol: boolean = true;
  showpulseox: boolean = true;
  showhba1c: boolean = true;
  callNotes: any;
  actionButton: string = 'Add';
  currentStringDate = moment(new Date()).format('YYYY-MM-DD');
  vitalsData: any;
  GetvitalData: any = [];
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private http: HttpService,
    private loader: LoaderService,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.storageService.vitalsDataObservable.asObservable().subscribe((res) => {
      this.trackerDetails = Object.assign(res);
    });
    this.patientId = this.route.snapshot.params['id'];
    this.initAllForms();
    this.getAllHealthTrackerDetails();
    
  }
  bmiChange(event: any) {
    this.showbmi = event.checked;
  }
  bloodGlucoseChange(event: any) {
    this.showbloodglucose = event.checked;
  }
  cholesterolChange(event: any) {
    this.showcholestrol = event.checked;
  }
  pulseOxChange(event: any) {
    this.showpulseox = event.checked;
  }
  hba1cChange(event: any) {
    this.showhba1c = event.checked;
  }
  bloodpressureChange(event: any) {
    this.showbloodpressure = event.checked;
  }

  initAllForms() {
    this.initBMIForm();
    this.initBloodGlucoseForm();
    this.initBloodPressureForm();
    this.initColestrolForm();
    this.initHba1cForm();
    this.initPulseOxForm();
  }

  getAllHealthTrackerDetails() {
    this.loader.showLoader();
    forkJoin({
      bmi: this.getBMIDetail(),
      blood_glucose: this.getBloodGlucoseDetail(),
      blood_pressure: this.getBloodPressureDetail(),
      colestrol: this.getColestrolDetail(),
      hba1c: this.getHba1cDetail(),
      pulseOx: this.getPulseOxDetail(),
    }).subscribe({
      next: (res: any) => {
        this.trackerDetails = res;
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  getBMIDetail() {
    return this.http
      .get(`${URLS.BMI}${this.patientId}`)
      .pipe(map((m) => m.data));
  }

  getBloodGlucoseDetail() {
    return this.http
      .get(`${URLS.BLOOD_GLUCOSE}${this.patientId}`)
      .pipe(map((m) => m.data));
  }

  getBloodPressureDetail() {
    return this.http
      .get(`${URLS.BLOOD_PRESSURE}${this.patientId}`)
      .pipe(map((m) => m.data));
  }

  getColestrolDetail() {
    return this.http
      .get(`${URLS.CHOLESTROL}${this.patientId}`)
      .pipe(map((m) => m.data));
  }

  getHba1cDetail() {
    return this.http
      .get(`${URLS.HBA1C}${this.patientId}`)
      .pipe(map((m) => m.data));
  }

  getPulseOxDetail() {
    return this.http
      .get(`${URLS.PULSE_OX}${this.patientId}`)
      .pipe(map((m) => m.data));
  }


  initBMIForm() {
    this.bmiForm = this.fb.group({
      date: ['', Validators.compose([Validators.required])],
      patient: [this.patientId, Validators.compose([Validators.required])],
      weight: ['', Validators.compose([Validators.required])],
      unit: ['kgs', Validators.compose([Validators.required])],
      height_ft: ['', Validators.compose([Validators.required])],
      height_inch: ['', Validators.compose([Validators.required])],
    });
  }

  get bmi() {
    return this.bmiForm.controls;
  }

  initBloodGlucoseForm() {
    this.bloodGlucoseForm = this.fb.group({
      date: ['', Validators.compose([Validators.required])],
      patient: [this.patientId, Validators.compose([Validators.required])],
      test_type: ['', Validators.compose([Validators.required])],
      blood_sugar: ['', Validators.compose([Validators.required])],
      notes: [''],
    });
  }


  get glucose() {
    return this.bloodGlucoseForm.controls;
  }

  initBloodPressureForm() {
    this.bloodPressureForm = this.fb.group({
      date: ['', Validators.compose([Validators.required])],
      patient: [this.patientId, Validators.compose([Validators.required])],
      pulse: ['', Validators.compose([Validators.required])],
      systolic: ['', Validators.compose([Validators.required])],
      diastolic: ['', Validators.compose([Validators.required])],
      notes: [''],
    });
  }

  get pressure() {
    return this.bloodPressureForm.controls;
  }

  initColestrolForm() {
    this.colestrolForm = this.fb.group({
      date: ['', Validators.compose([Validators.required])],
      patient: [this.patientId, Validators.compose([Validators.required])],
      total_cholesterol: ['', Validators.compose([Validators.required])],
      triglycerides: ['', Validators.compose([Validators.required])],
      hdl: ['', Validators.compose([Validators.required])],
      ldl: ['', Validators.compose([Validators.required])],
      notes: [''],
    });
  }

  get colestrol() {
    return this.colestrolForm.controls;
  }

  initHba1cForm() {
    this.hba1cForm = this.fb.group({
      date: ['', Validators.compose([Validators.required])],
      patient: [this.patientId, Validators.compose([Validators.required])],
      hbaic: ['', Validators.compose([Validators.required])],
      notes: [''],
    });
  }

  get hba1c() {
    return this.hba1cForm.controls;
  }

  initPulseOxForm() {
    this.pulseOxForm = this.fb.group({
      date: ['', Validators.compose([Validators.required])],
      patient: [this.patientId, Validators.compose([Validators.required])],
      pulse_rate: ['', Validators.compose([Validators.required])],
      spo2: [''],
      notes: [''],
    });
  }

  get pulse() {
    return this.pulseOxForm.controls;
  }



  closePopup(popupId: string) {
    let myModalEl = document.getElementById(popupId);
    let modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  }

  openPopup(popupId: string, isEdit: boolean = false) {
    this.actionButton = isEdit ? 'Update' : 'Add';
    if (!isEdit && popupId === 'addBMI') {
      this.bmiForm.reset();
      this.selectedbmiData = undefined;
      this.bmiForm.get('patient')?.patchValue(this.patientId);
      this.bmiForm
        .get('date')
        ?.patchValue(moment(new Date()).format('YYYY-MM-DD'));
    }
    if (!isEdit && popupId === 'BloodGlucose') {
      this.bloodGlucoseForm.reset();
      this.selectedGlucose = undefined;
      this.bloodGlucoseForm.get('patient')?.patchValue(this.patientId);
      this.bloodGlucoseForm
        .get('date')
        ?.patchValue(moment(new Date()).format('YYYY-MM-DD'));
    }
    if (!isEdit && popupId === 'BloodPressure') {
      this.bloodPressureForm.reset();
      this.selectedBP = undefined;
      this.bloodPressureForm.get('patient')?.patchValue(this.patientId);
      this.bloodPressureForm
        .get('date')
        ?.patchValue(moment(new Date()).format('YYYY-MM-DD'));
    }
    if (!isEdit && popupId === 'BloodCholesterol') {
      this.colestrolForm.reset();
      this.selectedCholesterol = undefined;
      this.colestrolForm.get('patient')?.patchValue(this.patientId);
      this.colestrolForm
        .get('date')
        ?.patchValue(moment(new Date()).format('YYYY-MM-DD'));
    }
    if (!isEdit && popupId === 'Hba1c') {
      this.hba1cForm.reset();
      this.selectedHBA1C = undefined;
      this.hba1cForm.get('patient')?.patchValue(this.patientId);
      this.hba1cForm
        .get('date')
        ?.patchValue(moment(new Date()).format('YYYY-MM-DD'));
    }
    if (!isEdit && popupId === 'PulseOx') {
      this.pulseOxForm.reset();
      this.selectedpulseOx = undefined;
      this.pulseOxForm.get('patient')?.patchValue(this.patientId);
      this.pulseOxForm
        .get('date')
        ?.patchValue(moment(new Date()).format('YYYY-MM-DD'));
    }

    var modal = new bootstrap.Modal(document.getElementById(popupId));
    modal.show();
  }

  onSubmitBMIForm() {
    if (this.bmiForm.invalid) {
      this.bmiForm.markAllAsTouched();
    }
    else {
      if (this.bmiForm.valid) {
        this.submitted = true;
      }
      if (this.selectedbmiData?.id) {
        this.submitted = false;
        this.http
          .put(
            `${URLS.BMI}${this.selectedbmiData.id}/${this.patientId}/`,
            RemoveEmptyKeys(this.bmiForm.value)
          )
          .subscribe({
            next: async (res) => {
              this.toast.openSuccessToast('BMI data updated successfully');
              this.closePopup('addBMI');
              this.bmiForm.reset();
              this.selectedbmiData = null;
              this.getBMIDetail().subscribe({
                next: (res) => {
                  this.trackerDetails.bmi = res;
                },
              });
            },
            error: (err) => {
              this.toast.openErrorToast(err.message);
            },
          });
      } else {
        this.http
          .post(URLS.BMI, RemoveEmptyKeys(this.bmiForm.value))
          .subscribe({
            next: async (res) => {
              this.toast.openSuccessToast('BMI added successfully');
              this.closePopup('addBMI');
              this.bmiForm.reset();
              this.getBMIDetail().subscribe({
                next: (res) => {
                  this.trackerDetails.bmi = res;
                  this.submitted = false;
                },
              });
            },
            error: (err) => {
              this.toast.openErrorToast(err.message);
            },
          });
      }
    }
  }

  onUpdateBMI(data: any) {
    this.selectedbmiData = data;
    this.bmiForm.patchValue(data);
    this.openPopup('addBMI', true);
  }

  onSubmitBloodGlucoseForm() {
    if (this.bloodGlucoseForm.invalid) {
      this.bloodGlucoseForm.markAllAsTouched();
    } else {
      if (this.selectedGlucose?.id) {
        this.http
          .put(
            `${URLS.BLOOD_GLUCOSE}${this.selectedGlucose.id}/${this.patientId}/`,
            RemoveEmptyKeys(this.bloodGlucoseForm.value)
          )
          .subscribe({
            next: async (res) => {
              this.toast.openSuccessToast('Blood Glucose updated successfully');
              this.closePopup('BloodGlucose');
              this.bloodGlucoseForm.reset();
              this.selectedGlucose = null;
              this.getBloodGlucoseDetail().subscribe({
                next: (res) => {
                  this.trackerDetails.blood_glucose = res;
                },
              });
            },
            error: (err) => {
              this.toast.openErrorToast(err.message);
            },
          });
      } else {
        this.http
          .post(
            URLS.BLOOD_GLUCOSE,
            RemoveEmptyKeys(this.bloodGlucoseForm.value)
          )
          .subscribe({
            next: async (res) => {
              this.toast.openSuccessToast('Blood Glucose added successfully');
              this.closePopup('BloodGlucose');
              this.bloodGlucoseForm.reset();
              this.getBloodGlucoseDetail().subscribe({
                next: (res) => {
                  this.trackerDetails.blood_glucose = res;
                },
              });
            },
            error: (err) => {
              this.toast.openErrorToast(err.message);
            },
          });
      }
    }
  }

  onUpdateGlucose(data: any) {
    this.selectedGlucose = data;
    this.bloodGlucoseForm.patchValue(data);
    this.openPopup('BloodGlucose', true);
  }

  onSubmitBloodPressureForm() {
    if (this.bloodPressureForm.invalid) {
      this.bloodPressureForm.markAllAsTouched();
    } else {
      if (this.selectedBP?.id) {
        this.http
          .put(
            `${URLS.BLOOD_PRESSURE}${this.selectedBP.id}/${this.patientId}/`,
            RemoveEmptyKeys(this.bloodPressureForm.value)
          )
          .subscribe({
            next: async (res) => {
              this.toast.openSuccessToast('Blood Pressure updated successfully');
              this.closePopup('BloodPressure');
              this.bloodPressureForm.reset();
              this.selectedBP = null;
              this.getBloodPressureDetail().subscribe({
                next: (res) => {
                  this.trackerDetails.blood_pressure = res;
                },
              });
            },
            error: (err) => {
              this.toast.openErrorToast(err.message);
            },
          });
      } else {
        this.http
          .post(
            URLS.BLOOD_PRESSURE,
            RemoveEmptyKeys(this.bloodPressureForm.value)
          )
          .subscribe({
            next: async (res) => {
              this.toast.openSuccessToast('Blood Pressure Added Successfully');
              this.closePopup('BloodPressure');
              this.bloodPressureForm.reset();
              this.selectedBP = null;
              this.getBloodPressureDetail().subscribe({
                next: (res) => {
                  this.trackerDetails.blood_pressure = res;
                },
              });
            },
            error: (err) => {
              this.toast.openErrorToast(err.message);
            },
          });
      }
    }
  }

  onUpdateBP(data: any) {
    this.selectedBP = data;
    this.bloodPressureForm.patchValue(data);
    this.openPopup('BloodPressure', true);
  }

  onSubmitColestrolForm() {
    if (this.colestrolForm.invalid) {
      this.colestrolForm.markAllAsTouched();
    } else {
      if (this.selectedCholesterol?.id) {
        this.http
          .put(
            `${URLS.CHOLESTROL}${this.selectedCholesterol.id}/${this.patientId}/`,
            RemoveEmptyKeys(this.colestrolForm.value)
          )
          .subscribe({
            next: async (res) => {
              this.toast.openSuccessToast('Colestrol updated successfully');
              this.closePopup('BloodCholesterol');
              this.colestrolForm.reset();
              this.selectedCholesterol = null;
              this.getColestrolDetail().subscribe({
                next: (res) => {
                  this.trackerDetails.colestrol = res;
                },
              });
            },
            error: (err) => {
              this.toast.openErrorToast(err.message);
            },
          });
      } else {
        this.http
          .post(URLS.CHOLESTROL, RemoveEmptyKeys(this.colestrolForm.value))
          .subscribe({
            next: (res) => {
              this.toast.openSuccessToast('Colestrol added successfully');
              this.closePopup('BloodCholesterol');
              this.colestrolForm.reset();
              this.getColestrolDetail().subscribe({
                next: (res) => {
                  this.trackerDetails.colestrol = res;
                },
              });
            },
            error: (err) => {
              this.toast.openErrorToast(err.message);
            },
          });
      }
    }
  }

  onUpdateCholesterol(data: any) {
    this.selectedCholesterol = data;
    this.colestrolForm.patchValue(data);
    this.openPopup('BloodCholesterol', true);
  }

  onSubmitHba1cForm() {
    if (this.hba1cForm.invalid) {
      this.hba1cForm.markAllAsTouched();
    } else {
      if (this.selectedHBA1C?.id) {
        this.http
          .put(
            `${URLS.HBA1C}${this.selectedHBA1C.id}/${this.patientId}/`,
            RemoveEmptyKeys(this.hba1cForm.value)
          )
          .subscribe({
            next: async (res) => {
              this.toast.openSuccessToast('Hba1c updated successfully');
              this.closePopup('Hba1c');
              this.hba1cForm.reset();
              this.selectedHBA1C = null;
              this.getHba1cDetail().subscribe({
                next: (res) => {
                  this.trackerDetails.hba1c = res;
                },
              });
            },
            error: (err) => {
              this.toast.openErrorToast(err.message);
            },
          });
      } else {
        this.http
          .post(URLS.HBA1C, RemoveEmptyKeys(this.hba1cForm.value))
          .subscribe({
            next: (res) => {
              this.toast.openSuccessToast('Hba1c added successfully');
              this.closePopup('Hba1c');
              this.hba1cForm.reset();
              this.getHba1cDetail().subscribe({
                next: (res) => {
                  this.trackerDetails.hba1c = res;
                },
              });
            },
            error: (err) => {
              this.toast.openErrorToast(err.message);
            },
          });
      }
    }
  }
  onUpdateHBA1C(data: any) {
    this.selectedHBA1C = data;
    this.hba1cForm.patchValue(data);
    this.openPopup('Hba1c', true);
  }

  onSubmitPulseOxForm() {
    if (this.pulseOxForm.invalid) {
      this.pulseOxForm.markAllAsTouched();
    } else {
      if (this.selectedpulseOx?.id) {
        this.http
          .put(
            `${URLS.PULSE_OX}${this.selectedpulseOx.id}/${this.patientId}/`,
            RemoveEmptyKeys(this.pulseOxForm.value)
          )
          .subscribe({
            next: async (res) => {
              this.toast.openSuccessToast('Pulse Ox updated successfully');
              this.closePopup('PulseOx');
              this.pulseOxForm.reset();
              this.selectedpulseOx = null;
              this.getPulseOxDetail().subscribe({
                next: (res) => {
                  this.trackerDetails.pulseOx = res;
                },
              });
            },
            error: (err) => {
              this.toast.openErrorToast(err.message);
            },
          });
      } else {
        this.http
          .post(URLS.PULSE_OX, RemoveEmptyKeys(this.pulseOxForm.value))
          .subscribe({
            next: (res) => {
              this.toast.openSuccessToast('Pulse Ox added successfully');
              this.closePopup('PulseOx');
              this.pulseOxForm.reset();
              this.getPulseOxDetail().subscribe({
                next: (res) => {
                  this.trackerDetails.pulseOx = res;
                },
              });
            },
            error: (err) => {
              this.toast.openErrorToast(err.message);
            },
          });
      }
    }
  }

  onUpdatepulseOx(data: any) {
    this.selectedpulseOx = data;
    this.pulseOxForm.patchValue(data);
    this.openPopup('PulseOx', true);
  }

 

  getGraphData(data: any, slug: string) {
    data.reverse();
    if (slug === 'BMI') {
      return data.map((m: any) => parseInt(m.weight) || 0);
    } else if (slug === 'BP') {
      return data.map((m: any) => parseInt(m.pulse) || 0);
    } else if (slug === 'BG') {
      return data.map((m: any) => parseInt(m.blood_sugar) || 0);
    } else if (slug === 'CH') {
      return data.map((m: any) => parseInt(m.total_cholesterol) || 0);
    } else if (slug === 'PO') {
      return data.map((m: any) => parseInt(m.pulse_rate) || 0);
    } else if (slug === 'HB') {
      return data.map((m: any) => parseInt(m.hbaic) || 0);
    } else return [];
  }
}
