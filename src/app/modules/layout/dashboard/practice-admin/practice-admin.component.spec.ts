import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeAdminComponent } from './practice-admin.component';

describe('PracticeAdminComponent', () => {
  let component: PracticeAdminComponent;
  let fixture: ComponentFixture<PracticeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
