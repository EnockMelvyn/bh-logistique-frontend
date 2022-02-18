import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDmgComponent } from './dashboard-dmg.component';

describe('DashboardDmgComponent', () => {
  let component: DashboardDmgComponent;
  let fixture: ComponentFixture<DashboardDmgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDmgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDmgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
