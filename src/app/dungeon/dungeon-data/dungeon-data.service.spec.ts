import { TestBed } from '@angular/core/testing';

import { DungeonDataService } from './dungeon-data.service';

describe('DungeonDataService', () => {
  let service: DungeonDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DungeonDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
