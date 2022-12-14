import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';
import { RemoveEmptyKeys } from 'src/app/_helpers/remove-empty-key';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.scss']
})
export class AddGoalComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  goalForm!: UntypedFormGroup;
  @Input() patientId!: string;
  currentStringDate = moment(new Date()).format('YYYY-MM-DD');
  filteredChronics: any[] = [];
  mainChronicData: any[] = [];
  selectedChronic: any;
  fetchingChronics = false;

  constructor(private fb: FormBuilder,
              private http: HttpService,
              private loader: LoaderService,
              private toast: ToastService){}

  ngOnInit(): void {
    this.initForm();
    this.getDefaultChronicConditions();
    this.addStepsToAchieveGoalsFormGroup();
    this.addGoalChallengesFormGroup();
    this.addGoalAssistanceFormGroup();
  }
  
  initForm(){
    this.goalForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      goal_date: [ '',Validators.compose([Validators.required])],
      chronic_condition: ['', Validators.compose([Validators.required])],
      notes: [''],
      goal_status: ['', Validators.compose([Validators.required])],
      steps_to_achieve_goals: this.fb.array([]),
      goal_challenges: this.fb.array([]),
      goal_assistance: this.fb.array([]),
      patient: [this.patientId, Validators.compose([Validators.required])],
      patient_refused: [true],
    });
  }

  get f() { return this.goalForm.controls; }

  get steps_to_achieve_goals() {
    return this.goalForm.controls["steps_to_achieve_goals"] as FormArray;
  }
  get goal_challenges() {
    return this.goalForm.controls["goal_challenges"] as FormArray;
  }
  get goal_assistance() {
    return this.goalForm.controls["goal_assistance"] as FormArray;
  }

  addStepsToAchieveGoalsFormGroup() {
    this.steps_to_achieve_goals.push(this.fb.group({
      goal_plan: ['', Validators.compose([Validators.required])],
      score: ['', Validators.compose([Validators.required])]
    }));
  }

  addGoalChallengesFormGroup() {
    this.goal_challenges.push(this.fb.group({
      challenges: ['', Validators.compose([Validators.required])],
      score: ['', Validators.compose([Validators.required])]
    }));
  }

  addGoalAssistanceFormGroup() {
    this.goal_assistance.push(this.fb.group({
      support_type: ['', Validators.compose([Validators.required])],
      score: ['', Validators.compose([Validators.required])]
    }));
  }

  removeStepsToAchieveGoals(index: number) {
    this.steps_to_achieve_goals.removeAt(index);
  }
  removeGoalChallenges(index: number) {
    this.goal_challenges.removeAt(index);
  }
  removeGoalAssistance(index: number) {
    this.goal_assistance.removeAt(index);
  }

  getDefaultChronicConditions(search?: any) {
    const payload = {search: search}
    this.fetchingChronics = true;
    this.http.get(URLS.GETCHRONICALDISEASE, RemoveEmptyKeys(payload)).subscribe({
      next: (res) => {
        this.fetchingChronics = false;
        this.filteredChronics = res.data.results;
        this.mainChronicData = res.data.results;
      },
      error: (err) => {
        this.fetchingChronics = false;
      }
    })
  }

  onSubmitGoal() {
    if(this.goalForm.invalid) {
      this.goalForm.markAllAsTouched();
      return this.toast.openErrorToast('Please fill all the required field')
    } else {
      this.loader.showLoader();
      this.http.post(URLS.PATIENT_GOAL, this.goalForm.value).subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.toast.openSuccessToast('Goal Added Successfully');
          this.cancel.emit(true);
        },
        error: (err) => {
          this.toast.openErrorToast(err.message);
          this.loader.hideLoader();
        }
      });
    }
  }

}
