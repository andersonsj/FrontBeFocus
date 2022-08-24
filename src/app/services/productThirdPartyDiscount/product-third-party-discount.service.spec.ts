import { TestBed } from '@angular/core/testing';

import { ProductThirdPartyDiscountService } from './product-third-party-discount.service';

describe('ProductThirdPartyDiscountService', () => {
  let service: ProductThirdPartyDiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductThirdPartyDiscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
