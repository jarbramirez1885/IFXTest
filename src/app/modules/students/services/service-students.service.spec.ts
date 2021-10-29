import { TestBed } from '@angular/core/testing';

import { ServiceStudentsService } from './service-students.service';

describe('ServiceStudentsService', () => {
  let service: ServiceStudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceStudentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
