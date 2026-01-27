import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskEndurance } from './ask-endurance';

describe('AskEndurance', () => {
  let component: AskEndurance;
  let fixture: ComponentFixture<AskEndurance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AskEndurance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskEndurance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
