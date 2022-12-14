import { Component, OnInit } from '@angular/core';
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
import { Pagination } from 'src/app/shared/classes/pagination';
import { CustomValidators } from 'src/app/_helpers/custom-validators';
import { RemoveEmptyKeys } from 'src/app/_helpers/remove-empty-key';
import { environment } from '../../../../../environments/environment';

interface ProvidersDetails {
  npi_data: string;
  taxonomy_code_set: string;
  taxonomy_code: string;
  taxonomy_description: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  contact_number_two: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zip_code: string;
  gender: string;
  provider_status: string;
}

@Component({
  selector: 'app-add-edit-providers',
  templateUrl: './add-edit-providers.component.html',
  styleUrls: ['./add-edit-providers.component.scss'],
})
export class AddEditProvidersComponent implements OnInit {
  providersForm!: FormGroup;
  providersSubmitted: boolean = false;
  provider!: ProvidersDetails;
  public _careMgId: any = '';
  public customText: string = 'Add Provider';
  public imageUrl: any = environment.IMAGE_URL;
  public attachments: any;
  public uploadedFile: any;
  public imgURL: any;
  public otherImgPath: any;
  public ProviderData: any = [];
  public npiIdData: any = [];
  public isLoadingNPIData: boolean = false;
  public userGender: any = [];
  public stutusArry: any = [];
  defaultStatus: any = {};
  searchText: string = '';
  totalPages = 0;
  pagination = new Pagination();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private loader: LoaderService,
    private toast: ToastService
  ) {
    this.provider = {} as ProvidersDetails;
    this.stutusArry = [
      { value: 'ACTIVE', label: 'Active' },
      { value: 'INACTIVE', label: 'In-Active' },
      { value: 'SUSPENDED', label: 'Suspended' },
    ];
    this.defaultStatus = 'ACTIVE';
    this._careMgId = this.route.snapshot.paramMap.get('id');
    this.userGender = [
      { value: 'MALE', label: 'Male' },
      { value: 'FEMALE', label: 'Female' },
      { value: 'OTHER', label: 'Other' },
    ];
  }

  ngOnInit(): void {
    if (this._careMgId) {
      this.customText = 'Edit Provider';
      this.getProviderDetails();
    }
    this.initProvidersForm();
  }

  initProvidersForm() {
    this.providersForm = new FormGroup({
      npi_id: new FormControl('', [Validators.required]),
      taxonomy_code_set: new FormControl(this.provider.taxonomy_code_set, [
        Validators.required,
      ]),
      taxonomy_code: new FormControl(this.provider.taxonomy_code, [
        Validators.required,
      ]),
      taxonomy_description: new FormControl(
        this.provider.taxonomy_description,
        [Validators.required]
      ),
      first_name: new FormControl(this.provider.first_name, [
        Validators.required,
      ]),
      middle_name: new FormControl(this.provider.middle_name, [
        // Validators.required,
      ]),
      last_name: new FormControl(this.provider.last_name, [
        Validators.required,
      ]),
      gender: new FormControl(this.provider.gender, [Validators.required]),
      email: new FormControl(this.provider.email, [
        Validators.required,
        CustomValidators.isEmail(),
      ]),
      contact_number: new FormControl(this.provider.contact_number, [
        Validators.required,
        CustomValidators.isMobile(),
      ]),
      contact_number_two: new FormControl(this.provider.contact_number_two, [
        CustomValidators.isMobile(),
        Validators.required,
      ]),
      address_1: new FormControl(this.provider.address_1, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      address_2: new FormControl(this.provider.address_2, [
        // Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      city: new FormControl(this.provider.city, [Validators.required]),
      state: new FormControl(this.provider.state, [Validators.required]),
      zip_code: new FormControl(this.provider.zip_code, [
        Validators.required,
        CustomValidators.isPincode(),
      ]),
      provider_status: new FormControl(this.ProviderData.provider_status, [
        Validators.required,
      ]),
    });
  }

  get p(): { [key: string]: AbstractControl } {
    return this.providersForm.controls;
  }

  // UPLOAD IMAGE
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

  // API'S
  public validatepProvidersForm(): void {
    if (this.providersForm.invalid) {
      for (const control of Object.keys(this.providersForm.controls)) {
        this.providersForm.controls[control].markAsTouched();
      }
      return;
    }
    const fd = new FormData();
    const formValue: any = this.providersForm.getRawValue();
    fd.append('npi_data', formValue.npi_id);
    fd.append('taxonomy_code_set', formValue.taxonomy_code_set);
    fd.append('taxonomy_code', formValue.taxonomy_code);
    fd.append('taxonomy_description', formValue.taxonomy_description);
    fd.append('first_name', formValue.first_name);
    fd.append('middle_name', formValue.middle_name);
    fd.append('last_name', formValue.last_name);
    fd.append('email', formValue.email);
    fd.append('contact_number', formValue.contact_number);
    fd.append('contact_number_two', formValue.contact_number_two);
    fd.append('address_1', formValue.address_1);
    fd.append('address_2', formValue.address_2);
    fd.append('city', formValue.city);
    fd.append('state', formValue.state);
    fd.append('zip_code', formValue.zip_code);
    fd.append('gender', formValue.gender);
    fd.append('provider_status', formValue.provider_status);
    if (
      (this.attachments && this._careMgId) ||
      !this._careMgId ||
      this._careMgId == ''
    ) {
      fd.append('profile_pic', this.attachments ? this.attachments : null);
    } else fd.append('profile_pic', '');

    if (this._careMgId) {
      this.httpService
        .put(`${URLS.UPDATECAREPROVIDER}${parseInt(this._careMgId)}/`, fd)
        .subscribe({
          next: (res) => {
            if (res.status_code === 200) {
              this.router.navigate([LayoutRoutes.PROVIDERS]);
            }
          },
          error: (err) => {
            this.toast.openErrorToast(err.message);
          },
        });
    } else {
      this.httpService.post(URLS.ADDCAREPROVIDER, fd).subscribe({
        next: (res) => {
          if (res.status_code === 200) {
            this.router.navigate([LayoutRoutes.PROVIDERS]);
          }
        },
        error: (err) => {
          this.toast.openErrorToast(err.message);
        },
      });
    }
  }

  public resetProvidersForm(): void {
    this.providersForm.reset();
  }

  getProviderDetails() {
    this.loader.showLoader();
    this.httpService
      .get(`${URLS.GETCAREPROVIDER}${parseInt(this._careMgId)}`)
      .subscribe({
        next: (res) => {
          if (res.status_code === 200) {
            this.ProviderData = res;
            this.providersForm.patchValue({
              npi_id: res.data.npi_data,
              taxonomy_code_set: res.data.taxonomy_code_set,
              taxonomy_code: res.data.taxonomy_code,
              taxonomy_description: res.data.taxonomy_description,
              first_name: res.data.first_name,
              middle_name:
                res.data.middle_name === 'null' ? '' : res.data.middle_name,
              last_name: res.data.last_name,
              email: res.data.email,
              contact_number: res.data.contact_number,
              contact_number_two: res.data.contact_number_two,
              address_1: res.data.address_1,
              address_2:
                res.data.address_2 === 'undefined' ? '' : res.data.address_2,
              city: res.data.city,
              state: res.data.state,
              zip_code: res.data.zip_code,
              gender: res.data.gender,
              provider_status: res.data.provider_status,
            });
            this.providersForm.get('npi_id')?.disable();
            if (
              this.ProviderData.data &&
              this.ProviderData.data.profile_pic &&
              this.ProviderData.data.profile_pic != ''
            ) {
              let imgUrlServer: any = this.ProviderData.data.profile_pic;
              this.imgURL = imgUrlServer;
              let n = this.ProviderData.data.profile_pic.split('.');
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

  onApplySearch(text: string){
    this.searchText = text;
    this.npiIdData = [];
    this.pagination.resetPagination();
    this.getNPIData();
  }

  getNPIData() {
    if (!this.searchText) {
      return;
    }
    const payload = Object.assign(this.pagination.getPaginationData(), {
      query: this.searchText,
    });
    this.isLoadingNPIData = true;
    this.httpService
      .getFromHippaServer(URLS.PROVIDER_SEARCH_HIPPA, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          res?.forEach((e: any) => {
            e.name = `(${e.npi}) ${e.provider_first_name} ${e.provider_last_name_legal_name}`;
          });
          this.npiIdData = res;
          // Uncomment below line if need pagination
          // this.npiIdData.push(...res.items) || [];
          // this.totalPages = res.total;
          this.isLoadingNPIData = false;
        },
        error: (err) => {
          this.isLoadingNPIData = false;
          this.toast.openErrorToast(err.message);
        },
      });
  }

  patchNpiData(data: any) {
    this.providersForm.get('first_name')?.patchValue(data?.provider_first_name);
    this.providersForm
      .get('middle_name')
      ?.patchValue(data?.provider_middle_name);
    this.providersForm
      .get('last_name')
      ?.patchValue(data?.provider_last_name_legal_name);
    this.providersForm
      .get('contact_number')
      ?.patchValue(data?.provider_business_mailing_address_telephone_number);
    this.providersForm
      .get('contact_number_two')
      ?.patchValue(
        data?.provider_business_practice_location_address_telephone_number
      );
    this.providersForm
      .get('taxonomy_code_set')
      ?.patchValue(data?.healthcare_provider_taxonomy_code_1);
    this.providersForm
      .get('taxonomy_code')
      ?.patchValue(data?.healthcare_provider_taxonomy_code_2);
    this.providersForm
      .get('city')
      ?.patchValue(data?.provider_business_mailing_address_city_name);
    this.providersForm
      .get('zip_code')
      ?.patchValue(data?.provider_business_mailing_address_postal_code);
    this.providersForm
      .get('state')
      ?.patchValue(data?.provider_business_mailing_address_state_name);
    this.providersForm
      .get('address_1')
      ?.patchValue(data?.provider_first_line_business_mailing_address);
    this.providersForm
      .get('address_2')
      ?.patchValue(
        data?.provider_first_line_business_practice_location_address
      );
    if (data?.provider_gender_code === 'M') {
      this.providersForm.get('gender')?.patchValue('MALE');
    } else if (data?.provider_gender_code === 'F') {
      this.providersForm.get('gender')?.patchValue('FEMALE');
    } else {
      this.providersForm.get('gender')?.patchValue('OTHER');
    }

    if (data.healthcare_provider_taxonomy_code_1) {
      this.searchTaxonomy(data.healthcare_provider_taxonomy_code_1);
    }
  }

  searchTaxonomy(value?: string) {
    this.loader.showLoader();
    const payload = Object.assign({
      search: value,
    });
    let _providerTaxonomyCode: any;
    let _providerTaxonomyDescription: any;
    this.httpService
      .get(URLS.TAXONOMY_SEARCH_HIPPA, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          res.data.forEach((e: any) => {
            _providerTaxonomyCode = e.provider_taxonomy_code;
            _providerTaxonomyDescription = e.provider_taxonomy_description;
          });
          this.providersForm
            .get('taxonomy_code')
            ?.setValue(_providerTaxonomyCode);
          this.providersForm
            .get('taxonomy_description')
            ?.setValue(_providerTaxonomyDescription);
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
        },
    });
  }

  onScrollToBottom(ev: any) {
    if(this.pagination.page < this.totalPages){
      this.pagination.incrementPage();
      this.getNPIData();
    }
  }
}
