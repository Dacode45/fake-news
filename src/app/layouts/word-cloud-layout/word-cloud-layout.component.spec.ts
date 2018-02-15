import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCloudLayoutComponent } from './word-cloud-layout.component';

describe('WordCloudLayoutComponent', () => {
  let component: WordCloudLayoutComponent;
  let fixture: ComponentFixture<WordCloudLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordCloudLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCloudLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
