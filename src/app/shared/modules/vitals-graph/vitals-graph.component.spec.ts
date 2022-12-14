import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsGraphComponent } from './vitals-graph.component';

describe('VitalsGraphComponent', () => {
  let component: VitalsGraphComponent;
  let fixture: ComponentFixture<VitalsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalsGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitalsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
