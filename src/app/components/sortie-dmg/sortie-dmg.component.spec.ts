import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortieDmgComponent } from './sortie-dmg.component';

describe('SortieDmgComponent', () => {
  let component: SortieDmgComponent;
  let fixture: ComponentFixture<SortieDmgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortieDmgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortieDmgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
