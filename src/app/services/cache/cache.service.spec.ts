import { TestBed } from '@angular/core/testing';

import { CacheTPService } from './cache.service';

describe('CacheService', () => {
  let service: CacheTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
