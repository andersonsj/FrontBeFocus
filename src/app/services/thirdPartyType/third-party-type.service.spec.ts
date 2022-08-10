import { TestBed } from '@angular/core/testing';

import { ThirdPartyTypeService } from './third-party-type.service';

describe('ThirdPartyTypeService', () => {
  let service: ThirdPartyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThirdPartyTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
