import { TestBed } from '@angular/core/testing';

import { PricegridService } from './pricegrid.service';

describe('PricegridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PricegridService = TestBed.get(PricegridService);
    expect(service).toBeTruthy();
  });
});
