import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
interface diseasDetails {
  diseaseName: string;
}
@Component({
  selector: 'app-add-edit-diseas',
  templateUrl: './add-edit-diseas.component.html',
  styleUrls: ['./add-edit-diseas.component.scss'],
})
export class AddEditDiseasComponent {
  public diseaseForm!: FormGroup;
  public disease!: diseasDetails;
  constructor(private httpService: HttpService, private loader: LoaderService) {
    this.disease = {} as diseasDetails;
  }
  ngOnInit(): void {
    this.initDiseaseForm();
  }

  get H(): { [key: string]: AbstractControl } {
    return this.diseaseForm.controls;
  }
  
  initDiseaseForm() {
    this.diseaseForm = new FormGroup({
      diseaseName: new FormControl(this.disease.diseaseName, [
        Validators.required
      ]),
    });
  }

  public validateDiseaseForm(): void {
    if (this.diseaseForm.invalid) {
      for (const control of Object.keys(this.diseaseForm.controls)) {
        this.diseaseForm.controls[control].markAsTouched();
      }
      return;
    }
    console.log(this.diseaseForm.value);
    this.diseaseForm.reset();
  }
}
