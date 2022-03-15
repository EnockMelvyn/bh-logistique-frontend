import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlRecapComponent } from './bl-recap.component';

describe('BlRecapComponent', () => {
  let component: BlRecapComponent;
  let fixture: ComponentFixture<BlRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlRecapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
