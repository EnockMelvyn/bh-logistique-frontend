import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueValidateurComponent } from './vue-validateur.component';

describe('VueValidateurComponent', () => {
  let component: VueValidateurComponent;
  let fixture: ComponentFixture<VueValidateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VueValidateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VueValidateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
