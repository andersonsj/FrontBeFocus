import { TestBed } from '@angular/core/testing';

import { StageProcessCRMService } from './stage-process-crm.service';

describe('StageProcessCRMService', () => {
  let service: StageProcessCRMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StageProcessCRMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
