import { TestBed } from '@angular/core/testing';

import { ObiectService } from './obiect.service';

describe('ObiectService', () => {
  let service: ObiectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObiectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
