import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FULL_ROUTES, LayoutRoutes } from 'src/app/constants/routes';
import { URLS } from 'src/app/constants/url';
import { HttpService } from 'src/app/services/http.service';
import { CustomValidators } from 'src/app/_helpers/custom-validators';
declare const bootstrap: any;

interface forgetPassword {
  email: string,
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  FULL_ROUTES = FULL_ROUTES;
  forgetForm!: FormGroup;
  submitted: boolean = false;
  forgetUser: forgetPassword;
  _popUpImage: string = '/assets/images/img-1.svg';
  _popUpBtnColour: string = '#5565FF';

  constructor(private httpService: HttpService,
    private router: Router,
    private primengConfig: PrimeNGConfig) {
    this.forgetUser = {} as forgetPassword
  }


  ngOnInit(): void {
    this.initForgetForm();
  }

  displayBasic!: boolean;

  initForgetForm() {
    this.forgetForm = new FormGroup({
      email: new FormControl(this.forgetUser.email, [
        Validators.required,
        CustomValidators.isEmail(),
      ]),
    });
  }

  get userData(): { [key: string]: AbstractControl } {
    return this.forgetForm.controls;
  }

  public validateForgetForm(): void {
    this.submitted = true;
    if (this.forgetForm.invalid) {
      for (const control of Object.keys(this.forgetForm.controls)) {
        this.forgetForm.controls[control].markAsTouched();
      }
      return;
    }
    this.httpService.post(URLS.FORGOTPASSWORD, this.forgetForm.value).subscribe({
      next: (res) => {
        if (res.status_code === 200) {
          //    this.showBasicDialog();
        }
        // this.router.navigate([FULL_ROUTES.RESET_PASSWORD]);
      },
      error: (err) => {
      }
    })

  }

  submitButton() {
    let myModalEl = document.getElementById('forgot_pass')
    let modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
  }
}
