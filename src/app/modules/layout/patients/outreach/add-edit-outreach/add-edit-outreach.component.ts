import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { FULL_ROUTES } from 'src/app/constants/routes';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoaderService } from 'src/app/services/loader.service';

interface OutreachDetails {
  patient: string;
  patient_name: string;
  contact_date: string;
  schedule_follow_up_date: string;
  contact_type: string;
  resolution_action: string;
  outcome: string;
  provider: string;
  care_member: string;
  time_spent: number;
  notes: string;
  care_program: string;
  care_program_from_date: string;
  care_program_to_date: string;
}

@Component({
  selector: 'app-add-edit-outreach',
  templateUrl: './add-edit-outreach.component.html',
  styleUrls: ['./add-edit-outreach.component.scss'],
})
export class AddEditOutreachComponent implements OnInit {
  outreachForm!: FormGroup;
  public outreachContactType: any = [];
  public outreachResolution: any = [];
  public outreachOutcome: any = [];
  public outreachProvider: any = [];
  outreachdata: any;
  imgURL: any;
  outreachSubmitted: boolean = false;
  public attachments: any;
  public _patientDict: any = {};
  isEditMode = false;
  outreachid: any;
  currentStringDate = moment(new Date()).format('YYYY-MM-DD');
  outreach: OutreachDetails;
  outreachRadio: any;
  public otherImgPath: any;
  // currentStringDate = moment(new Date()).format('YYYY-MM-DD');
  constructor(
    private httpService: HttpService,
    private toast: ToastService,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private router: Router
  ) {
    this.outreach = {} as OutreachDetails;

    this.outreachContactType = [
      { value: 'PHONE', label: 'Phone' },
      { value: 'WHATSAPP-MESSENGER', label: 'Whatsapp Messenger' },
      { value: 'ZOOM-G-MEET', label: 'Zoom G Meet' },
    ];

    this.outreachResolution = [
      { value: 'LEFT-MESSAGE', label: 'Left Message' },
      { value: 'CALLBACK-LATER', label: 'Callback Later' },
      { value: 'OTHER', label: 'Other' },
      { value: 'DECLINED', label: 'Declined' },
      { value: 'NOT-REACHABLE', label: 'Not Reachable' },
    ];
    this.outreachOutcome = [
      { value: 'COMPLETED', label: 'Completed' },
      { value: 'CALL-DECLINED', label: 'Call Declined' },
      { value: 'NOT-QUALIFIED', label: 'Not Qualified' },
      { value: 'VOICE-MAIL', label: 'Voice Mail' },
      { value: 'OTHER', label: 'Other' },
    ];
    // this.outreachProvider = [
    //   { value: 'yyy', label: 'Completed' },
    //   { value: 'uuu', label: 'Completed' },
    //   { value: 'hhh', label: 'Completed' },
    // ];
  }

  ngOnInit() {
    this.initForms();
    this._patientDict = this.route.snapshot.queryParams;
    this.outreachForm.get('patient')?.patchValue(this._patientDict.patientId);
    this.outreachForm.get('patient_name')?.patchValue(this._patientDict.name);
    this.getOutreachProvider();
  }

  initForms() {
    this.outreachForm = new FormGroup({
      patient: new FormControl(this.outreach.patient, [Validators.required]),
      patient_name: new FormControl(this.outreach.patient_name, [
        Validators.required,
      ]),
      contact_date: new FormControl(this.outreach.contact_date, [
        Validators.required,
      ]),
      schedule_follow_up_date: new FormControl(
        this.outreach.schedule_follow_up_date,
        [Validators.required]
      ),
      contact_type: new FormControl(this.outreach.contact_type, [
        Validators.required,
      ]),
      resolution_action: new FormControl(this.outreach.resolution_action, [
        Validators.required,
      ]),
      outcome: new FormControl(this.outreach.outcome, [Validators.required]),
      provider: new FormControl(this.outreach.provider,),
      care_member: new FormControl(this.outreach.care_member),
      time_spent: new FormControl(this.outreach.time_spent, [
        Validators.required,
      ]),
      notes: new FormControl(this.outreach.notes),
      care_program: new FormControl(this.outreach.care_program),
      care_program_from_date: new FormControl(this.outreach.care_program_from_date),
      care_program_to_date: new FormControl(this.outreach.care_program_to_date),
      profile_pic: new FormControl(['']),
    });
  }

  get p(): { [key: string]: AbstractControl } {
    return this.outreachForm.controls;
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

  onSubmitOutreach() {
    this.outreachSubmitted = true;
    console.log(this.outreachForm.value);
    if (this.outreachForm.invalid) {
      for (const control of Object.keys(this.outreachForm.controls)) {
        this.outreachForm.controls[control].markAsTouched();
      }
      return;
    }
    const fd = new FormData();
    fd.append('patient', this.outreachForm.value.patient);
    fd.append('patient_name', this.outreachForm.value.patient_name);
    fd.append('contact_date', this.outreachForm.value.contact_date);
    fd.append(
      'schedule_follow_up_date',
      this.outreachForm.value.schedule_follow_up_date
    );
    fd.append('contact_type', this.outreachForm.value.contact_type);
    fd.append('resolution_action', this.outreachForm.value.resolution_action);
    fd.append('outcome', this.outreachForm.value.outcome);
    fd.append('provider', this.outreachForm.value.provider);
    fd.append('care_member', this.outreachForm.value.care_member);
    fd.append('time_spent', this.outreachForm.value.time_spent);
    fd.append('notes', this.outreachForm.value.notes);
    fd.append('care_program', this.outreachForm.value.care_program);
    fd.append(
      'care_program_from_date',
      this.outreachForm.value.care_program_from_date
    );
    fd.append(
      'care_program_to_date',
      this.outreachForm.value.care_program_to_date
    );
    if (this.attachments) {
      fd.append('profile_pic', this.attachments, this.attachments?.name);
    } else fd.append('profile_pic', '');
    this.httpService
      .put(`${URLS.ADDOUTREACH}${parseInt(this._patientDict.patientId)}/`, fd)
      .subscribe({
        next: (res) => {
          console.log(this.outreachForm.value);
          this.toast.openSuccessToast('Outreach created successfully');
          this.router.navigate([FULL_ROUTES.OUTREACH], {
            queryParams: {
              patientId: this._patientDict.patientId,
              name: this._patientDict.name,
            },
          });
        },
        error: (err) => {
          this.toast.openErrorToast(err.errors.non_field_errors[0]);
        },
      });
  }

  resetoutreachForm() {
    this.outreachForm.reset();
  }

  getOutreachProvider() {
    this.loader.showLoader();
    this.httpService.get(URLS.PROVIDER_SEARCH).subscribe({
      next: (res) => {
        this.outreachProvider =
          res.data.results.map((p: any) => {
            return { name: p.full_name, id: p.id };
          }) || [];
        this.loader.hideLoader();
        this.outreachForm.patchValue({
          provider:this.outreachProvider[0].id 
        })
      },
      error: (err) => {
        this.loader.hideLoader();
      },
    });
    
  }
}
