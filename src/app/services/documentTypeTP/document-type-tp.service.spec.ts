import { TestBed } from '@angular/core/testing';

import { DocumentTypeTPService } from './document-type-tp.service';

describe('DocumentTypeTPService', () => {
  let service: DocumentTypeTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentTypeTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
