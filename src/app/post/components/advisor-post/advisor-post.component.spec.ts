import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorPostComponent } from './advisor-post.component';

describe('AdvisorPostComponent', () => {
  let component: AdvisorPostComponent;
  let fixture: ComponentFixture<AdvisorPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvisorPostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvisorPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
