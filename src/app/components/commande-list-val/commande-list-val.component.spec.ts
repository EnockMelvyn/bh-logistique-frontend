import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeListValComponent } from './commande-list-val.component';

describe('CommandeListValComponent', () => {
  let component: CommandeListValComponent;
  let fixture: ComponentFixture<CommandeListValComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeListValComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeListValComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
