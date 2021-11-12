import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortieFormComponent } from './sortie-form.component';

describe('SortieFormComponent', () => {
  let component: SortieFormComponent;
  let fixture: ComponentFixture<SortieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortieFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
