import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareManagerComponent } from './care-manager.component';

describe('CareManagerComponent', () => {
  let component: CareManagerComponent;
  let fixture: ComponentFixture<CareManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
