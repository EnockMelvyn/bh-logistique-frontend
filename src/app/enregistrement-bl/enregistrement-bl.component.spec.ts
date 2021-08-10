import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrementBLComponent } from './enregistrement-bl.component';

describe('EnregistrementBLComponent', () => {
  let component: EnregistrementBLComponent;
  let fixture: ComponentFixture<EnregistrementBLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnregistrementBLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrementBLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
