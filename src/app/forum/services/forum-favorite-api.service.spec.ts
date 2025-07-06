import { TestBed } from '@angular/core/testing';

import { ForumFavoriteApiService } from './forum-favorite-api.service';

describe('ForumFavoriteApiService', () => {
  let service: ForumFavoriteApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumFavoriteApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
