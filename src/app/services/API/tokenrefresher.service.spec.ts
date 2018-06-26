import { TestBed, inject } from '@angular/core/testing';

import { TokenrefresherService } from './tokenrefresher.service';

describe('TokenrefresherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenrefresherService]
    });
  });

  it('should be created', inject([TokenrefresherService], (service: TokenrefresherService) => {
    expect(service).toBeTruthy();
  }));
});
