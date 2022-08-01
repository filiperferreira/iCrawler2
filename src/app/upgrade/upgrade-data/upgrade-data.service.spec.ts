import { TestBed } from '@angular/core/testing';

import { UpgradeDataService } from './upgrade-data.service';

describe('UpgradeDataService', () => {
  let service: UpgradeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpgradeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
