import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueDmgDemandeDirComponent } from './vue-dmg-demande-dir.component';

describe('VueDmgDemandeDirComponent', () => {
  let component: VueDmgDemandeDirComponent;
  let fixture: ComponentFixture<VueDmgDemandeDirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VueDmgDemandeDirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VueDmgDemandeDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
