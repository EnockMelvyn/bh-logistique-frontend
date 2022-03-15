import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleRecapComponent } from './article-recap.component';

describe('ArticleRecapComponent', () => {
  let component: ArticleRecapComponent;
  let fixture: ComponentFixture<ArticleRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleRecapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
