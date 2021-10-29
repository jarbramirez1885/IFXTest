import { TestBed } from '@angular/core/testing';

import { ServiceTeachersService } from './service-teachers.service';

describe('ServiceTeachersService', () => {
  let service: ServiceTeachersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTeachersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
