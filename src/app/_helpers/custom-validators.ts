import { FormControl } from '@angular/forms';

export class CustomValidators {
  static MatchValidator(
    arg0: string,
    arg1: string
  ): import('@angular/forms').ValidatorFn {
    throw new Error('Method not implemented.');
  }
  static isEmail() {
    return function (control: FormControl) {
      const regex = RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      if (control && control.value && control.value.match(regex)) {
        return null;
      } else {
        return { isEmail: { error: true } };
      }
    };
  }

  static isMobile() {
    return function (control: FormControl) {
      const regex = RegExp(/[0-9]{10}$/);
      if (control && control.value && control.value.match(regex)) {
        return null;
      } else {
        return { isMobile: { error: true } };
      }
    };
  }

  static isOTP() {
    return function (control: FormControl) {
      const regex = RegExp(/[0-9]{4}$/);
      if (control && control.value && control.value.match(regex)) {
        return null;
      } else {
        return { isOTP: { error: true } };
      }
    };
  }

  static isPincode() {
    return function (control: FormControl) {
      const regex = RegExp(/[0-9]{6}$/);

      if (!(control.value)) {
        return null;
      }
      return String(control.value)
        .match(regex) ? null : {isSecurityNumber: { error: true }};
    }
  }
}
