import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfManagementPlanComponent } from './self-management-plan.component';

describe('SelfManagementPlanComponent', () => {
  let component: SelfManagementPlanComponent;
  let fixture: ComponentFixture<SelfManagementPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfManagementPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfManagementPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
