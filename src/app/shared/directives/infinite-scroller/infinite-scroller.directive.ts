import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroller]'
})
export class InfiniteScrollerDirective {
  @Output() scrollChange: EventEmitter<any> =new EventEmitter();

  constructor() { }

  @HostListener('scroll', ['$event'])
  scrollHandler(event: any) {
    let tracker = event.target;
    let limit = tracker.scrollHeight - tracker.clientHeight;
    if ((event.target.scrollTop) >= limit) {
      this.scrollChange.emit(true);
    }
  }

}
