import { Component, OnInit } from '@angular/core';
import { FULL_ROUTES, LayoutRoutes } from 'src/app/constants/routes';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidators } from 'src/app/_helpers/custom-validators';
import { HttpService } from 'src/app/services/http.service';
import { URLS } from 'src/app/constants/url';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/services/app-state.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { StorageKeys } from 'src/app/constants/storage';
import { ToastService } from 'src/app/services/toast.service';

interface LoginUser {
  email: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  FULL_ROUTES = FULL_ROUTES;
  loginForm!: FormGroup;
  userSubmitted: boolean = false;
  user: LoginUser;
  isLoading = false;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private appStateService: AppStateService,
    private auth: AuthService,
    private toast: ToastService,
    private storageService: StorageService
  ) {
    this.user = {} as LoginUser;
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(this.user.email, [
        Validators.required,
        CustomValidators.isEmail(),
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10)
      ]),
    });
  }

  get userData(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public validateLoginForm(): void {
    this.userSubmitted = true;
    if (this.loginForm.invalid) {
      for (const control of Object.keys(this.loginForm.controls)) {
        this.loginForm.controls[control].markAsTouched();
      }
      return;
    }
    this.isLoading = true;
    this.httpService.post(URLS.LOGIN, this.loginForm.value).subscribe({
      next: (res) => {
        this.appStateService.saveUserProfile(res.data);
        this.auth.saveToken(res.data.tokens);
        res.data.name = `${res.data.first_name} ${res.data.last_name}`;
        this.storageService.saveToLocalStorage(StorageKeys.USER_INFO, res.data);
        this.storageService.saveToLocalStorage(StorageKeys.ROLE, res.data.user_type);
        this.router.navigate([LayoutRoutes.DASHBOARD]);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        if(err.errors?.non_field_errors?.length) {
          this.toast.openErrorToast(err.errors?.non_field_errors[0])
        }
      }
    })
  }

}
