import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilUserListComponent } from './profil-user-list.component';

describe('ProfilUserListComponent', () => {
  let component: ProfilUserListComponent;
  let fixture: ComponentFixture<ProfilUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
