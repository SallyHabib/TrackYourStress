import { TestBed, inject } from '@angular/core/testing';

import { StudiesApiService } from './studies-api.service';

describe('StudiesApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudiesApiService]
    });
  });

  it('should be created', inject([StudiesApiService], (service: StudiesApiService) => {
    expect(service).toBeTruthy();
  }));
});
