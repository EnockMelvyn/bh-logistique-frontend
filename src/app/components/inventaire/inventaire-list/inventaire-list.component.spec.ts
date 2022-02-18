import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventaireListComponent } from './inventaire-list.component';

describe('InventaireListComponent', () => {
  let component: InventaireListComponent;
  let fixture: ComponentFixture<InventaireListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventaireListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
