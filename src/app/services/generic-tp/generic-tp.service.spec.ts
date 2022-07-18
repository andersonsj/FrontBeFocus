import { TestBed } from '@angular/core/testing';

import { GenericTpService } from './generic-tp.service';

describe('GenericTpService', () => {
  let service: GenericTpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericTpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
