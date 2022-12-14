import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutreachComponent } from './outreach.component';

describe('OutreachComponent', () => {
  let component: OutreachComponent;
  let fixture: ComponentFixture<OutreachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutreachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutreachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
