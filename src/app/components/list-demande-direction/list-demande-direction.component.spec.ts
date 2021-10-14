import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeDirectionComponent } from './list-demande-direction.component';

describe('ListDemandeDirectionComponent', () => {
  let component: ListDemandeDirectionComponent;
  let fixture: ComponentFixture<ListDemandeDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDemandeDirectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemandeDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
