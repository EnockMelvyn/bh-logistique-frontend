import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeRecapComponent } from './commande-recap.component';

describe('CommandeRecapComponent', () => {
  let component: CommandeRecapComponent;
  let fixture: ComponentFixture<CommandeRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeRecapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
