import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortieListComponent } from './sortie-list.component';

describe('SortieListComponent', () => {
  let component: SortieListComponent;
  let fixture: ComponentFixture<SortieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortieListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
