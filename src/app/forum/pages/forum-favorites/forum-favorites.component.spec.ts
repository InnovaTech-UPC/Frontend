import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumFavoritesComponent } from './forum-favorites.component';

describe('ForumFavoritesComponent', () => {
  let component: ForumFavoritesComponent;
  let fixture: ComponentFixture<ForumFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumFavoritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
