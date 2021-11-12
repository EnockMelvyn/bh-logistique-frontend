import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlFormComponent } from './bl-form.component';

describe('BlFormComponent', () => {
  let component: BlFormComponent;
  let fixture: ComponentFixture<BlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
