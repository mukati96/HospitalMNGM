import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOutreachComponent } from './add-edit-outreach.component';

describe('AddEditOutreachComponent', () => {
  let component: AddEditOutreachComponent;
  let fixture: ComponentFixture<AddEditOutreachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditOutreachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditOutreachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
