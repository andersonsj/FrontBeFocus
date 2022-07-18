import { TestBed } from '@angular/core/testing';

import { StatisticsStageService } from './statistics-stage.service';

describe('StatisticsStageService', () => {
  let service: StatisticsStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
