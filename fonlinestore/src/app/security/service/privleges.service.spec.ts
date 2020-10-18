import { TestBed } from '@angular/core/testing';

import { PrivlegesService } from './privleges.service';

describe('PrivlegesService', () => {
  let service: PrivlegesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivlegesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
