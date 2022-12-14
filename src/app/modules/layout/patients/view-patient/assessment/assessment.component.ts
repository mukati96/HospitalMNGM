import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import * as moment from 'moment';
declare const bootstrap: any;
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
})
export class AssessmentComponent implements OnInit {
  public _assmentment: any = [];
  public __assmentmentQuestions: any = [];
  selectedValue: any = '';
  questionCategory: string = '';
  form!: UntypedFormGroup;
  @Input() patientId: any;
  _assessmentList: any = [];
  _assessmentId: any;
  public editAssesPlan:boolean=false;
  public onlyReadData:boolean=false;
  currentStringDate = moment(new Date()).format('YYYY-MM-DD');
  public quesCategoryId :any;

  constructor(
    private router: Router,
    private http: HttpService,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private toast: ToastService,
    private fb: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.storageService.assessmentDataObservable.asObservable().subscribe((res:any) => {
      this._assmentment = Object.assign(res) ;
     });
    this.getAssessment();
    this.initForm();
    this.getAssessmentList();
    
  }

  initForm() {
    this.form = this.fb.group({
      assessment: this.fb.array([]),
    });
  }

  get assesment() {
    return this.form.controls['assessment'] as FormArray;
  }

  getAssessment() {
    this.loader.showLoader();
    this.http.get(`${URLS.PATIENTASSESSMENT}`).subscribe({
      next: (res) => {
        this._assmentment = res.data;
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  pushAssessment(data: any, from?:any) {
    this.assesment.push(
      this.fb.group({
        answer: [ from == 'update' ?  data?.answer : '', Validators.compose([Validators.required])],
        assessment: [
          from == 'update' ?  data?.assessment : this._assessmentId,
          Validators.compose([Validators.required]),
        ],
        patient: [this.patientId, Validators.compose([Validators.required])],
        question: [ from == 'update' ? data?.assessment : data?.id, Validators.compose([Validators.required])],
        questionName: [
          from == 'update' ? data?.question : data?.inquiry,
          Validators.compose([Validators.required]),
        ],
        question_id:data?.question_id

      })
    );
  }

  deleteLesson(index: number) {
    this.assesment.removeAt(index);
  }

  startAssessment(ques: any) {
    this.questionCategory = ques.question_category;
    this.quesCategoryId = ques.id;
    this.loader.showLoader();
    this.initForm();
    this.editAssesPlan =false;
    this.onlyReadData=false;
    let _payload = {
      date: moment(ques.created_at).format('YYYY-MM-DD'),
      question_category: ques.id,
      patient: this.patientId,
    };
    this.http.post(`${URLS.STARTASSESSMENT}`, _payload).subscribe({
      next: (res) => {
        this._assessmentId = res.data.id;
        this.getAssessmentQuestion(res.data.question_category);
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  getAssessmentQuestion(id: any) {
    this.loader.showLoader();
    this.http.get(`${URLS.PATIENTASSESSMENTQUESTION}${id}/`).subscribe({
      next: (res) => {
        this.__assmentmentQuestions = res.data.forEach((q: any) => {
          this.pushAssessment(q);
        });
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }

  onSubmit() {
    let assessmentId:any;
    (<FormArray>this.form.get('assessment')).controls.forEach((group: any) => {
      (<any>Object).values(group.controls).forEach((control: FormControl) => { 
          control.markAsTouched();
      }) 
    });
    if (this.form.invalid) {
      this.toast.openErrorToast('Please attempt all');
      return;
    }
   
    this.form.value.assessment.forEach((x: any) => {
      delete x.questionName;
      assessmentId=x.question 
    });
    this.http
      .post(`${URLS.SUBMITASSESSMENT}`, this.form.value.assessment)
      .subscribe({
        next: (res) => {
          this.againPutData(assessmentId , this.form.value.assessment)
          let myModalEl = document.getElementById('assessmentModal');
          let modal = bootstrap.Modal.getInstance(myModalEl);
          modal.hide();
          this.loader.hideLoader();
          
          this.initForm();
          
          this.editAssesPlan = false;
          this.onlyReadData=false;
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });
  }
  updateAssesPlan(){
     let assessmentId:any;
     let formData:any=[]
     formData = this.form.value.assessment;
    //  formData.forEach((x: any) => {
    //   assessmentId=x.question 
    //   delete x.questionName;
    //   delete x.question
    // });
    let myModalEl = document.getElementById('assessmentModal');
          let modal = bootstrap.Modal.getInstance(myModalEl);
          modal.hide();
          this.loader.hideLoader();
          this.getAssessmentList();
          this.initForm();
          this.editAssesPlan = false;
          this.onlyReadData=false;
  }

  onChangeAns(event:any){
    if(this.editAssesPlan === true){
      console.log(event)
      let payload:any={
        answer: event.answer,
        assessment: event.assessment,
        patient: event.patient,
        question: event.question,
        question_id : event.question_id
      }
      this.http
      .put(`${URLS.UPDATEASSESSMENT}${parseInt(event.question_id)}/`, payload)
      .subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.getAssessmentList();
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });


    }
  }

  getAssessmentDetails(assesment: any ,type?:any) {
    if(type){
      this.editAssesPlan = false;
      this.onlyReadData = true;
    }else{
      this.editAssesPlan = true;
      this.onlyReadData = false;
    }
    this.questionCategory = assesment.question_category;
    this.initForm();
    this.http
      .get(`${URLS.GETASSESSMENTDETAILS}${assesment.id}/${this.patientId}/`)
      .subscribe({
        next: (res) => {
          this.__assmentmentQuestions = res.data.forEach((q: any) => {
            this.pushAssessment(q , 'update');
          });
          this.loader.hideLoader();
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });
  }

  getAssessmentList() {
    this.http.get(`${URLS.GETASSESSMENTLIST}${this.patientId}/`).subscribe({
      next: (res) => {
        this._assessmentList = res.data;
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }
  editAssessPlan(obj?:any){
    console.log(obj)

  }
  getGroupControl(index:any, fieldName:any) {
    return (<FormArray>this.form.get('assessment'))?.at(index)?.get(fieldName);
  }
  againPutData(id:any,data?:any){
    let payload:any={
      date:this.currentStringDate,
      question_category:this.quesCategoryId
    }
    // const url = `${URLS.AGAINASSESSMENTDETAILS}` + `${id}` + '/' + `${this.patientId} + '/' `;
    this.http
    .put(`${URLS.AGAINASSESSMENTDETAILS}${this._assessmentId}/${this.patientId}/`,payload)
    .subscribe({
      next: (res) => {
        this.getAssessmentList();
        this.loader.hideLoader(); 
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
    
  }
}
