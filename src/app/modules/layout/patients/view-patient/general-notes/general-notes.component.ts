import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { URLS } from 'src/app/constants/url';
@Component({
  selector: 'app-general-notes',
  templateUrl: './general-notes.component.html',
  styleUrls: ['./general-notes.component.scss']
})
export class GeneralNotesComponent {
  callNotesForm!: UntypedFormGroup;
  patientId: any;
  callNotes: any;


  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private http: HttpService,
    private loader: LoaderService,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) { }
  ngOnInit(): void {
    this.patientId = this.route.snapshot.params['id'];
    this.initNotesForm()
    this.getCallNotes();
  }

  initNotesForm() {
    this.callNotesForm = this.fb.group({
      description: ['', Validators.compose([Validators.required])],
      patient: [this.patientId, Validators.compose([Validators.required])],
    });
  }

  get notes() {
    return this.callNotesForm.controls;
  }
  getCallNotes() {
    this.http.get(`${URLS.CALL_NOTES}${this.patientId}/`).subscribe({
      next: (res) => {
        this.callNotes = res.data;
        this.loader.hideLoader();
      },
      error: (err: any) => {
        this.loader.hideLoader();
      },
    });
  }
  onSubmitCallNotesForm() {
    this.callNotesForm.value;
    if (this.callNotesForm.invalid) {
      this.callNotesForm.markAllAsTouched();
    } else {
      this.http.post(URLS.CALL_NOTES, this.callNotesForm.value).subscribe({
        next: async (res) => {
          this.toast.openSuccessToast('Call notes added successfully');
          this.callNotesForm.reset();
          this.callNotesForm.get('patient')?.patchValue(this.patientId);
          this.getCallNotes();
        },
        error: (err) => {
          this.toast.openErrorToast(err.message);
        },
      });
    }
  }
}
