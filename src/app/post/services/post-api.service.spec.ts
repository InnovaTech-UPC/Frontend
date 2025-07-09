import { TestBed } from '@angular/core/testing';

import { PostApiService } from './post-api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('PostApiService', () => {
  let service: PostApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostApiService]
    });
    service = TestBed.inject(PostApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts by Advisor ID', () => {
    const advisorId = 1;

    service.getPostsByAdvisorId(advisorId).subscribe(posts => {
      expect(posts).toBeDefined();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/posts?advisorId=${advisorId}`);
    expect(req.request.method).toBe('GET');
  });

  it('should fetch post by ID', () => {
    const postId = 1;

    service.getOne(postId).subscribe(post => {
      expect(post).toBeDefined();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/posts/${postId}`);
    expect(req.request.method).toBe('GET');
  });

  it('should create a new post', () => {
    const newPost = { id: 1, title: 'My new post', description: 'Hello, this is my new post. Contact me!', image: 'post-url.png', advisorId: 1 };

    service.create(newPost).subscribe(enclosure => {
      expect(enclosure).toBeDefined();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/v1/posts`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPost);
  });
});
