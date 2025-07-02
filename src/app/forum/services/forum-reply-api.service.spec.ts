import { TestBed } from '@angular/core/testing';

import { ForumReplyApiService } from './forum-reply-api.service';

describe('ForumReplyApiService', () => {
  let service: ForumReplyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumReplyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
