import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlListComponent } from './bl-list.component';

describe('BlListComponent', () => {
  let component: BlListComponent;
  let fixture: ComponentFixture<BlListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
