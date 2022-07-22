import { TestBed } from '@angular/core/testing';

import { LogWindowDataService } from './log-window-data.service';

describe('LogWindowDataService', () => {
  let service: LogWindowDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogWindowDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
