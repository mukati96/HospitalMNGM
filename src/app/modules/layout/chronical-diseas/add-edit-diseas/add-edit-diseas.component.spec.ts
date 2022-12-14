import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDiseasComponent } from './add-edit-diseas.component';

describe('AddEditDiseasComponent', () => {
  let component: AddEditDiseasComponent;
  let fixture: ComponentFixture<AddEditDiseasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDiseasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDiseasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
