import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-select-with-search',
  templateUrl: './select-with-search.component.html',
  styleUrls: ['./select-with-search.component.scss']
})
export class SelectWithSearchComponent implements OnInit{
  @Output() applySearch = new EventEmitter<string>();
  @Output() itemSelected = new EventEmitter<any>();
  @Input() form!: UntypedFormGroup;
  @Input() controlName: any;
  @Input() list: any[] = [];
  @Input() bindKey!: string;
  @Input() readonly: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() label: string = 'Select';
  selectedItem: any;
  private searchSub = new Subject<string>();

  ngOnInit(): void {
    this.searchSub.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((filterValue: string) => {
      console.log(filterValue);
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
    this.selectedItem = ev.value[this.bindKey];
    this.itemSelected.emit(ev.value);
  }
}
