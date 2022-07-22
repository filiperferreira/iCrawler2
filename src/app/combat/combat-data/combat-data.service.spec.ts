import { TestBed } from '@angular/core/testing';

import { CombatDataService } from './combat-data.service';

describe('CombatDataService', () => {
  let service: CombatDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombatDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
