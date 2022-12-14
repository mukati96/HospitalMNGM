import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search-with-pagination',
  templateUrl: './search-with-pagination.component.html',
  styleUrls: ['./search-with-pagination.component.scss']
})
export class SearchWithPaginationComponent implements OnInit {
  @Output() applySearch = new EventEmitter<string>();
  @Output() itemSelected = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();
  @Input() form!: UntypedFormGroup;
  @Input() controlName: any;
  @Input() list: any[] = [];
  @Input() bindKey!: string;
  @Input() displayKey!: string;
  @Input() readonly: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() label: string = 'Select';
  private searchSub = new Subject<string>();

  ngOnInit(): void {
    this.searchSub.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((filterValue: string) => {
      this.applySearch.emit(filterValue);
    });
  }

  changeValue(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchSub.next(filterValue.trim().toLowerCase());
  }

  onSelectItem(ev: any) {
    this.label = ev[this.displayKey];
    this.form.get(this.controlName)?.patchValue(ev[this.bindKey]);
    this.itemSelected.emit(ev);
  }

  scrollChange(ev: any) {
    if(!this.isLoading) this.pageChange.emit(ev);
  }
}
