import { Component, OnInit } from '@angular/core';
import { FULL_ROUTES } from 'src/app/constants/routes';
import { AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { URLS } from 'src/app/constants/url';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmPasswordValidator } from 'src/app/_helpers/must-match.validator';

interface resetPasswordForm {
  new_password: string;
  confirm_password: string;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  FULL_ROUTES = FULL_ROUTES;
  resetForm!: FormGroup;
  userSubmitted: boolean = false;
  reset: resetPasswordForm

  constructor(private fb: FormBuilder,
              private router: Router,
              private httpService: HttpService,
              private activatedRoute: ActivatedRoute) {
                this.reset = {} as resetPasswordForm;
              }

  ngOnInit(): void {
    this.initResetForm();
    this.activatedRoute.data.subscribe((data: any) => {
      this.resetForm.patchValue(data.response);
    })
  }

  initResetForm() {
    this.resetForm = this.fb.group({
      token: [],
      uidb64: [],
      new_password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10)
      ]],
      confirm_password: ['', [Validators.required]],
    },
      {
        validator: ConfirmPasswordValidator("new_password", "confirm_password")
      }
    );
  }

  get userData(): { [key: string]: AbstractControl } {
    return this.resetForm.controls;
  }

  public validateResetForm(): void {
    this.userSubmitted = true;
    if (this.resetForm.invalid) {
      for (const control of Object.keys(this.resetForm.controls)) {
        this.resetForm.controls[control].markAsTouched();
      }
      return;
    }
    this.httpService.patch(URLS.RESETPASSWORD, this.resetForm.value).subscribe({
      next: (res) => {
        this.router.navigate([FULL_ROUTES.LOGIN]);
      },
      error: (err) => {
      }
    })
  }

}
