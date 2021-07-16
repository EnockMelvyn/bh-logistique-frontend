import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousfamilleFormComponent } from './sousfamille-form.component';

describe('SousfamilleFormComponent', () => {
  let component: SousfamilleFormComponent;
  let fixture: ComponentFixture<SousfamilleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousfamilleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SousfamilleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
