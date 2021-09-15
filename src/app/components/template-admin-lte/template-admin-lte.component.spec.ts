import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAdminLTEComponent } from './template-admin-lte.component';

describe('TemplateAdminLTEComponent', () => {
  let component: TemplateAdminLTEComponent;
  let fixture: ComponentFixture<TemplateAdminLTEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateAdminLTEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAdminLTEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
