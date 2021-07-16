import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousfamilleListComponent } from './sousfamille-list.component';

describe('SousfamilleListComponent', () => {
  let component: SousfamilleListComponent;
  let fixture: ComponentFixture<SousfamilleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousfamilleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SousfamilleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
