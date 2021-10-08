import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeRecapComponent } from './demande-recap.component';

describe('DemandeRecapComponent', () => {
  let component: DemandeRecapComponent;
  let fixture: ComponentFixture<DemandeRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeRecapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
