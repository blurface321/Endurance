import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GutHealth } from './gut-health';

describe('GutHealth', () => {
  let component: GutHealth;
  let fixture: ComponentFixture<GutHealth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GutHealth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GutHealth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
