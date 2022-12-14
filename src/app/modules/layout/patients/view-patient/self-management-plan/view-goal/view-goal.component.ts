import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
declare const bootstrap: any;
import * as moment from 'moment';
@Component({
  selector: 'app-view-goal',
  templateUrl: './view-goal.component.html',
  styleUrls: ['./view-goal.component.scss']
})
export class ViewGoalComponent implements OnInit{
  currentStringDate = moment(new Date()).format('YYYY-MM-DD');
  @Output() cancel = new EventEmitter();
  @Input() goalId: any;
  goalsData: any[] = [];
  interventionForm!: UntypedFormGroup;
  patientId!: string;
  selectedValues: any[] = [];
  public showRecurrence:boolean = true;
  recurrencePatterns: string[] = ['Daily', 'Weekly', 'Bi-Weekly', 'Monthly', 'Yearly']
  dailyField:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday']

  constructor(private fb: FormBuilder,
              private http: HttpService, 
              private toast: ToastService,
              private route: ActivatedRoute,
              private loader: LoaderService){}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.params['id'];
    this.getGoals();
    this.initForm();
  }

  initForm(){
    this.interventionForm = this.fb.group({
      date: ['', Validators.compose([Validators.required])],
      status: ['', Validators.compose([Validators.required])],
      reccurance_pattern: ['', Validators.compose([Validators.required])],
      from_date: ['', Validators.compose([Validators.required])],
      to_date: ['', Validators.compose([Validators.required])],
      patient: [this.patientId, Validators.compose([Validators.required])],
      goal: [this.goalId, Validators.compose([Validators.required])],
      notes: [''],
    });
  }

  getGoals() {
    this.loader.showLoader();
    this.http.get(URLS.SELF_MANAGEMENT_LIST(this.patientId)).subscribe({
      next: (res) => {
        this.goalsData = res.data;
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
      }
    })
  }

  onSubmitIntervention() {
    if(this.interventionForm.invalid) {
      this.interventionForm.markAllAsTouched();
      return this.toast.openErrorToast('Please fill all the required fields');
    } else {
      this.loader.showLoader();
      const payload = this.interventionForm.value;
      const obj2 = Object.assign({
        Daily : this.selectedValues
      });
      if(this.interventionForm.value.reccurance_pattern == 'Daily'){
         payload.reccurance_pattern = JSON.stringify(obj2);
       }
       else{
        payload.reccurance_pattern = this.interventionForm.value.reccurance_pattern;
       }
      this.http.post(URLS.INTERVENTION_CREATE, payload).subscribe({
        next: (res) => {
          this.toast.openSuccessToast('Task Added Successfully');
          this.closePopup('addIntervention');
          this.reset();
          this.getGoals();
          this.loader.hideLoader();
        },
        error: (err) => {
          this.toast.openErrorToast(err.message);
          this.loader.hideLoader();
        }
      })
    }
  }

  convertToValue(key: string) {
    return this.interventionForm.value[key].map((x: any, i: any) => x && this.recurrencePatterns[i]).filter((x: any) => !!x);
  }

  closePopup(popupId: string) {
    let myModalEl = document.getElementById(popupId);
    let modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  }

  reset() {
    this.interventionForm.reset();
    this.interventionForm.get('goal')?.patchValue(this.goalId);
    this.interventionForm.get('patient')?.patchValue(this.patientId);
  }
}
