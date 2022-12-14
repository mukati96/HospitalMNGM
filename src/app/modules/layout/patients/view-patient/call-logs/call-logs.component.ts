import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-call-logs',
  templateUrl: './call-logs.component.html',
  styleUrls: ['./call-logs.component.scss'],
})
export class CallLogsComponent implements OnInit {
  @Output() openPatientSummaryPage = new EventEmitter();
  @Output() startCall = new EventEmitter();
  @Input() patientId: any;
  logs: any[] = [];

  constructor(private http: HttpService,
              private toast: ToastService,
              private loader: LoaderService,
              private storageService: StorageService
              ) {}

  ngOnInit(): void {
    this.storageService.callLogsDataObservable.asObservable().subscribe((res:any) => {
      this.logs = res;
     });
    this.getCallLogDetails()
  }

  getCallLogDetails() {
    this.loader.showLoader();
    this.http.get(`${URLS.CALL_LOG}${this.patientId}`).subscribe({
      next: (res) => {
        this.logs = res.data;
        this.loader.hideLoader();
      },
      error: (err) => {
        this.toast.openErrorToast(err.message);
        this.loader.hideLoader();
      },
    });
  }

  initiateCallWithAgenda(agenda: string){
    this.startCall.emit(agenda)
  }
}
