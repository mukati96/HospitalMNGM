import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';

@Pipe({
    name: 'inputError',
    pure: false
})
export class InputErrorPipe implements PipeTransform {
    transform(form: UntypedFormGroup | any, controlName: string | any, label: string) {
        let errorText: string = '';
        const formControl: AbstractControl | any = form.get(controlName);
        if (formControl.touched && formControl.invalid && (formControl.errors['required'] || formControl.errors['noSpaceAllowed'])) {
            return `${label} is required`;
        } else if (formControl.touched && formControl.invalid && formControl.errors['pattern']) {
            return `Please enter a valid ${label}`;
        } else if (formControl.touched && formControl.invalid && formControl.errors['minlength']) {
            return `Minimum ${formControl.errors['minlength'].requiredLength} digits/characters allowed`;
        } else if (formControl.touched && formControl.invalid && formControl.errors['maxlength']) {
            return `Maximum ${formControl.errors['maxlength'].requiredLength} digits/characters allowed`;
        } else if (formControl.touched && formControl.invalid && formControl.errors['min']) {
            return `Minimum value allowed is ${formControl.errors['min'].min}`;
        } else if (formControl.touched && formControl.invalid && formControl.errors['max']) {
            return `Limit exceeded, maximum ${formControl.errors['max'].max} allowed`;
        } else if (formControl.touched && formControl.invalid && formControl.errors['mustMatch']) {
            return `${label} is not matching`;
        } else if (formControl.touched && formControl.invalid && formControl.errors['serverError']) {
            return `${formControl?.errors['serverError']}`;
        } else if (formControl.touched && formControl.invalid && formControl.errors) {
            return `Please enter a valid ${label}`;
        }
        return errorText;
    }
}
