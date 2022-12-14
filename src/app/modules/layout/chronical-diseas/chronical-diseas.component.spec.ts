import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronicalDiseasComponent } from './chronical-diseas.component';

describe('ChronicalDiseasComponent', () => {
  let component: ChronicalDiseasComponent;
  let fixture: ComponentFixture<ChronicalDiseasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChronicalDiseasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChronicalDiseasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
