import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWithPaginationComponent } from './search-with-pagination.component';

describe('SearchWithPaginationComponent', () => {
  let component: SearchWithPaginationComponent;
  let fixture: ComponentFixture<SearchWithPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchWithPaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchWithPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
