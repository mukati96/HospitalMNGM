import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWithSelectDropdownComponent } from './search-with-select-dropdown.component';

describe('SearchWithSelectDropdownComponent', () => {
  let component: SearchWithSelectDropdownComponent;
  let fixture: ComponentFixture<SearchWithSelectDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchWithSelectDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchWithSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
