import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHospitalsComponent } from './add-edit-hospitals.component';

describe('AddEditHospitalsComponent', () => {
  let component: AddEditHospitalsComponent;
  let fixture: ComponentFixture<AddEditHospitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditHospitalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
