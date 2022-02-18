import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeurDemandeListComponent } from './demandeur-demande-list.component';

describe('DemandeurDemadneListComponent', () => {
  let component: DemandeurDemandeListComponent;
  let fixture: ComponentFixture<DemandeurDemandeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeurDemandeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeurDemandeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
