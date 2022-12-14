import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { CustomValidators } from 'src/app/_helpers/custom-validators';
import { URLS } from 'src/app/constants/url';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { environment } from '../../../../../environments/environment';
import * as moment from 'moment';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { RemoveEmptyKeys } from 'src/app/_helpers/remove-empty-key';
import { FULL_ROUTES } from 'src/app/constants/routes';
@Component({
  selector: 'app-add-edit-patient',
  templateUrl: './add-edit-patient.component.html',
  styleUrls: ['./add-edit-patient.component.scss'],
})
export class AddEditPatientComponent implements OnInit {
  FULL_ROUTES = FULL_ROUTES;
  nameTitle: any[];
  receiveAlert: any[];
  items!: MenuItem[];
  providersArr: any[] = [];
  patientForm!: UntypedFormGroup;
  AssignproviderForm!: UntypedFormGroup;
  patientSubmitted: boolean = false;
  isLoadingProviderData = false;
  public _patientId: any = '';
  public customText: string = 'Add patient';
  public imageUrl: any = environment.IMAGE_URL;
  public otherImgPath: any;
  imgURL: any;
  public attachments: any;
  public communArray: any = [];
  public selectTab: any = 'patiDetail';
  isEditMode = false;
  userGender: any = [
    { gender: 'MALE', label: 'Male' },
    { gender: 'FEMALE', label: 'Female' },
    { gender: 'OTHER', label: 'Other' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private loader: LoaderService,
    private toast: ToastService,
    private fb: FormBuilder
  ) {
    this.nameTitle = [{ title: 'Mr' }, { title: 'Mrs' }];
    this.receiveAlert = [{ status: 'Yes' }, { status: 'No' }];
    this.items = [{ label: 'Patient Details' }, { label: 'Contact Details' }];
  }

  ngOnInit(): void {
    this.initForms();
    this.getPatientCommunication();
    if (this.route.snapshot.paramMap.get('id')) {
      this._patientId = this.route.snapshot.paramMap.get('id');
      this.customText = 'Edit Patient ';
      this.getPatientDetail();
      this.isEditMode = true;
    } else {
    }
    this.getProvidersData();
  }

  getPatientDetail() {
    this.loader.showLoader();
    this.httpService
      .get(URLS.GET_PATIENT_DETAIL_BY_ID(this._patientId))
      .subscribe({
        next: (res) => {
          this.imgURL = res.data.profile_pic;
          if (res.data.primary_provider?.length) {
            res.data.primary_provider = res.data.primary_provider[0].id;
          } else {
            this.getProvidersData();
          }
          if (res.data.secondary_provider?.length) {
            res.data.secondary_provider = res.data.secondary_provider[0].id;
          }
          res.data.dob = new Date(res.data.dob);
          this.patientForm.patchValue(res.data);
          this.loader.hideLoader();
        },
        error: (err) => {
          this.toast.openErrorToast(err.errors.non_field_errors[0]);
        },
      });
  }

  initForms() {
    this.patientForm = this.fb.group({
      email: [
        '',
        Validators.compose([Validators.required, CustomValidators.isEmail()]),
      ],
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      profile_pic: [''],
      title: ['', Validators.compose([Validators.required])],
      middle_name: [''],
      gender: ['', Validators.compose([Validators.required])],
      address_1: ['', Validators.compose([Validators.required])],
      address_2: [''],
      cell_phone: [
        '',
        Validators.compose([Validators.required, CustomValidators.isMobile()]),
      ],
      city: ['', Validators.compose([Validators.required])],
      communication: ['data', ],
      home_phone: ['', Validators.compose([Validators.required])],
      medicaid_id: [''],
      medicare_id: [''],
      primary_insurance: [''],
      secondary_insurance: [''],
      state: ['', Validators.compose([Validators.required])],
      zip_code: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required])],
      primary_provider: ['', Validators.compose([Validators.required])],
      secondary_provider: [''],
    });
  }

  get p(): { [key: string]: AbstractControl } {
    return this.patientForm.controls;
  }

  public onSubmitPatient(): void {
    this.patientSubmitted = true;
    if (this.patientForm.invalid) {
      return this.patientForm.markAllAsTouched();
    }
    if (!this.patientForm.value.secondary_provider) {
      delete this.patientForm.value.secondary_provider;
    }
    const payload = this.patientForm.value;
    payload.dob = moment(payload.dob).format('YYYY-MM-DD');
    const fd = new FormData();
    Object.keys(payload).forEach((key: any, i: any) => {
      if (key === 'communication') {
        this.patientForm.value[key].forEach((id: any) => {
          fd.append(key, id);
        });
      } else if (key === 'profile_pic') {
        if (this.attachments) {
          fd.append('profile_pic', this.attachments, this.attachments?.name);
        } else fd.append('profile_pic', '');
      } else {
        fd.append(key, this.patientForm.value[key]);
      }
    });
    if (this._patientId) {
      this.loader.showLoader();
      this.httpService
        .put(`${URLS.UPDATE_PATIENT_DETAIL_BY_ID(this._patientId)}`, fd)
        .subscribe({
          next: (res) => {
            this.toast.openSuccessToast('Patient data updated successfully');
            this.router.navigate([FULL_ROUTES.PATIENTS]);
            this.loader.hideLoader();
          },
          error: (err) => {
            this.loader.hideLoader();
            this.toast.openErrorToast(err.errors.non_field_errors[0]);
          },
        });
    } else {
      this.httpService.post(URLS.ADDPATIENT, fd).subscribe({
        next: (res) => {
          this.toast.openSuccessToast('Patient created successfully');
          this.router.navigate([FULL_ROUTES.PATIENTS]);
        },
        error: (err) => {
          this.toast.openErrorToast(err.errors.non_field_errors[0]);
        },
      });
    }
  }

  public resetPatientForm(): void {
    this.patientForm.reset();
  }

  public uploadedFile: any;
  fileChange(event: any) {
    if (
      event &&
      event.target &&
      event.target.files &&
      event.target.files.length
    ) {
      this.uploadedFile = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.checkFileValidation(this.uploadedFile);
      event.srcElement.value = '';
    }
  }

  checkFileValidation(file: any) {
    if (
      file.name.toLowerCase().endsWith('jpg') ||
      file.name.toLowerCase().endsWith('png') ||
      file.name.toLowerCase().endsWith('jpeg') ||
      file.name.toLowerCase().endsWith('JPEG') ||
      file.name.toLowerCase().endsWith('doc') ||
      file.name.toLowerCase().endsWith('pdf') ||
      file.name.toLowerCase().endsWith('docx') ||
      file.name.toLowerCase().endsWith('xls') ||
      file.name.toLowerCase().endsWith('cgm') ||
      file.name.toLowerCase().endsWith('xlsx') ||
      file.name.toLowerCase().endsWith('csv')
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(this.uploadedFile);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
      let n = this.uploadedFile.name.split('.');
      this.otherImgPath = n[n.length - 1];
      this.attachments = this.uploadedFile;
    }
  }

  getPatientCommunication() {
    this.loader.showLoader();
    this.httpService.get(URLS.GETPATIENTCOMMUNICATION).subscribe({
      next: (res) => {
        this.communArray = res.data;
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
      },
    });
  }

  changeTab(form: any) {
    this.selectTab = form;
  }

  getProvidersData(search?: string) {
    const payload = Object.assign({
      search: search,
    });
    this.isLoadingProviderData = true;
    this.httpService
      .get(URLS.PROVIDER_SEARCH, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          this.providersArr =
            res.data.results.map((p: any) => {
              return { name: p.full_name, id: p.id };
            }) || [];
          this.isLoadingProviderData = false;
        },
        error: (err) => {
          this.isLoadingProviderData = false;
          this.toast.openErrorToast(err.message);
        },
      });
  }
}
