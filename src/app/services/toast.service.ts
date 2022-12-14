import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const DURATION = 3000;

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) {}

  openErrorToast(message: string) {
    this.toastr.error(message);
  }

  openSuccessToast(message: string) {
    this.toastr.success(message);
  }

  openWarningToast(message: string) {
    this.toastr.warning(message);
  }

  openHelperToast(message: string) {}
}