import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwvComponent } from './awv.component';

describe('AwvComponent', () => {
  let component: AwvComponent;
  let fixture: ComponentFixture<AwvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
