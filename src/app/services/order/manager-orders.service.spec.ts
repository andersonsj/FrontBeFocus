import { TestBed } from '@angular/core/testing';

import { ManagerOrdersService } from './manager-orders.service';

describe('ManagerOrdersService', () => {
  let service: ManagerOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
