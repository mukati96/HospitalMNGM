import { Component, Input, OnInit } from '@angular/core';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastService } from 'src/app/services/toast.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-patient-summary',
  templateUrl: './patient-summary.component.html',
  styleUrls: ['./patient-summary.component.scss'],
})
export class PatientSummaryComponent implements OnInit {
  @Input() patientId: any;
  patientSummary: any;
  public patientSummaryData:any;  

  constructor(
    private http: HttpService,
    private loader: LoaderService,
    private toast: ToastService,
    private storageService:StorageService
  ) {}

  ngOnInit(): void {
    this.storageService.summeryDataObservable.asObservable().subscribe(res => {
     this.patientSummaryData = Object.assign(res);
    });
    this.getPatientSummary();
  }

  getPatientSummary() {
    this.loader.showLoader();
    this.http.get(`${URLS.GETPATIENTSUMMARY}${this.patientId}/`).subscribe({
      next: (res) => {
        this.patientSummary = res.data;
        this.loader.hideLoader();
      },
      error: (err) => {
        this.loader.hideLoader();
        this.toast.openErrorToast(err.message);
      },
    });
  }
}
