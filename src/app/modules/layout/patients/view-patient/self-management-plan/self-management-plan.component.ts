import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-self-management-plan',
  templateUrl: './self-management-plan.component.html',
  styleUrls: ['./self-management-plan.component.scss']
})
export class SelfManagementPlanComponent implements OnInit{
  patientId!: string;
  currentStep = 1;
  goals: any[] = [];
  selectedGoalId: any;
  interventionForm!: UntypedFormGroup;
  recurrencePatterns: string[] = ['Daily', 'Weekly', 'Bi-Weekly', 'Monthly', 'Yearly', 'Sunday', 'Monday', 'Tuesday',
                                  'Wednesday', 'Thursday', 'Friday', 'Saturday']
  constructor(private fb: FormBuilder, 
              private http: HttpService, 
              private route: ActivatedRoute,
              private toast: ToastService,
              private loader: LoaderService,
              private storageService: StorageService){}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.params['id']
    this.getGoals(this.patientId);
    this.storageService.taskDataObservable.asObservable().subscribe((res:any) => {
      this.goals = res;
     });
  }

  getGoals(id: any) {
    this.loader.showLoader();
    this.http.get(URLS.SELF_MANAGEMENT_LIST(id)).subscribe({
      next: (res) => {
        this.goals = res.data;
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
      }
    })
  }

  next() {
    if(this.currentStep >= 3) return;
    this.currentStep += 1;
  }

  prev() {
    if(this.currentStep === 1) return;
    this.currentStep -= 1;
  }

  viewGoalWithIntervention(id: any) {
    this.selectedGoalId = id;
    this.currentStep = 3;
  }

  openListingPage() {
    this.currentStep = 1;
    this.getGoals(this.patientId);
  }
}
