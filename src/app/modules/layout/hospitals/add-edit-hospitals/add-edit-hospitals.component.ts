import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutRoutes } from 'src/app/constants/routes';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { CustomValidators } from 'src/app/_helpers/custom-validators';
import { RemoveEmptyKeys } from 'src/app/_helpers/remove-empty-key';
import { environment } from '../../../../../environments/environment';

interface hospitalDetails {
  npi_id: string;
  hospital_name: string;
  hospital_tax_id: string;
  contact_person_name: string;
  email_id: any;
  contact_number: string;
  address_1: string;
  address_2: string;
  state_province_area: string;
  zip_code: string;
  city: string;
  multiBranches: string;
  website_url: string;
  hospital_status: string;
}

@Component({
  selector: 'app-add-edit-hospitals',
  templateUrl: './add-edit-hospitals.component.html',
  styleUrls: ['./add-edit-hospitals.component.scss'],
})
export class AddEditHospitalsComponent implements OnInit {
  public npiIdData: any = [];
  public multiBranchesArry: any = [];
  public stutusArry: any = [];
  public branchStutusArry: any = [];
  defaultStatus: any = {};
  public hospitalForm!: FormGroup;
  public hospital!: hospitalDetails;
  public _hospId: any = '';
  public customText: string = 'Add Client ';
  public imageUrl: any = environment.IMAGE_URL;
  public otherImgPath: any;
  imgURL: any;
  public attachments: any;
  public hospitalData: any = [];
  isLoadingNPIData = false;
  public uploadedFile: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private _location: Location,
    private loader: LoaderService,
    private toast: ToastService,
    private cd: ChangeDetectorRef
  ) {
    this.hospital = {} as hospitalDetails;
    this.multiBranchesArry = [{ label: 'Yes' }, { label: 'No' }];
    this.stutusArry = [
      { value: 'ACTIVE', label: 'Active' },
      { value: 'INACTIVE', label: 'In-Active' },
      { value: 'SUSPENDED', label: 'Suspended' },
    ];
    this.defaultStatus = 'ACTIVE';
    this._hospId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this._hospId) {
      this.customText = 'Edit Client ';
      this.getHospitalDetails();
    }
    this.initHospitalForm();
  }

  getHospitalDetails() {
    this.loader.showLoader();
    this.httpService
      .get(`${URLS.GETHOSPITALDETAIL}${parseInt(this._hospId)}`)
      .subscribe({
        next: (res) => {
          if (res.status_code === 200) {
            this.hospitalData = res;
            this.npiIdData = [
              { name: res.data.hospital_name, npi: res.data.npi_id },
            ];
          let value=res.data.hospital_status
            this.hospitalForm.patchValue({
              npi_id: { name: res.data.hospital_name, npi: res.data.npi_id },
              hospital_name: res.data.hospital_name,
              hospital_tax_id: res.data.hospital_tax_id,
              contact_person_name: res.data.contact_person_name,
              email_id: res.data.email_id,
              contact_number: res.data.contact_number,
              address_1: res.data.address_1,
              address_2: res.data.address_2,
              state_province_area: res.data.state_province_area,
              zip_code: res.data.zip_code,
              city: res.data.city,
              website_url: res.data.website_url,
              hospital_status: res.data.hospital_status
            });
            this.hospitalForm.get('npi_id')?.disable();
            if (
              this.hospitalData.data &&
              this.hospitalData.data.hospital_image &&
              this.hospitalData.data.hospital_image != ''
            ) {
              let imgUrlServer: any =
                this.imageUrl + this.hospitalData.data.hospital_image;
              this.imgURL = imgUrlServer;
              let n = this.hospitalData.data.hospital_image.split('.');
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

  initHospitalForm() {
    this.hospitalForm = new FormGroup({
      npi_id: new FormControl(this.hospital.npi_id, [Validators.required]),
      hospital_name: new FormControl(this.hospital.hospital_name, [
        Validators.required,
      ]),
      hospital_tax_id: new FormControl(this.hospital.hospital_tax_id, [Validators.required]),
      contact_person_name: new FormControl(this.hospital.contact_person_name, [
        Validators.required,
      ]),
      email_id: new FormControl(this.hospital.email_id, [
        Validators.required,
        CustomValidators.isEmail(),
      ]),
      contact_number: new FormControl(this.hospital.contact_number, [
        Validators.required,
        CustomValidators.isMobile(),
      ]),
      address_1: new FormControl(this.hospital.address_1, [
        Validators.required,
      ]),
      address_2: new FormControl(this.hospital.address_2),
      state_province_area: new FormControl(this.hospital.state_province_area, [
        Validators.required,
      ]),
      zip_code: new FormControl(this.hospital.zip_code, [
        Validators.required,
        // CustomValidators.isPincode(),
      ]),
      city: new FormControl(this.hospital.city, [Validators.required]),
      // multiBranches: new FormControl(this.hospital.multiBranches, [
      //   Validators.required,
      // ]),
      website_url: new FormControl(this.hospital.website_url, ),
      hospital_status: new FormControl(this.hospital.hospital_status, [
        Validators.required,
      ]),
    });
  }

  get H(): { [key: string]: AbstractControl } {
    return this.hospitalForm.controls;
  }

  public validateHospitalForm(): void {
    if (this.hospitalForm.invalid) {
      for (const control of Object.keys(this.hospitalForm.controls)) {
        this.hospitalForm.controls[control].markAsTouched();
      }
      return;
    }
    const fd = new FormData();
    const value: any = this.hospitalForm.getRawValue();
    Object.keys(value).forEach((key: any, i: any) => {
      if(key === 'npi_id') {
        fd.append('npi_id', value.npi_id.npi);
      } else if(this.hospitalForm.get(key)?.value) {
        fd.append(key, this.hospitalForm.get(key)?.value);
      } else fd.append(key, '');
    });
    if (
      (this.attachments && this._hospId) ||
      !this._hospId ||
      this._hospId == ''
    ) {
      fd.append('hospital_image', this.attachments ? this.attachments : '');
    }

    if (this._hospId) {
      this.httpService
        .put(`${URLS.UPDATEHOSPITALDETAIL}${parseInt(this._hospId)}/`, fd)
        .subscribe({
          next: (res) => {
            if (res.status_code === 200) {
              this.router.navigate([LayoutRoutes.DASHBOARD]);
            }
          },
          error: (err) => {
          },
        });
    } else {
      this.httpService.post(URLS.ADDHOSPITAL, fd).subscribe({
        next: (res) => {
          if (res.status_code === 200) {
            this.router.navigate([LayoutRoutes.DASHBOARD]);
          }
        },
        error: (err) => {
          this.toast.openErrorToast(err.message);
        },
      });
    }
  }

  public resethospitalForm(): void {
    this.hospitalForm.reset();
  }

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

  getValue() {
    if (
      this.hospitalData.data &&
      this.hospitalData.data.hospital_image &&
      this.hospitalData.data.hospital_image != ''
    ) {
      var win: any = window.open(
        this.imageUrl + this.hospitalData.data.hospital_image,
        '_blank'
      );
      win.focus();
    }
  }

  getNPIData(search: string) {
    if(!search) {
      return;
    }
    const payload = Object.assign({
      query: search,
    });
    this.isLoadingNPIData = true;
    this.httpService
      .getFromHippaServer(URLS.HOSPITAL_SEARCH, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          res?.forEach((e: any) => {
            e.name = `(${e.npi}) ${e.provider_organization_name_legal_business_name}`;
          });
          this.npiIdData = res || [];
          this.isLoadingNPIData = false;
        },
        error: (err) => {
          this.isLoadingNPIData = false;
          this.toast.openErrorToast(err.message);
        },
      });
  }

  patchNpiData(data: any) {
    this.hospitalForm.get('hospital_name')
      ?.patchValue(data?.provider_organization_name_legal_business_name);
    this.hospitalForm.get('city')?.patchValue(data?.provider_business_practice_location_address_city_name);
    this.hospitalForm.get('zip_code')
      ?.patchValue(data?.provider_business_practice_location_address_postal_code);
    this.hospitalForm.get('state_province_area')
      ?.patchValue(data?.provider_business_practice_location_address_state_name);
    this.hospitalForm.get('contact_number')
      ?.patchValue(data?.provider_business_practice_location_address_telephone_number);
    this.hospitalForm.get('contact_person_name')
      ?.patchValue(`${data?.authorized_official_first_name} ${data?.authorized_official_last_name}`);
    this.hospitalForm.get('address_1')
      ?.patchValue(data?.provider_first_line_business_practice_location_address);
  }
}
