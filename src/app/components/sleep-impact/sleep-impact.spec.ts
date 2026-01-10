import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SleepImpact } from './sleep-impact';

describe('SleepImpact', () => {
  let component: SleepImpact;
  let fixture: ComponentFixture<SleepImpact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SleepImpact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SleepImpact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
