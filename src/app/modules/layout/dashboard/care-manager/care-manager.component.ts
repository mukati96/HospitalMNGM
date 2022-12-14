import { Component, OnInit } from '@angular/core';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RemoveEmptyKeys } from 'src/app/_helpers/remove-empty-key';
import { ToastService } from 'src/app/services/toast.service';
import { FULL_ROUTES } from 'src/app/constants/routes';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-care-manager',
  templateUrl: './care-manager.component.html',
  styleUrls: ['./care-manager.component.scss'],
})
export class CareManagerComponent implements OnInit {
  public _countDetail: any = {};
  public _patientTask: any = {};
  public _patientStats: [] = [];
  public completedStats: [] = [];
  public showCountMsg: any;
  // completedStats:any;
  totalRecords: any;
  currentPage = 1;
  _taskListArray: any = [];
  public selectTab: any = 'Overdue';
  taskCountObj: any = {
    todays_tasksCount: '0',
    completed_tasksCount: '0',
    overdue_tasksCount: '0',
    tomorrow_tasksCount: '0',
    next_week_tasksCount: '0',
  };
  showCompleted: boolean = false;
  mappdataa: any = {};
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private loader: LoaderService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.getPatientTask();
    this.getPatientStats();
    this.getCareManagerTaskList();
    this.getCompletedStats();
  }

  // API'S

  getPatientTask() {
    this.loader.showLoader();
    this.httpService.get(`${URLS.GETPATIENTTASK}`).subscribe({
      next: (res) => {
        if (res.status_code === 200) {
          console.log(res.data);
          this._patientTask = res.data;
        }
        this.loader.hideLoader();
      },
      error: (err: any) => {
        this.loader.hideLoader();
      },
    });
  }

  getPatientStats() {
    this.loader.showLoader();
    this.httpService.get(`${URLS.GETPATIENTSTATS}`).subscribe({
      next: (res) => {
        if (res.status_code === 200) {
          this._patientStats = res.data;
        }
        this.loader.hideLoader();
      },
      error: (err: any) => {
        this.loader.hideLoader();
      },
    });
  }

  getCareManagerTaskList(value?: string) {
    this.loader.showLoader();
    let payload: any = {};
    if (value) {
      payload = Object.assign({
        search: value,
      });
    } else {
      payload = Object.assign({
        search: value,
      });
    }

    this.httpService
      .get(URLS.GETCAREMANAGERTASKlIST, RemoveEmptyKeys(payload))
      .subscribe({
        next: (res) => {
          this._taskListArray = res.data;
          this.taskCountObj = {
            todays_tasksCount: this._taskListArray.todays_tasks.length,
            completed_tasksCount: this._taskListArray.completed_tasks.length,
            overdue_tasksCount: this._taskListArray.overdue_tasks.length,
            tomorrow_tasksCount: this._taskListArray.tomorrow_tasks.length,
            next_week_tasksCount: this._taskListArray.next_week_tasks.length,
          };

          this.totalRecords = res.data.count;
          let rowCount = this.currentPage * 10;
          this.showCountMsg = ` Displaying <b>${
            rowCount >= res.data.count ? res.data.count : rowCount
          } </b> from  <b>${res.data.count}</b> data`;
          this.loader.hideLoader();
          this.changeTab('Overdue');
        },
        error: (err) => {
          this.loader.hideLoader();
          this.toast.openErrorToast(err.message);
        },
      });
  }

  paginate(event: any) {
    this.currentPage = event.page + 1;
    this.getCareManagerTaskList();
  }

  _taskArray: any = [];
  changeTab(form?: any) {
    this.selectTab = form;
    switch (form) {
      case 'Today':
        this._taskArray = this._taskListArray.todays_tasks;
        this.totalRecords = this._taskListArray.todays_tasks.length;
        break;
      case 'Completed':
        this._taskArray = this._taskListArray.completed_tasks;
        this.totalRecords = this._taskListArray.completed_tasks.length;
        break;
      case 'Overdue':
        this._taskArray = this._taskListArray.overdue_tasks;
        this.totalRecords = this._taskListArray.overdue_tasks.length;
        break;
      case 'Tomorrow':
        this._taskArray = this._taskListArray.tomorrow_tasks;
        this.totalRecords = this._taskListArray.tomorrow_tasks.length;
        break;
      case 'NextWeek':
        this._taskArray = this._taskListArray.next_week_tasks;
        this.totalRecords = this._taskListArray.next_week_tasks.length;
        break;
      default:
    }
  }

  stateChange() {
    if (this.showCompleted === false) {
      this.showCompleted = true;
    } else if (this.showCompleted === true) {
      this.showCompleted = false;
    }
  }

  getCompletedStats() {
    this.loader.showLoader();
    this.httpService.get(`${URLS.GETCAREMANAGERSTATS}`).subscribe({
      next: (res) => {
        if (res.status_code === 200) {
          this.completedStats = res.data.patient_count_call_log;
          this.mappdataa['enroll_patients'] =
            res.data.patient_count_call_log[0]?.patient_count;
          this.mappdataa['inactive_patients'] =
            res.data.patient_count_call_log[1]?.patient_count;
          this.mappdataa['total_Patients'] =
            res.data.patient_count_call_log[2]?.patient_count;
        }
        this.loader.hideLoader();
      },
      error: (err: any) => {
        this.loader.hideLoader();
      },
    });
  }

  viewProviders(id: string) {
    // this.router.navigate([FULL_ROUTES.PROVIDERS, id]);
  }

  editproviders(id: string) {
    // this.router.navigate([FULL_ROUTES.UPDATE_PROVIDERS, id]);
  }
  // seachCareMangerLists(value?: string){
  //   this.loader.showLoader();
  //   const payload = Object.assign({
  //     search: value,
  //   });
  //   this.httpService
  //     .get(URLS.GETCAREMANAGERTASKlIST, RemoveEmptyKeys(payload))
  //     .subscribe({
  //       next: (res) => {
  //         this._taskListArray = res.data.results;
  //         this.loader.hideLoader();
  //       },
  //       error: (err) => {
  //         this.loader.hideLoader();
  //       },
  //     });
  // }
}
