import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueDmgComponent } from './vue-dmg.component';

describe('VueDmgComponent', () => {
  let component: VueDmgComponent;
  let fixture: ComponentFixture<VueDmgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VueDmgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VueDmgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
