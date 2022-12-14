import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private _el: ElementRef, @Optional() public ngControl: NgControl) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
      if(this.ngControl?.enabled) this.ngControl.control?.patchValue(this._el.nativeElement.value);
    }
  }
}
