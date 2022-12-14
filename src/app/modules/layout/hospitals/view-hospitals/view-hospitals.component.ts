import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { CustomValidators } from 'src/app/_helpers/custom-validators';
import { RemoveEmptyKeys } from 'src/app/_helpers/remove-empty-key';
import { environment } from '../../../../../environments/environment';
import { TitleCasePipe } from '@angular/common';
import { MenuItem } from 'primeng/api';
interface hospitalDetails {
  contact_person_name: string;
  email_id: any;
  contact_number: string;
  street: string;
  city: string;
  state_province_area: string;
  zip_code: string;
  hospital_status: string;
}
interface branchDetails {
  branch_name: string;
  contact_email: string;
  location: string;
  hospital_branch_status: string;
  hospital: string;
  contact_number: string;
}

interface AdminDetails {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  password: string;
  practice_admin_status: string;
}

interface ProviderDetails {
  npi_data: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  contact_number: string;
  provider_status: string;
  hospital_branch: string;
  zip_code: string;
}

interface CareManagerDetails {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact: string;
  address: string;
  care_manager_status: string;
  hospital_branch: string;
}

@Component({
  selector: 'app-view-hospitals',
  templateUrl: './view-hospitals.component.html',
  styleUrls: ['./view-hospitals.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewHospitalsComponent implements OnInit {
  public hospitalForm!: FormGroup;
  public hospital!: hospitalDetails;
  public hospitalSubmitted: boolean = false;
  public userCols: any = [];
  public locationcols: any = [];
  public displayBranch: boolean = false;
  public displayAdminForm: boolean = false;
  public displayProvider: boolean = false;
  public displayCaremanager: boolean = false;
  public displayAddPopup: boolean = false;
  public branch!: branchDetails;
  public admin!: AdminDetails;
  public provider!: ProviderDetails;
  public careManager!: CareManagerDetails;
  public BranchForm!: FormGroup;
  public AddForm!: FormGroup;
  public AdminForm!: FormGroup;
  public providerForm!: FormGroup;
  public careManagerForm!: FormGroup;
  public branchStutusArry: any = [];
  public npiArry: any = [];
  public items!: MenuItem[];
  public _hospId: any = '';
  public _hospDetails: any = '';
  public displaySucessPopup: boolean = false;
  public _popUpText: string = '';
  public _popUpImage: string = '';
  public _popUpBtnColour: string = '';
  public _branch: any = [];
  receiveAlert: any[];
  public _branchDetails: any;
  public _branchPopUpName: string = 'Add Location';
  public _users: [] = [];
  public _careManagerDetails: any;
  public _careManagerPopUpName: string = 'Add Care Manager';
  public _adminDetails: any;
  public _adminDetailPopUpName: string = 'Add Practice Admin';
  public _providerDetails: any;
  public _providerDetailPopUpName: string = 'Add Provider';
  public imgURL: any;
  public otherImgPath: any;
  public imageUrl: any = environment.IMAGE_URL;
  public isLoadingNPIData = false;
  public npiIdData: any = [];
  defaultStatus: any = {};
  submitButton: boolean = false;
  submittingBranchData: boolean = false;
  submittingPracticeAdminData: boolean = false;
  submittingProviderData: boolean = false;
  submittingCareManagerData: boolean = false;
  hospitalBranch: any;
  patients: any[] = [];
  outreachRadio: any = {};
  selectedCategory: any = null;
  addFields = [
    { name: 'User', key: 'user' },
    { name: 'Location', key: 'location' },
    { name: 'Provider', key: 'provider' },
    { name: 'Care Mangager', key: 'care_manager' },
  ];
  public selectTab: any = 'User';
  
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private toast: ToastService,
    private titleCasePipe: TitleCasePipe
  ) {
    this.hospital = {} as hospitalDetails;
    this.branch = {} as branchDetails;
    this.admin = {} as AdminDetails;
    this.provider = {} as ProviderDetails;
    this.careManager = {} as CareManagerDetails;
    this._hospId = this.route.snapshot.paramMap.get('id');
    this.receiveAlert = [{ status: 'Yes' }, { status: 'No' }];
  }

  ngOnInit(): void {
    this.initHospitalForm();
    this.initBranchForm();
    this.initAdminForm();
    this.initProviderForm();
    this.initCareManagerForm();
    this.selectedCategory = this.addFields;
    console.log(this.selectedCategory);
    this.userCols = [
      { field: 'full_name', header: 'Name', width: '15%' },
      { field: 'contact_number', header: 'Contact Number', width: '15%' },
      { field: 'email', header: 'Email', width: '15%' },
      { field: 'user_type', header: 'User Type', width: '15%' },
      { field: 'user_status', header: 'Status', width: '15%' },
    ];

    this.locationcols = [
      { field: 'branch_name', header: 'Branch Name', width: '15%' },
      { field: 'contact_number', header: 'Contact Number', width: '15%' },
      { field: 'email', header: 'Email', width: '15%' },
      { field: 'hospital_branch_status', header: 'Status', width: '15%' },
      { field: 'location', header: 'Location', width: '15%' },
    ];

    this.branchStutusArry = [
      { value: 'ACTIVE', label: 'Active' },
      { value: 'INACTIVE', label: 'In-Active' },
      { value: 'SUSPENDED', label: 'Suspended' },
    ];

    this.items = [
      {
        label: 'Add Location',
        command: () => {
          this.showBranchDialog();
        },
      },
      {
        label: 'Add Admin',
        command: () => {
          this.showAdminDialog();
        },
      },
      {
        label: ' Add Provider',
        command: () => {
          this.showProviderDialog();
        },
      },
      {
        label: 'Care Manager',
        command: () => {
          this.showCareManagerDialog();
        },
      },
    ];
    this.defaultStatus = 'active';
    this.npiArry = [{ label: 'test0' }, { label: 'test1' }];

    if (this._hospId) {
      this.getHospitalDetails();
      this.getBranch();
      this.getUser();
    }
  }

  get H(): { [key: string]: AbstractControl } {
    return this.hospitalForm.controls;
  }

  get B(): { [key: string]: AbstractControl } {
    return this.BranchForm.controls;
  }

  get A(): { [key: string]: AbstractControl } {
    return this.AdminForm.controls;
  }

  get U(): { [key: string]: AbstractControl } {
    return this.providerForm.controls;
  }

  get C(): { [key: string]: AbstractControl } {
    return this.careManagerForm.controls;
  }

  initBranchForm() {
    this.BranchForm = new FormGroup({
      branch_name: new FormControl(this.branch.branch_name, [
        Validators.required,
      ]),
      location: new FormControl(this.branch.location, [Validators.required]),
      contact_email: new FormControl(this.branch.contact_email, [
        Validators.required,
        CustomValidators.isEmail(),
      ]),
      contact_number: new FormControl(this.branch.contact_number, [
        Validators.required,
        CustomValidators.isMobile(),
      ]),
      hospital_branch_status: new FormControl(this.branchStutusArry[0], [
        Validators.required,
      ]),
    });
  }

  initAdminForm() {
    this.AdminForm = new FormGroup({
      first_name: new FormControl(this.admin.first_name, [Validators.required]),
      last_name: new FormControl(this.admin.last_name, [Validators.required]),
      email: new FormControl(this.admin.email, [
        Validators.required,
        CustomValidators.isEmail(),
      ]),
      contact_number: new FormControl(this.admin.contact_number, [
        Validators.required,
        CustomValidators.isMobile(),
      ]),
      password: new FormControl(this.admin.password, [Validators.required]),
      practice_admin_status: new FormControl(this.branchStutusArry[0], [
        Validators.required,
      ]),
    });
  }

  initProviderForm() {
    this.providerForm = new FormGroup({
      npi_data: new FormControl(this.provider.npi_data, [Validators.required]),
      first_name: new FormControl(this.provider.first_name, [
        Validators.required,
      ]),
      last_name: new FormControl(this.provider.last_name, [
        Validators.required,
      ]),
      email: new FormControl(this.provider.email, [
        Validators.required,
        CustomValidators.isEmail(),
      ]),
      password: new FormControl(this.provider.password, [Validators.required]),
      contact_number: new FormControl(this.provider.contact_number, [
        Validators.required,
        CustomValidators.isMobile(),
      ]),
      provider_status: new FormControl(this.branchStutusArry[0], [
        Validators.required,
      ]),
      hospital_branch: new FormControl(this.provider.hospital_branch),
      zip_code: new FormControl(this.provider.zip_code, [Validators.required]),
      // role: new FormControl(this.provider.role, [Validators.required]),
    });
  }

  initCareManagerForm() {
    this.careManagerForm = new FormGroup({
      first_name: new FormControl(this.careManager.first_name, [
        Validators.required,
      ]),
      last_name: new FormControl(this.careManager.last_name, [
        Validators.required,
      ]),
      email: new FormControl(this.careManager.email, [
        Validators.required,
        CustomValidators.isEmail(),
      ]),
      contact: new FormControl(this.careManager?.contact, [
        Validators.required,
        CustomValidators.isMobile(),
      ]),
      address: new FormControl(this.careManager.address, [Validators.required]),
      password: new FormControl(this.careManager.password, [
        Validators.required,
      ]),
      care_manager_status: new FormControl({ label: 'ACTIVE' }, [
        Validators.required,
      ]),
      hospital_branch: new FormControl(this.careManager.hospital_branch, [
        Validators.required,
      ]),
    });
  }

  initHospitalForm() {
    this.hospitalForm = new FormGroup({
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
      street: new FormControl(this.hospital.street, [Validators.required]),
      city: new FormControl(this.hospital.city, [Validators.required]),
      state_province_area: new FormControl(this.hospital.state_province_area, [
        Validators.required,
      ]),
      zip_code: new FormControl(this.hospital.zip_code, [
        Validators.required,
        CustomValidators.isPincode(),
      ]),
      hospital_status: new FormControl('', [Validators.required]),
    });
  }

  showAdminDialog() {
    this._careManagerPopUpName = 'Add Practice Admin';
    this.defaultStatus = 'ACTIVE';
    this.displayAdminForm = true;
  }

  showBranchDialog() {
    this._branchPopUpName = 'Add Location';
    this.defaultStatus = 'ACTIVE';
    this.displayBranch = true;
  }

  showProviderDialog() {
    this._providerDetailPopUpName = 'Add Provider';
    this.defaultStatus = 'ACTIVE';
    this.displayProvider = true;
  }

  showCareManagerDialog() {
    this._careManagerPopUpName = 'Add Care Manager';
    this.defaultStatus = 'ACTIVE';
    this.displayCaremanager = true;
  }

  showAddDialog() {
    this.displayAddPopup = true;
  }

  closeProviderDialog() {
    this.providerForm.reset();
    this.displayProvider = false;
  }

  closeBranchDialog() {
    this.BranchForm.reset();
    this.displayBranch = false;
  }

  closeAdminDialog() {
    this.AdminForm.reset();
    this.displayAdminForm = false;
  }

  closeCareManagerDialog() {
    this.careManagerForm.reset();
    this.displayCaremanager = false;
  }

  closeAddDialog() {
    this.displayAddPopup = false;
  }

  // EDIT USER'S POPUP
  public openUserPopUp(user: any) {
    if (user.user_type === 'Care Manager') {
      this.careManagerForm.controls['password'].disable();
      this._careManagerPopUpName = 'Edit Care Manager';
      this.loader.showLoader();
      this.httpService
        .get(`${URLS.GETCAREMANEGERDETAILS}${parseInt(user.user_type_id)}/`)
        .subscribe({
          next: (res) => {
            if (res.status_code === 200) {
              this._careManagerDetails = res.data;
              this.careManagerForm.patchValue({
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                email: res.data.email,
                contact: res.data.contact,
                address: res.data.address,
                password: '',
                care_manager_status: res.data.care_manager_status,
                hospital_branch: res.data.hospital_branch,
              });
              this.displayCaremanager = true;
            }
            this.loader.hideLoader();
          },
          error: (err: any) => {
            this.loader.hideLoader();
          },
        });
    } else if (user.user_type === 'Provider') {
      this.providerForm.controls['npi_data'].disable();
      this.providerForm.controls['password'].disable();
      this._providerDetailPopUpName = 'Edit Provider';
      this.loader.showLoader();
      this.httpService
        .get(`${URLS.GETPROVIDERDETAILS}${parseInt(user.user_type_id)}/`)
        .subscribe({
          next: (res) => {
            if (res.status_code === 200) {
              this._providerDetails = res.data;
              this.npiIdData = [
                { name: res.data.first_name, npi_id: res.data.npi_data },
              ];

              this._branch.filter((data: any) => {
                if (data.location === res.data.hospital_branch) {
                  this.hospitalBranch = data;
                }
              });

              this.providerForm.patchValue({
                npi_data: res.data.npi_data,
                email: res.data.email,
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                contact_number: res.data.contact_number,
                provider_status: (res.data.provider_status).toUpperCase(),
                // provider_status: res.data.provider_status.toLowerCase(),
                password: '',
                hospital_branch: this.hospitalBranch?.branch_id,
                zip_code: res.data.zip_code,
              });
              this.displayProvider = true;
            }
            this.loader.hideLoader();
          },
          error: (err: any) => {
            this.loader.hideLoader();
          },
        });
    } else if (user.user_type === 'Practice Admin') {
      this.AdminForm.controls['password'].disable();
      this._adminDetailPopUpName = 'Edit Practice Admin';
      this.loader.showLoader();
      this.httpService
        .get(`${URLS.GETADMINDETAILS}${parseInt(user.user_type_id)}/`)
        .subscribe({
          next: (res) => {
            if (res.status_code === 200) {
              this._adminDetails = res.data;
              this.AdminForm.setValue({
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                email: res.data.email,
                contact_number: res.data.contact_number,
                password: '',
                practice_admin_status: res.data.practice_admin_status,
              });
              this.displayAdminForm = true;
            }
            this.loader.hideLoader();
          },
          error: (err: any) => {
            this.loader.hideLoader();
          },
        });
    }
  }

  // EDIT BRANCH POPUP
  public openLocationPopUp(data: any) {
    this._branchPopUpName = 'Edit Branch';
    this.loader.showLoader();
    this.httpService
      .get(`${URLS.GETBRANCHDETAILS}${parseInt(data?.branch_id)}`)
      .subscribe({
        next: (res) => {
          if (res.status_code === 200) {
            this._branchDetails = res.data;
            this.BranchForm.setValue({
              branch_name: data.branch_name,
              contact_email: data.email,
              location: data.location,
              contact_number: data.contact_number,
              hospital_branch_status: data.hospital_branch_status
                ? data.hospital_branch_status
                : '',
            });
            this.displayBranch = true;
          }
          this.loader.hideLoader();
        },
        error: (err: any) => {
          this.loader.hideLoader();
        },
      });
  }

  // API'S
  getHospitalDetails() {
    this.loader.showLoader();
    this.httpService
      .get(`${URLS.GETHOSPITALDETAIL}${parseInt(this._hospId)}`)
      .subscribe({
        next: (res) => {
          if (res.status_code === 200) {
            this._hospDetails = res.data;
            this.hospitalForm.patchValue({
              contact_person_name: res.data.contact_person_name,
              email_id: res.data.email_id,
              contact_number: res.data.contact_number,
              street: res.data.address_1 + ' ' + res.data.address_2,
              city: res.data.city,
              state_province_area: res.data.state_province_area,
              zip_code: res.data.zip_code,
              hospital_status: this.titleCasePipe.transform(
                res.data.hospital_status
              ),
            });
            if (
              this._hospDetails &&
              this._hospDetails.hospital_image &&
              this._hospDetails.hospital_image != ''
            ) {
              let imgUrlServer: any =
                this.imageUrl + this._hospDetails.hospital_image;
              this.imgURL = imgUrlServer;
              let n = this._hospDetails.hospital_image.split('.');
              this.otherImgPath = n[n.length - 1];
            }
          }
          this.loader.hideLoader();
        },
        error: (err: any) => {
          this.loader.hideLoader();
        },
      });
  }

  //Add button
  public onAddSubmit() {
    if(this.selectedCategory.name==='User'){
      this.showAdminDialog();
    } else if(this.selectedCategory.name==='Location'){
      this.showBranchDialog();
    } else if(this.selectedCategory.name==='Provider'){
      this.showProviderDialog();
    } else if(this.selectedCategory.key==='care_manager'){
      this.showCareManagerDialog();
    }
    this.closeAddDialog();
  }

  // ADD/EDIT BRANCH
  public validateBranchForm(): void {
    if (this.BranchForm.invalid) {
      for (const control of Object.keys(this.BranchForm.controls)) {
        this.BranchForm.controls[control].markAsTouched();
      }
      return;
    }
    let _hiddneFields: any = {
      hospital: this._hospDetails.id,
    };
    let _payload = Object.assign(this.BranchForm.value, _hiddneFields);
    this.submittingBranchData = true;
    if (this._branchDetails?.id) {
      this.httpService
        .put(
          `${URLS.EDITBRANCHDETAILS}${parseInt(this._branchDetails.id)}/`,
          _payload
        )
        .subscribe({
          next: (res) => {
            this.submittingBranchData = false;
            this.displayBranch = false;
            this._popUpImage = '/assets/images/img-3.svg';
            this._popUpText = `You have successfully updated a <b>Branch</b> for <span class="_text1">${res.data.branch_name} - ${res.data.location}</span> `;
            this._popUpBtnColour = '#00A040';
            this.displaySucessPopup = true;
            this.getBranch();
          },
          error: (err) => {
            this.submittingBranchData = false;
          },
        });
    } else {
   
      this.httpService.post(URLS.ADDBRANCH, _payload).subscribe({
        next: (res) => {
          this.displayBranch = false;
          this.submittingBranchData = false;
          this._popUpImage = '/assets/images/img-3.svg';
          this._popUpText = `You have successfully created a <b>Branch</b> for <span class="_text1">${res.data.branch_name} - ${res.data.location}</span> `;
          this._popUpBtnColour = '#00A040';
          this.displaySucessPopup = true;
          this.getBranch();
        },
        error: (err) => {
          this.submittingBranchData = false;
          if (err.errors?.non_field_errors?.length) {
            this.toast.openErrorToast(err.errors?.non_field_errors[0]);
          }
        },
      });
    }
  }

  // ADD/EDIT ADMIN
  public validateAdminsForm(): void {
    if (this.AdminForm.invalid) {
      for (const control of Object.keys(this.AdminForm.controls)) {
        this.AdminForm.controls[control].markAsTouched();
      }
      return;
    }
    let _hiddneFields: any = {
      hospital: this._hospDetails.id,
    };
    this.AdminForm.value.practice_admin_status =
      this.AdminForm.value.practice_admin_status;
    let _payload = Object.assign(this.AdminForm.value, _hiddneFields);
    this.submittingPracticeAdminData = true;
    if (this._adminDetails?.id) {
      this.httpService
        .put(
          `${URLS.EDITADMINDETAILS}${parseInt(this._adminDetails.id)}/`,
          _payload
        )
        .subscribe({
          next: (res) => {
            this.submittingPracticeAdminData = false;
            this.displayAdminForm = false;
            this._popUpImage = '/assets/images/img-2.svg';
            this._popUpText = `You have successfully edited
            <span class="_text2">${
              res.data.first_name + ' ' + res.data.last_name
            }</span>
            as a <b>Practice Admin for </b>  <span class="_text2">${
              this._hospDetails.city
            } - ${this._hospDetails.hospital_name}</span>`;
            this._popUpBtnColour = '#FF6B3A';
            this.displaySucessPopup = true;
            this.getUser();
            this.getHospitalDetails();
          },
          error: (err) => {
            this.submittingPracticeAdminData = false;
          },
        });
    } else {
      this.httpService.post(URLS.ADDADMIN, _payload).subscribe({
        next: (res) => {
          this.displayAdminForm = false;
          this.submittingPracticeAdminData = false;
          this._popUpImage = '/assets/images/img-2.svg';
          this._popUpText = `You have successfully added
            <span class="_text2">${
              res.data.first_name + ' ' + res.data.last_name
            }</span>
            as a <b>Practice Admin for </b>  <span class="_text2">
            ${this._hospDetails.city} - ${
            this._hospDetails.hospital_name
          }</span>`;
          this._popUpBtnColour = '#FF6B3A';
          this.displaySucessPopup = true;
          this.selectTab='user'
          this.getUser();
          this.getHospitalDetails();

        },
        error: (err) => {
          this.submittingPracticeAdminData = false;
          if (err.errors?.non_field_errors?.length) {
            this.toast.openErrorToast(err.errors?.non_field_errors[0]);
          }
        },
      });
    }
  }

  // ADD/EDIT PROVIDER
  public validateProviderForm(): void {
    if (this.providerForm.invalid) {
      for (const control of Object.keys(this.providerForm.controls)) {
        this.providerForm.controls[control].markAsTouched();
      }
      return;
    }
    this.submittingProviderData = true;
    if (this._providerDetails?.id) {
      let _payload = {
        npi_data: this._providerDetails.npi_data,
        email: this.providerForm.value.email,
        first_name: this.providerForm.value.first_name,
        last_name: this.providerForm.value.last_name,
        password: '',
        contact_number: this.providerForm.value.contact_number,
        provider_status: this.providerForm.value.provider_status,
        hospital_branch: this.providerForm.value.hospital_branch,
        zip_code: this.providerForm.value.zip_code,
      };
      this.httpService
        .put(
          `${URLS.EDITPROVIDERDETAILS}${parseInt(this._providerDetails.id)}/`,
          _payload
        )
        .subscribe({
          next: (res) => {
            this.displayProvider = false;
            this.submittingProviderData = false;
            this._branch.filter((data:any)=>{
              if(data.branch_id === res.data.hospital_branch ){
                this.hospitalBranch = data
              }
            })
            this._popUpImage = '/assets/images/img-1.svg';
            this._popUpText = `You have successfully edited
          <span class="_text3">${
            res.data.first_name + ' ' + res.data.last_name
          }</span>
          as a <b>Provider for</b> <span class="_text3">${
            this.hospitalBranch.location
          } - ${this.hospitalBranch.branch_name}</span>`;
            this._popUpBtnColour = '#5566FF';
            this.displaySucessPopup = true;
            this.getUser();
            this.getHospitalDetails();
          },
          error: (err) => {
            this.submittingProviderData = false;
          },
        });
    } else {
      let _payload = {
        npi_data: this.providerForm.value.npi_data.npi,
        email: this.providerForm.value.email,
        first_name: this.providerForm.value.first_name,
        last_name: this.providerForm.value.last_name,
        password: this.providerForm.value.password,
        contact_number: this.providerForm.value.contact_number,
        provider_status: this.providerForm.value.provider_status,
        hospital: this._hospDetails.id,
        hospital_branch: this.providerForm.value.hospital_branch?.branch_id,
        zip_code: this.providerForm.value.zip_code,
      };
      this.httpService.post(URLS.ADDPROVIDER, _payload).subscribe({
        next: (res) => {
          this.submittingProviderData = false;
          this.displayProvider = false;
          this._popUpImage = '/assets/images/img-1.svg';
          this._popUpText = `You have successfully added
          <span class="_text3">${
            res.data.first_name + ' ' + res.data.last_name
          }</span>
          as a <b>Provider for</b> <span class="_text3">${
            this.hospitalBranch.location
          } - ${this.hospitalBranch.branch_name}</span>`;
          this._popUpBtnColour = '#5566FF';
          this.displaySucessPopup = true;
          this.getUser();
          this.getHospitalDetails();
        },
        error: (err) => {
          this.submittingProviderData = false;
          if (err.errors?.non_field_errors?.length) {
            this.toast.openErrorToast(err.errors?.non_field_errors[0]);
          }
        },
      });
    }
  }

  // ADD/EDIT CAREMANEGER
  public validateCaremanagerForm(): void {
    this.submitButton = false;
    if (this.careManagerForm.invalid) {
      for (const control of Object.keys(this.careManagerForm.controls)) {
        this.careManagerForm.controls[control].markAsTouched();
      }
      return;
    // } else if (this.careManagerForm.valid) {
    //   this.submitButton = true;
    }
    let _hiddneFields: any = {
      hospital: this._hospDetails.id,
    };
    this.careManagerForm.value.care_manager_status =
      (this.careManagerForm.value.care_manager_status).toUpperCase();
      this.careManagerForm.value.care_manager_status.toUpperCase();
    this.careManagerForm.value.hospital_branch =
      this.careManagerForm.value.hospital_branch[0];
    let _payload = Object.assign(this.careManagerForm.value, _hiddneFields);
    if (this._careManagerDetails?.id) {
      this.httpService
        .put(
          `${URLS.EDITCAREMANEGERDETAILS}${parseInt(
            this._careManagerDetails.id
          )}/`,
          _payload
        )
        .subscribe({
          next: (res) => {
            this.displayCaremanager = false;
            this._branch.filter((data:any)=>{
              if(data.branch_id === res.data.hospital_branch ){
                this.hospitalBranch = data
              }
            })
            this._popUpImage = '/assets/images/img-1.svg';
            this._popUpText = `You have successfully edited
              <span class="_text4">${
                res.data.first_name + ' ' + res.data.last_name
              }</span>
              as a <b>Care Manager for</b> <span class="_text4">${
                this.hospitalBranch?.location
              } - ${this.hospitalBranch.branch_name}</span>`;
            this._popUpBtnColour = '#F36A6A';
            this.displaySucessPopup = true;
            this.getUser();
            this.getHospitalDetails();
          },
          error: (err) => {},
        });
    } else {
      this.httpService.post(URLS.ADDCAREMANEGER, _payload).subscribe({
        next: (res) => {
          this.displayCaremanager = false;
          this.submitButton = false;
          this._branch.filter((data:any)=>{
            if(data.branch_id === res.data.hospital_branch ){
              this.hospitalBranch = data
            }
          })
          this._popUpImage = '/assets/images/img-1.svg';
          this._popUpText = `You have successfully added
          <span class="_text4">${
            res.data.first_name + ' ' + res.data.last_name
          }</span>
          as a <b>Care Manager for</b> <span class="_text4">${
            this.hospitalBranch?.location
          } - ${this.hospitalBranch.branch_name}</span>`;
          this._popUpBtnColour = '#F36A6A';
          this.displaySucessPopup = true;
          this.getUser();
          this.getHospitalDetails();
        },
        error: (err) => {
          if (err.errors?.non_field_errors?.length) {
            this.toast.openErrorToast(err.errors?.non_field_errors[0]);
          }
        },
      });
    }
  }

  // GET BRANCH
  getBranch() {
    this.loader.showLoader();
    this.httpService
      .get(`${URLS.GETBRANCHLIST}${parseInt(this._hospId)}`)
      .subscribe({
        next: (res) => {
          if (res.status_code === 200) {
            this._branch = res.data;
            this.selectTab ='location'
          }
          this.loader.hideLoader();
        },
        error: (err: any) => {
          this.loader.hideLoader();
        },
      });
  }

  // GET USER'S
  getUser() {
    this.loader.showLoader();
    this.httpService
      .get(`${URLS.GETUSERLIST}${parseInt(this._hospId)}`)
      .subscribe({
        next: (res) => {
          if (res.status_code === 200) {
            this._users = res.data;
            this.selectTab='user'
          }
          this.loader.hideLoader();
        },
        error: (err: any) => {
          this.loader.hideLoader();
        },
      });
  }

  // PROVIDER NPI DATA
  getProviderNPIData(search: string) {
    if (!search) {
      return;
    }
    const payload = Object.assign({
      query: search,
    });
    this.isLoadingNPIData = true;
    this.httpService
      .getFromHippaServer(URLS.PROVIDER_SEARCH_HIPPA, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          res.forEach((e: any) => {
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
    this.providerForm.get('first_name')?.patchValue(data?.provider_first_name);
    this.providerForm
      .get('last_name')
      ?.patchValue(data?.provider_last_name_legal_name);
    this.providerForm
      .get('contact_number')
      ?.patchValue(data?.provider_business_mailing_address_telephone_number);
    this.providerForm
      .get('zip_code')
      ?.patchValue(data?.provider_business_mailing_address_postal_code);
  }
  changeTab(tab:any){
    this.selectTab =tab;
  }
}
