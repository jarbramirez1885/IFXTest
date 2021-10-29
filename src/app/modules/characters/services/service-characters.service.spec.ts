import { TestBed } from '@angular/core/testing';

import { ServiceCharactersService } from './service-characters.service';

describe('ServiceCharactersService', () => {
  let service: ServiceCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
