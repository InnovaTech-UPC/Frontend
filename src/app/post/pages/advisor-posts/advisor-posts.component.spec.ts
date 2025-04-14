import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorPostsComponent } from './advisor-posts.component';

describe('AdvisorPostsComponent', () => {
  let component: AdvisorPostsComponent;
  let fixture: ComponentFixture<AdvisorPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvisorPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvisorPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
