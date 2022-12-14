import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyCareReportComponent } from './monthly-care-report.component';

describe('MonthlyCareReportComponent', () => {
  let component: MonthlyCareReportComponent;
  let fixture: ComponentFixture<MonthlyCareReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyCareReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyCareReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
