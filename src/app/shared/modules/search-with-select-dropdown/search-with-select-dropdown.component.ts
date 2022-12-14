import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search-with-select-dropdown',
  templateUrl: './search-with-select-dropdown.component.html',
  styleUrls: ['./search-with-select-dropdown.component.scss']
})
export class SearchWithSelectDropdownComponent implements OnInit {
  @Output() applySearch = new EventEmitter<string>();
  @Output() itemSelected = new EventEmitter<any>();
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

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  changeValue(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchSub.next(filterValue.trim().toLowerCase());
  }

  onSelectItem(ev: any) {
    const data = this.list.find((item: any) => {
      return item[this.bindKey] === ev.value;
    });
    this.itemSelected.emit(data);
  }
}
